import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-customer',
  templateUrl: './crud-customer.component.html',
  styleUrls: ['./crud-customer.component.css']
})
export class CrudCustomerComponent implements AfterContentInit {
  formOK: boolean = true;
  formGroupTiposDocumento: FormGroup;
  circuitos = [];

  tiposDocumento = ["DNI", "PASAPORTE"];


  constructor(private formBuilder: FormBuilder){
    this.formGroupTiposDocumento = this.formBuilder.group({});
  }

  ngAfterContentInit(): void {
    this.formGroupTiposDocumento = this.formBuilder.group({
      TipoDocumento: ['', Validators.required],
      NumeroDocumento: ['', Validators.required],
      Nombre: ['', Validators.required],
      TieneEmail: ['', Validators.required],
  });
  }


  cancel(): void{
    alert("cancel");
  }

  async save(): Promise<void>{
    alert("save");
  }

  tipoDocumentoChanged(tipoDocumento: string){
    console.log(tipoDocumento);
    return;
  }

  cambioCheckEmail(check: boolean){
    console.log(check);
    return;
  }

}
