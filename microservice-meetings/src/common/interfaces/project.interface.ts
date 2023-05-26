import { IGuest } from "./guest.interface";

export interface IProject extends Document {
    name: string;
    description: string;
    projectDate: Date;
    guests: IGuest[];
  }
  