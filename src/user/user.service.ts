import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { readonly } from 'vue';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
  ){}
  
  //sign in user
  async signin(signInUserDto: SignInUserDto) {
    const userExist = await this.userRepo.createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email=:email', {email: signInUserDto.email}).getOne();

    if(!userExist) throw new BadRequestException("Ce utilisateur n'existe pas");
    const matchPassword = await compare(signInUserDto.password, userExist.password);

    if(!matchPassword) throw new BadRequestException("Mot de passe incorrect");

    delete userExist.password;
    return userExist;
  }


  //sign up user
  async signup(signUpUserDto: SignUpUserDto) {
    const userExist = await this.findUserByEmail(signUpUserDto.email);
    const userNameExist = await this.findUserByName(signUpUserDto.familyName.toUpperCase(), signUpUserDto.firstName);
    if(userNameExist) throw new BadRequestException("Le nom et le prénom saisis sont déjà utilisés par un autre utilisateur");
    if(userExist) throw new BadRequestException("Email déjà existant");
    signUpUserDto.password = await hash(signUpUserDto.password, 10);
    signUpUserDto.familyName = signUpUserDto.familyName.toUpperCase();
    let user = this.userRepo.create(signUpUserDto);
    user = await this.userRepo.save(user);
    delete user.password;
    return user;
  }

  //create user
  async create(createUserDto: CreateUserDto) {}

  //find all user
  async findAll() {
    return await this.userRepo.find();
  }

  //find one user
  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({id});
    if(!user) throw new NotFoundException("Utilisateur non trouvé.");
    return user;
  }

  //update user
  async update(id: number, updateUserDto: Partial<UpdateUserDto>) {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    if(user.password){
      user.password = await hash(updateUserDto.password, 10);
    }
    return await this.userRepo.save(user);
  }

  //remove user
  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.userRepo.remove(user);
  }

  //find user by email
  async findUserByEmail(email: string){
    return await this.userRepo.findOneBy({email});
  }

  //find user by family and first Name
  async findUserByName(familyName: string, firstName:string){
    return await this.userRepo.findOne({
      where:{
        firstName: firstName,
        familyName: familyName
      }
    });
  }
  
  //accesss token
  async accessToken(user:UserEntity): Promise<string>{
    return sign( 
      {id: user.id, email:user.email}, 
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {expiresIn:process.env.ACCESS_TOKEN_EXPIRED_TIME}
    );
  }
}
