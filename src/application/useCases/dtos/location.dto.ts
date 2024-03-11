import {
  IsString,
  IsNumber,
  Min,
  Max,
  ArrayMinSize,
  IsArray,
  ValidateNested,
  ArrayMaxSize,
} from 'class-validator'
import { Type } from 'class-transformer'

class LocationItem {
  @IsString()
  name: string = ''

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number = 0

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number = 0

  constructor(name: string, latitude: number, longitude: number) {
    this.name = name
    this.latitude = latitude
    this.longitude = longitude
  }
}

export class LocationDTO {
  @IsArray({ message: 'Deve ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => LocationItem)
  locations: LocationItem[]

  constructor(locations: LocationItem[]) {
    this.locations = locations
  }
}
