import { createReducer, on } from "@ngrx/store";
import { CustomerState } from "./add-customer.state";
import { addcustomersuccess, deletecustomersuccess, getcustomersuccess, loadcustomersfail, loadcustomerssuccess, updatecustomersuccess } from "./add-customer.action";

const _CustomerReducer = createReducer(CustomerState,
    on(loadcustomerssuccess, (state, action) => {
        return {
            ...state,
            list: [...action.list],
            errormessage: ''
        }
    }),
    on(getcustomersuccess, (state, action) => {
        return {
            ...state,
            associateobj: action.obj,
            errormessage: ''
        }
    }),
    on(loadcustomersfail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addcustomersuccess, (state, action) => {
        const _maxid = Math.max(...state.list.map(o => o.Id));
        const _newdata = { ...action.inputdata };
        _newdata.Id = _maxid + 1;
        return {
            ...state,
            list: [...state.list, _newdata],
            errormessage: ''
        }
    }),
    on(updatecustomersuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.Id === action.inputdata.Id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(deletecustomersuccess, (state, action) => {
        const _newdata = state.list.filter(o=>o.Id!==action.idCustomer);
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
)

export function CustomerReducer(state: any, action: any) {
    return _CustomerReducer(state, action);
}
