// permissions/schema/permission.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
  @Prop({ unique: true })
  name: string; // "user.create"

  @Prop()
  description: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);