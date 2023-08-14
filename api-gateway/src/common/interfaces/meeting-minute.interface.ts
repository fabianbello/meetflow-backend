export interface IMeetingMinute extends Document {
  title: string;
  place: string;
  startTime: Date;
  endTime: Date;
  topics: any;
  links: any;
  number: number;

}
