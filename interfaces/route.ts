import { UserType } from "@/enums/user-type.enum";
import { LucideIcon } from "lucide-react";

export interface Route {
  name: string;
  path: string;
  Icon: LucideIcon;
  usersAllowed: UserType[];
}