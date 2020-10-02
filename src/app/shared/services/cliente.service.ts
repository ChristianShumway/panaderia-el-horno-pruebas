import { Injectable } from '@angular/core';
import { Cliente, ClienteContent } from './../models/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

//   updateCustomer

// getAllCustomer/{page}

// getCustomerById/{idCustomer}

// deleteCustomer

  constructor(
    private http: HttpClient
  ) { }

  getClientes(paginator: number): Observable<ClienteContent>  {
    return this.http.get<ClienteContent>(`catalog/getAllCustomer/${paginator}`); 
  }

  getCliente(idCliente: number): Observable<Cliente>  {
    return this.http.get<Cliente>(`catalog/getCustomerById/${idCliente}`); 
  }

  updateCliente(cliente: Partial<Cliente>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`catalog/updateCustomer`, JSON.stringify(cliente), { headers: headerss});
  }

  deleteCliente(cliente: Partial <Cliente>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`catalog/deleteCustomer`, JSON.stringify(cliente), { headers: headerss});
  }

}
