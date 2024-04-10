import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Customer } from 'src/app/models/customer.model';
import { addcustomer, deletecustomer, getcustomer, loadcustomers, updatecustomer } from 'src/app/store/add-customer/add-customer.action';
import { getErrorText, getcustomerlist, getonecustomer } from 'src/app/store/add-customer/add-customer.selectors';

@Component({
  selector: 'app-crud-customer',
  templateUrl: './crud-customer.component.html',
  styleUrls: ['./crud-customer.component.css']
})
export class CrudCustomerComponent implements AfterContentInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  formGroup: FormGroup;
  displayedColums: string[] = ["Name", "TypeDoc", "Doc", "HasEmail", "Actions"]
  tiposDocumento = ["DNI", "PASAPORTE"];
  formOK: boolean = true;
  errors: string = "";

  constructor(private formBuilder: FormBuilder,
    private store: Store,
  ) {
    this.formGroup = this.formBuilder.group({});
  }

  ngAfterContentInit(): void {
    this.initForm();
    this.store.dispatch(loadcustomers());
    this.store.select(getErrorText).subscribe(res => {
      this.errors = res;
    })
    this.store.select(getcustomerlist).subscribe(x => {
      this.dataSource.data = x;
      this.initTable();
    });
  }

  /**
   * Initialize table of costumers
   */
  initTable(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Initialize the form.
   */
  initForm(): void {
    this.formGroup = this.formBuilder.group({
      Id: [0],
      TypeDoc: ['', Validators.required],
      Doc: ['', Validators.required],
      Name: ['', Validators.required],
      HasEmail: [false, Validators.required],
    });
  }

  /**
   * Clean the form.
   */
  cancel(): void {
    this.initForm();
  }

  /**
   * Allow to save a new customer.
   */
  async save(): Promise<void> {
    if (this.formGroup.valid) {
      const _obj: Customer = {
        Id: +this.formGroup.value.Id,
        Name: this.formGroup.value.Name,
        HasEmail: this.formGroup.value.HasEmail,
        TypeDoc: this.formGroup.value.TypeDoc,
        Doc: this.formGroup.value.Doc
      }

      if (_obj.Id === 0) {
        this.store.dispatch(addcustomer({ inputdata: _obj }))
      } else {
        this.store.dispatch(updatecustomer({ inputdata: _obj }))
      }
    }
  }

  /**
   * Delete customer selected.
   * @param Customer ID
   */
  deleteCustomer(idCustomer: number) {
    if (confirm('Está seguro que desea eliminar el registro?')) {
      this.store.dispatch(deletecustomer({ idCustomer: idCustomer }));
    }
  }

  /**
   * Edit customer selected.
   * @param Customer ID
   */
  editCustomer(idCustomer: string){
    this.store.dispatch(getcustomer({idCustomer:idCustomer}))

    this.loadCustomer(idCustomer);
  }

  loadCustomer(idCustomer: string){
    this.store.select(getonecustomer).subscribe(res => {
      const selectedCostumer = res as Customer;
      this.formGroup.setValue({
        Id: selectedCostumer.Id,
        TypeDoc: selectedCostumer.TypeDoc,
        Doc: selectedCostumer.Doc,
        Name: selectedCostumer.Name,
        HasEmail: selectedCostumer.HasEmail
      })
    })
  }

  /**
   * Is fired when Tipo Documento is changed
   */
  tipoDocumentoChanged(tipoDocumento: string): void {
    console.log(tipoDocumento);
    return;
  }

  /**
   * Is fired when Tiene Email is checked/unchecked
   */
  cambioCheckEmail(check: boolean): void {
    console.log(check);
    return;
  }

}
