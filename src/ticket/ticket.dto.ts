import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TicketStatus } from './ticket.schema';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  message!: string;

  @IsNotEmpty()
  @IsString()
  category!: string;
}

export class UpdateTicketStatusDto {
  @IsEnum(TicketStatus)
  status!: TicketStatus;
}
