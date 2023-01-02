import 'reflect-metadata';
import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  active = 1,
  inactive = 0,
}
export enum Gender {
  secret = 0,
  male = 1,
  female = 2,
}
export enum Role {
  User,
  Admin,
}
registerEnumType(Status, {
  name: 'Status',
});
registerEnumType(Gender, {
  name: 'Gender',
});
registerEnumType(Role, {
  name: 'Role',
});
