export interface Customer{
  Id: number,
  TypeDoc: string,
  Doc: number,
  Name: string,
  HasEmail: boolean
}


export interface CustomerModel {
  list: Customer[],
  custumerobj: Customer,
  errormessage: string
}
