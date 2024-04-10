import { createAction, props } from "@ngrx/store";
import { Customer } from "src/app/models/customer.model";

export const EMPTY_ACTION='[app]empty'
export const emptyaction=createAction(EMPTY_ACTION)

export const SHOW_ALERT='[app]show alert'
export const showalert=createAction(SHOW_ALERT,props<{message:string,resulttype:string}>())


export const LOAD_CUSTOMER='[customer page]load customer'
export const loadcustomers = createAction(LOAD_CUSTOMER)

export const LOAD_CUSTOMER_SUCCESS='[customer page]load customer success'
export const loadcustomerssuccess = createAction(LOAD_CUSTOMER_SUCCESS, props<{list:Customer[]}>())

export const LOAD_CUSTOMER_FAIL='[customer page]load customer fail'
export const loadcustomersfail = createAction(LOAD_CUSTOMER_FAIL, props<{errormessage: string}>())

export const ADD_CUSTOMER='[customer page]add customer'
export const addcustomer=createAction(ADD_CUSTOMER,props<{inputdata:Customer}>())

export const ADD_CUSTOMER_SUCCESS='[customer page]add customer success'
export const addcustomersuccess=createAction(ADD_CUSTOMER_SUCCESS,props<{inputdata:Customer}>())

export const UPDATE_CUSTOMER='[customer page]update customer'
export const updatecustomer=createAction(UPDATE_CUSTOMER,props<{inputdata:Customer}>())
export const UPDATE_CUSTOMER_SUCCESS='[customer page]update customer success'
export const updatecustomersuccess=createAction(UPDATE_CUSTOMER_SUCCESS,props<{inputdata:Customer}>())

export const DELETE_CUSTOMER='[customer page]delete customer'
export const deletecustomer=createAction(DELETE_CUSTOMER,props<{idCustomer:number}>())

export const DELETE_CUSTOMER_SUCCESS='[customer page]delete customer success'
export const deletecustomersuccess=createAction(DELETE_CUSTOMER_SUCCESS,props<{idCustomer:number}>())

export const GET_CUSTOMER='[customer page]get customer'
export const GET_CUSTOMER_SUCCESS='[customer page]get customer success'
export const getcustomer=createAction(GET_CUSTOMER,props<{idCustomer: string}>())
export const getcustomersuccess=createAction(GET_CUSTOMER_SUCCESS,props<{obj:Customer}>())
