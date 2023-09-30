import { IGuest } from "./guest.interface";

export interface IProject extends Document {
  name: string;
  description: string;
  projectDate: String;
  guests: IGuest[];
  userOwner: String;
  shortName: string;
  color: string;
  }
  