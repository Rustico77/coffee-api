import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from 'src/user/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { Roles } from 'src/user/utility/common/user-roles.enum';
import { AuthentificationGuard } from 'src/user/utility/guards/authentification.guard';
import { AuthorizeGuard } from 'src/user/utility/guards/authorization.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthentificationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post('create')
  async create(@Body() createProductDto: CreateProductDto, @CurrentUser() currentUser:UserEntity) {
    return await this.productService.create(createProductDto, currentUser);
  }

  @Get("findAll")
  async findAll() {
    let products = await this.productService.findAll();
    products = products.sort((a, b) => a.id - b.id);
    return {products};
  }

  @Get('findOne')
  async findOne(@Body('id') id: string) {
    return await this.productService.findOne(+id);
  } 

  @UseGuards(AuthentificationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Put('update')
  async update(@Body('id') id: string, @Body() updateProductDto: UpdateProductDto, @CurrentUser() currentUser:UserEntity) {
    return await this.productService.update(+id, updateProductDto, currentUser);
  }

  @UseGuards(AuthentificationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Delete('remove')
  async remove(@Body('id') id: string) {
    return await this.productService.remove(+id);
  }
}
