import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) { }



  public async getCustomers(dni: number, name: string, email: string ){

    const options = { params: new HttpParams() };

    if (dni != null){
        options.params = options.params.set('dni', dni.toString());
    }

    if (name != null){
        options.params = options.params.set('name', name);
    }


    if (email != null){
        options.params = options.params.set('email', email);
    }

    return await this.http.get<Customer[]>(this.baseUrl + '/customers', options).toPromise();
}

}
