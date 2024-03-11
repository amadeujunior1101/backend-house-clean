import { IsString, IsEmail, IsNotEmpty } from 'class-validator'
import 'reflect-metadata'

export class ClientDTO {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsNotEmpty()
  coordinate_x: string

  @IsString()
  @IsNotEmpty()
  coordinate_y: string

  constructor(
    name: string,
    email: string,
    phone: string,
    coordinate_x: string,
    coordinate_y: string
  ) {
    this.name = name
    this.email = email
    this.phone = phone
    this.coordinate_x = coordinate_x
    this.coordinate_y = coordinate_y
  }
}
