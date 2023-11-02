import { Expose, Type } from 'class-transformer';
import { CommonParamInput } from 'common/repositories/common.model';

// Model

export class UserLiteModel {
  id: string;
  name: string;
  email: string;

  @Expose({ name: 'created_at' })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  @Type(() => Date)
  updatedAt: Date;

  @Expose({ name: 'deleted_at' })
  @Type(() => Date)
  deletedAt: Date;
}

export class UserModel extends UserLiteModel {}

// Input

export type getUsersInput = {
  params?: CommonParamInput;
};

export type getUserInput = {
  id: string;
};

export type UserCreateMutationInput = {
  name: string;
  email: string;
  password?: string;
  passwordConfirmation?: string;
};

export type UserUpdateMutationInput = {
  id: string;
  body: UserCreateMutationInput;
};

export type UserDeleteInput = {
  id: string;
};

export class UserChangePasswordInput {
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}
