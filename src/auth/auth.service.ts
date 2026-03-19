import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { assignRoleDto } from './dto/assingRole.dto';

@Injectable()
export class AuthService {
 constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateAuthDto): Promise<User> {
    const exists = await this.userModel.findOne({ email: dto.email });

    if (exists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = new this.userModel({
      ...dto,
      password: hashedPassword,
    });

    return user.save();
  }

  async assignRole(dto: assignRoleDto) {
  return this.userModel.findByIdAndUpdate(
    dto.userId,
    { $addToSet: { roles: dto.userId } },
    { new: true },
  );
}

async getUserWithPermissions(dto: {id:string}) {
  const user = await this.userModel
    .findById(dto.id)
    .populate({
      path: 'roles',
      populate: {
        path: 'permissions',
      },
    });

  return user;
}

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
