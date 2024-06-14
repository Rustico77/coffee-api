import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { AuthentificationGuard } from './utility/guards/authentification.guard';
import { AuthorizeGuard } from './utility/guards/authorization.guard';
import { Roles } from './utility/common/user-roles.enum';
import { CurrentUser } from './utility/decorators/current-user.decorator';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Post("signup")
  async signup(@Body() signUpUserDto:SignUpUserDto){
    const user = await this.userService.signup(signUpUserDto);
    const accessToken = await this.userService.accessToken(user);
    return {accessToken, user};
  }

  @Post('signin')
  async signin(@Body() signInUserDto:SignInUserDto){
    const user = await this.userService.signin(signInUserDto);
    const accessToken = await this.userService.accessToken(user);
    return {accessToken, user};
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(AuthentificationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get('findAll')
  async findAll() {
    const users = await this.userService.findAll();
    return {users};
  }

  @UseGuards(AuthentificationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get('findOne')
  async findOne(@Body('id') id:string) {
    return await this.userService.findOne(+id);
  }

  @UseGuards(AuthentificationGuard)
  @Put('update')
  async update(@CurrentUser() currentUser: UserEntity, @Body() updateUserDto: UpdateUserDto) {
    const id = currentUser.id;
    return await this.userService.update(id, updateUserDto);
  }

  @Delete('remove')
  async remove(@Body('id') id: number) {
    return await this.userService.remove(id);
  }
}
