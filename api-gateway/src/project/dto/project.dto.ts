import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class ProjectDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly projectDate: Date;

  @ApiProperty()
  userOwner: any;
}
