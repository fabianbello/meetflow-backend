import { IProject } from "./project.interface";



export interface IMeeting extends Document {
   
    name: string;
    description: string;
    number: number;
    project: IProject;

}