import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { SignInUserDto } from "./signin-user.dto";

export class SignUpUserDto extends SignInUserDto{
    @IsNotEmpty({message:"Nom de famille obligatoire"})
    @IsString({message:"Le nom de famille doit être une chaine de caractère"})
    familyName:string;

    @IsNotEmpty({message:"Prénom(s) obligatoire(s)"})
    @IsString({message:"Le prénom doit être une chaine de caractère"})
    firstName:string;

    
    @IsString({message:"Le tel doit être une chaine de caractère"})
    tel:string;

}