import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) { }

  getCustomers(dni?: number, name?: string, email?: string) {
    const options = { params: new HttpParams() };

    if (dni != null) {
      options.params = options.params.set('dni', dni.toString());
    }
    if (name != null) {
      options.params = options.params.set('name', name);
    }
    if (email != null) {
      options.params = options.params.set('email', email);
    }
    return this.http.get<Customer[]>(this.baseUrl, options);
  }

  addCustomer(customer: Customer) {
    return this.http.post(this.baseUrl, customer);
  }

  updateCustomer(customer: Customer) {
    return this.http.put(this.baseUrl, customer);
  }

  deleteCustomer(idCustomer: number) {
    return this.http.delete(this.baseUrl + '/' + idCustomer);
  }

  getCustomer(idCustomer: string) {
    return this.http.get(this.baseUrl + '/' + idCustomer);
  }

}
