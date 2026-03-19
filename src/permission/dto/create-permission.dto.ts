


import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  name: string;

}