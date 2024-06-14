import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name:'category'})
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @CreateDateColumn()
    createAt: Timestamp;

    @UpdateDateColumn()
    updateAt: Timestamp;

    @ManyToOne(()=>UserEntity, (user)=> user.categoriesUpdated)
    updateBy: UserEntity

    @OneToMany(()=>ProductEntity, (prod)=>prod.category)
    products: ProductEntity[];
}
