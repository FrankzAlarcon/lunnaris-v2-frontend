import { MediaManagementContext, MediaManagementContextProps } from "@/context/media-management-provider";
import { useContext } from "react";

export const useMediaManagement = () => {
  return useContext(MediaManagementContext) as MediaManagementContextProps;
}