import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ){}


  //create category
  async create(createCategoryDto: CreateCategoryDto, currentUser: UserEntity) {
    const category = this.categoryRepo.create(createCategoryDto);
    category.updateBy = currentUser;
    return await this.categoryRepo.save(category);
  }


  //find all categories
  async findAll() {
    return await this.categoryRepo.find({
      relations:{
        updateBy:true
      }
    });
  }


  //find one category by id
  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where:{id},
      relations:{
        updateBy:true
      }
    });
    if(!category) throw new NotFoundException('Catégorie introuvable.');
    return category;
  }

  //update category
  async update(id: number, updateCategoryDto: Partial<UpdateCategoryDto>, currentUser: UserEntity) {
    const category = await this.findOne(id);
    category.updateBy = currentUser;
    Object.assign(category, updateCategoryDto);
    return this.categoryRepo.save(category);
  }

  //remove category
  async remove(id: number) {
    const category = await this.findOne(id);
    return await this.categoryRepo.remove(category);
  }
}
