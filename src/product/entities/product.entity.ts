import { CategoryEntity } from "src/category/entities/category.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Double, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'product'})
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    feature:string;

    @Column()
    description:string;

    @Column()
    image:string;

    @Column("int", {array:true})
    price:number[];

    @Column({type:'decimal', precision:1, scale:1, default:1.0})
    rate:number;

    @Column({default:false})
    isPopular:boolean;

    @ManyToOne(()=>CategoryEntity, (cat)=>cat.products)
    category: CategoryEntity;

    @ManyToOne(()=>UserEntity, (user)=> user.productsUpdated)
    updateBy: UserEntity
}
