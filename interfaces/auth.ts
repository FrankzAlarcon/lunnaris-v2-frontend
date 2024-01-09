import { UserType } from "@/enums/user-type.enum";

export interface CreateUserDto {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  user_type: UserType
}

export interface LoginDto {
  username: string;
  password: string;
}