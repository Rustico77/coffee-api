import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString } from "class-validator";
import { CategoryEntity } from "src/category/entities/category.entity";

export class CreateProductDto {
    @IsNotEmpty({message:"Caractéristique obligatoire"})
    @IsString({message:'La caractéristique doit être une chaine de caractère'})
    feature:string;

    @IsOptional()
    @IsString({message:'La Description doit être une chaine de caractère'})
    description:string;
    
    @IsNotEmpty({message:"Image obligatoire"})
    @IsString({message:"L'image doit être une chaine de caractère"})
    image:string;

    @IsArray({message:"Le prix doit être une liste de nombre"})
    @IsInt({each:true, message:"Le prix spécifié doit être un entier"})
    @ArrayMaxSize(2, {message: "Juste deux prix à spécifiés"})
    @ArrayMinSize(1, {message: "Prix obligatoire"})
    price:number[];

    @IsOptional()
    @IsBoolean({message:"isPopular est un boolean"})
    isPopular:boolean;

    @IsNotEmpty({message:"Catégorie obligatoire"})
    categoryId: number;
}
