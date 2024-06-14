import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({message:"Le nom de la catégorie obligatoire"})
    @IsString({message:'La catégorie doit être une chaine de caractère'})
    title:string;
}
