import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, catchError, of, switchMap } from "rxjs";
import { CustomerService } from "src/app/services/customer.service";
import { addcustomer, addcustomersuccess, deletecustomer, deletecustomersuccess, emptyaction, getcustomer, getcustomersuccess, loadcustomers, loadcustomersfail, loadcustomerssuccess, showalert, updatecustomer, updatecustomersuccess } from "./add-customer.action";
import { Customer } from "src/app/models/customer.model";

@Injectable()
export class CustomerEffetcs {

  constructor(private action: Actions, private service: CustomerService) {}


  _loadCustomer = createEffect(() =>
    {
      return this.action.pipe(
        ofType(loadcustomers),
        exhaustMap((action) => {
          return this.service.getCustomers().pipe(
            map((data) => {
              return loadcustomerssuccess({ list: data })
            }),
            catchError((_error) => of(loadcustomersfail({ errormessage: _error.message })))
          )
        })
      )
    }
  );

  _addcustomer = createEffect(() =>
    this.action.pipe(
      ofType(addcustomer),
      switchMap((action) => {
        return this.service.addCustomer(action.inputdata).pipe(
          switchMap((data) => {
            return of(addcustomersuccess({ inputdata: action.inputdata }),
            showalert({ message: 'Created successfully.', resulttype: 'pass' })
          )
          }),
          catchError((_error) => of(showalert({ message: 'Failed to create customer', resulttype: 'fail' })))
        )
      })
    )
  );

  _updatecustomer = createEffect(() =>
      this.action.pipe(
        ofType(updatecustomer),
        switchMap((action) => {
          return this.service.updateCustomer(action.inputdata).pipe(
            switchMap((data) => {
              return of(updatecustomersuccess({ inputdata: action.inputdata }),
                showalert({ message: 'Updated successfully.', resulttype: 'pass' }))
            }),
            catchError((_error) => of(showalert({ message: 'Failed to update customer', resulttype: 'fail' })))
          )
        })
      )
    );

     _deletecustomer = createEffect(() =>
      this.action.pipe(
        ofType(deletecustomer),
        switchMap((action) => {
          return this.service.deleteCustomer(action.idCustomer).pipe(
            switchMap((data) => {
              return of(deletecustomersuccess({ idCustomer: action.idCustomer }),
              showalert({ message: 'Deleted successfully.', resulttype: 'pass' })
              )
            }),
            catchError((_error) => of(showalert({ message: 'Failed to delete customer', resulttype: 'fail' })))

          )
        })
      )
    );





    _getcustomer = createEffect(() =>
      this.action.pipe(
        ofType(getcustomer),
        exhaustMap((action) => {
          return this.service.getCustomer(action.idCustomer).pipe(
            map((data) => {
              return getcustomersuccess({ obj: data as Customer })
            }),
            catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
          )
        })
      )
    )


}
