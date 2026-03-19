import { IsNotEmpty, } from 'class-validator';

export class assignRoleDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  roleId: string;


}