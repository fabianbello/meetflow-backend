import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class NotificationDTO {
    @ApiProperty()
    readonly type: string;
    @ApiProperty()
    readonly description: string;


}