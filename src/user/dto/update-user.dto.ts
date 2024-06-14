import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { SignUpUserDto } from './signup-user.dto';

export class UpdateUserDto extends PartialType(SignUpUserDto) {}
