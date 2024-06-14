import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class SignInUserDto{
    @IsNotEmpty({message:"Email obligatoire"})
    @IsEmail({}, {message:"Saisir un email correct"})
    email:string;

    @IsNotEmpty({message:"Mot de passe obligatoire"})
    @MinLength(5, {message: 'Le mot de passe doit comporter minimum 5 charactères'})
    password:string;
}