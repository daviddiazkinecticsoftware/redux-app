import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudCustomerComponent } from './components/crud-customer/crud-customer/crud-customer.component';

const routes: Routes = [
  {
    path: '', component: CrudCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
