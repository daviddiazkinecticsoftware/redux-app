import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerModel } from "src/app/models/customer.model";

const getcustomerstate = createFeatureSelector<CustomerModel>('customers');

export const getcustomerlist = createSelector(getcustomerstate, (state) => {
    return state.list;
})

export const getonecustomer = createSelector(getcustomerstate, (state) => {
    return state.custumerobj;
})

export const getErrorText=createSelector(getcustomerstate,(state)=>state.errormessage);

