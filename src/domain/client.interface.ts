export interface IFilterType {
  [key: string]: string | string[] | IFilterType | IFilterType[] | undefined
}

export interface IPointWithName {
  name: string
  pos: number
  phone: string
}

export interface IPointCartesian {
  name: string
  x: number
  y: number
  phone: string
}
