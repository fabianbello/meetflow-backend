export class ProjectDTO {
  
  shortName: string;

  readonly name: string;

  readonly description: string;

/*   @IsNotEmpty() */
/*   @Type(() => Date)
  @IsDate() */
  readonly projectDate: string;


  userOwner: any;


  userMembers: any;
}
