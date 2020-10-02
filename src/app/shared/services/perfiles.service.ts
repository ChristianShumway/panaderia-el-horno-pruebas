import { Injectable } from '@angular/core';
import { Perfil, PerfilContent } from './../models/perfil';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor(
    private http: HttpClient
  ) { }

  getPerfiles(paginator: number): Observable<PerfilContent>  {
    return this.http.get<PerfilContent>(`catalog/getAllPerfil/${paginator}`); 
  }

  getPerfil(idPerfil: number): Observable<Perfil>  {
    return this.http.get<Perfil>(`catalog/getPerfilById/${idPerfil}`); 
  }

  getPerfilesFiltro(texto: string): Observable<Perfil[]>  {
    return this.http.get<Perfil[]>(`catalog/getPerfilByFilter/${texto}`); 
  }

  getSelectPerfil(): Observable<Perfil[]>  {
    return this.http.get<Perfil[]>(`catalog/getSelectPerfil`); 
  }

  updatePerfil(perfil: Partial<Perfil>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`catalog/updatePerfil`, JSON.stringify(perfil), { headers: headerss});
  }

  deletePerfil(perfil:  Partial<Perfil>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`catalog/deletePerfil`, JSON.stringify(perfil), { headers: headerss});
  }
}
