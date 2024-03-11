export interface IFilterType {
  [key: string]: string | string[] | IFilterType | IFilterType[] | undefined
}

export interface IPointWithName {
  name: string
  pos: number
}
