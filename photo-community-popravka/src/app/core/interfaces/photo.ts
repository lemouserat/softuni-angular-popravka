import { IBase } from './base';
import { IUser } from './user';


export interface IPhoto<T = string, UserType = IUser> extends IBase {
    subscribers: string[];
    photoTitle: string;
    photoUrl: string;
    photoExif: string;
    photoGenre: string;
    userId: UserType;
  }