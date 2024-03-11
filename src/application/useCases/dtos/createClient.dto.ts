import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Matches,
  IsNumber,
} from 'class-validator'
import 'reflect-metadata'

export class ClientDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio!' })
  name: string

  @IsEmail({}, { message: 'E-mail deve ser válido!' })
  email: string

  @IsString()
  @IsNotEmpty({ message: 'Contato deve ter 11 digitos!' })
  @Matches(/^\d{11}$/, {
    message: 'O número de telefone deve ter exatamente 11 dígitos.',
  })
  phone: string

  @IsNumber()
  @IsNotEmpty({ message: 'Escolha a latitude!' })
  coordinate_x: number

  @IsNumber()
  @IsNotEmpty({ message: 'Escolha a longitude!' })
  coordinate_y: number

  constructor(
    name: string,
    email: string,
    phone: string,
    coordinate_x: number,
    coordinate_y: number
  ) {
    this.name = name
    this.email = email
    this.phone = phone
    this.coordinate_x = coordinate_x
    this.coordinate_y = coordinate_y
  }
}
