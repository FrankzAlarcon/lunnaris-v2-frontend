import { UserType } from "@/enums/user-type.enum";

export interface CreateUserDto {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: UserType
}

export interface LoginDto {
  email: string;
  password: string;
}