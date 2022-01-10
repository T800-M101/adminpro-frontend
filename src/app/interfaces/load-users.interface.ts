import { User } from "../models/user.model";

export interface LoadUsers {
   totalRecords: number;
   users: User[];
}