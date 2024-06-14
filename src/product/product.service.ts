import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
    private readonly categoryService:CategoryService,
  ){}

  //create product
  async create(createProductDto: CreateProductDto, currentUser:UserEntity) {
    const product = this.productRepo.create(createProductDto);
    product.updateBy = currentUser;
    product.category = await this.categoryService.findOne(createProductDto.categoryId);
    return await this.productRepo.save(product);
  }

  //find all product
  async findAll() {
    return await this.productRepo.find({
      relations:{
        category:{
          updateBy:true
        },
        updateBy:true
      },
      select:{
        category:{
          id:true,
          title:true,
          updateBy:{id:true}
        },
        updateBy:{
          id:true,
          familyName:true,
          firstName:true,
          email:true
        }
      }
    });
  }

  //find one product
  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where:{id},
      relations:{
        category:true,
        updateBy:true
      },
      select:{
        category:{
          id:true,
          title:true,
        },
        updateBy:{
          id:true,
          familyName:true,
          firstName:true,
          email:true
        }
      }
    });
    if(!product) throw new NotFoundException("Produit introuvable");
    
    return product;
  }

  //update product
  async update(id: number, updateProductDto: Partial<UpdateProductDto>, currentUser: UserEntity) {
    const product = await this.findOne(id);
    product.updateBy = currentUser;
    Object.assign(product, updateProductDto);
    return this.productRepo.save(product);
  }

  //remove product
  async remove(id: number) {
    const product = await this.findOne(id);
    return await this.productRepo.remove(product);
  }
}
