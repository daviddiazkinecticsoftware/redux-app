import { CustomerModel } from "src/app/models/customer.model";

export const CustomerState: CustomerModel = {
  list: [],
  errormessage : '',
  custumerobj: {
    Id: 0,
    Name: "",
    HasEmail: false,
    TypeDoc: "",
    Doc: 0
  }
}
