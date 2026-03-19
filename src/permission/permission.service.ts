import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument} from './schemas/permission.schema';
import { Model } from 'mongoose';

@Injectable()
export class PermissionService {

   constructor(
      @InjectModel(Permission.name)
      private permissionModel: Model<PermissionDocument>,
    ) {}

  async create(dto: CreatePermissionDto) {
  return this.permissionModel.create(dto);
}

  findAll() {
    return this.permissionModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
