import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthentificationGuard } from 'src/user/utility/guards/authentification.guard';
import { Roles } from 'src/user/utility/common/user-roles.enum';
import { AuthorizeGuard } from 'src/user/utility/guards/authorization.guard';
import { CurrentUser } from 'src/user/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthentificationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto, @CurrentUser() currentUser:UserEntity) {
    return await this.categoryService.create(createCategoryDto, currentUser);
  }

git
  @Get('findAll')
  async findAll() {
    let categories = await this.categoryService.findAll();
    categories = categories.sort((a, b) => a.id - b.id);
    return {categories};
  }

  @Get('findOne')
  async findOne(@Body('id') id: string) {
    return await this.categoryService.findOne(+id);
  }

  @UseGuards(AuthentificationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Put('update')
  async update(@Body('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @CurrentUser() currentUser:UserEntity) {
    return await this.categoryService.update(+id, updateCategoryDto, currentUser);
  }

  @UseGuards(AuthentificationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Delete('remove')
  async remove(@Body('id') id: string) {
    return await this.categoryService.remove(+id);
  }
}
