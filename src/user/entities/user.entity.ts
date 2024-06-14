import { IsNotEmpty } from "class-validator";
import { Roles } from "../utility/common/user-roles.enum";
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, Timestamp, Tree, UpdateDateColumn } from "typeorm";
import { CategoryEntity } from "src/category/entities/category.entity";
import { ProductEntity } from "src/product/entities/product.entity";

@Entity({name:'user'})
@Index(['familyName', 'firstName'], {unique:true}, )
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    familyName:string;

    @Column()
    firstName:string;

    @Column()
    tel:string;

    @Column({unique:true})
    email:string;

    @Column({select:false})
    password:string;

    @Column({type:'enum', array:true, enum:Roles, default:[Roles.USER]})
    roles:Roles[];

    @CreateDateColumn()
    createAt: Timestamp;

    @UpdateDateColumn()
    updateAt: Timestamp;

    @OneToMany(()=>CategoryEntity, (cat)=> cat.updateBy)
    categoriesUpdated: CategoryEntity[];

    @OneToMany(()=>ProductEntity, (prod)=> prod.updateBy)
    productsUpdated:ProductEntity[];

}
