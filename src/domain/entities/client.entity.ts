export class ClientEntity {
  id: string
  name: string
  email: string
  phone: string
  coordinate_x: string
  coordinate_y: string

  constructor(input: {
    id: string
    name: string
    email: string
    phone: string
    coordinate_x: string
    coordinate_y: string
  }) {
    this.id = input.id
    this.name = input.name
    this.email = input.email
    this.phone = input.phone
    this.coordinate_x = input.coordinate_x
    this.coordinate_y = input.coordinate_y
  }
}
