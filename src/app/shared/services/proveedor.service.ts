import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ProveedorContent, Proveedor, TipoProveedor, PeriodoCompraProveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(
    private http: HttpClient
  ) { }


  getProveedores(paginator: number): Observable<ProveedorContent>  {
    return this.http.get<ProveedorContent>(`catalog/getAllWholeSale/${paginator}`); 
  }

  getProveedor(idProveedor: number): Observable<Proveedor>  {
    return this.http.get<Proveedor>(`catalog/getWholeSaleById/${idProveedor}`); 
  }

  getProveedoresFiltro(texto: string): Observable<Proveedor[]>  {
    return this.http.get<Proveedor[]>(`catalog/getWholeSalerByFilter/${texto}`); 
  }

  updateProveedor(proveedor: Partial<Proveedor>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`catalog/updateWholeSale`, JSON.stringify(proveedor), { headers: headerss});
  }

  deleteProveedor(proveedor: Partial<Proveedor>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`catalog/deleteWholeSale`, JSON.stringify(proveedor), { headers: headerss});
  }

  getTipoProveedor(): Observable<TipoProveedor[]>  {
    return this.http.get<TipoProveedor[]>(`catalog/getTypeWholeSale`); 
  }

  getPeriodoCompraProveedor(): Observable<PeriodoCompraProveedor[]>  {
    return this.http.get<PeriodoCompraProveedor[]>(`catalog/getAllPurchasePeriod`); 
  }

}
