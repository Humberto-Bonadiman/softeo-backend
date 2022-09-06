import { Decimal } from "@prisma/client/runtime";

export interface clientInterface {
  name: string,
  treatment: string,
  value: Decimal,
  numberPlots: number
}

export interface clientWithDateInterface extends clientInterface {
  date: string
}