import { Injectable } from '@angular/core';
import { ArticuloContent, Articulo, EstatusArticulo } from './../models/articulo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(
    private http: HttpClient
  ) { }

  getArticulos(paginator: number): Observable<ArticuloContent>  {
    return this.http.get<ArticuloContent>(`catalog/getAllArticle/${paginator}`); 
  }

  getArticulo(idArticulo: number): Observable<Articulo>  {
    return this.http.get<Articulo>(`catalog/getArticuloById/${idArticulo}`); 
  }

  getArticulosFiltro(texto: string): Observable<Articulo[]>  {
    return this.http.get<Articulo[]>(`catalog/getArticleByFilter/${texto}`); 
  }

  // getSelectEstatusArticulo
  getSelectEstatusArticulo(): Observable<EstatusArticulo[]>  {
    return this.http.get<EstatusArticulo[]>(`catalog/getSelectEstatusArticulo`); 
  }

  updateArticulo(articulo: Partial<Articulo>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`catalog/updateArticle`, JSON.stringify(articulo), { headers: headerss});
  }

}



