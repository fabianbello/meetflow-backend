import { IGuest } from "./guest.interface";

export interface IProject extends Document {
    name: string;
    shortName: string;
    description: string;
    projectDateI: Date;
    projectDateT: Date;
    guests: IGuest[];
    userOwner: String;
  }
  