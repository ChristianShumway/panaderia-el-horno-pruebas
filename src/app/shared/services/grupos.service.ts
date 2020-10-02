import { Injectable } from '@angular/core';
import { Grupo, GrupoContent } from './../models/grupo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(
    private http: HttpClient
  ) { }


  getGrupos(paginator: number): Observable<GrupoContent>  {
    return this.http.get<GrupoContent>(`catalog/getAllGrupo/${paginator}`); 
  }

  getGrupo(idGrupo: number): Observable<Grupo>  {
    return this.http.get<Grupo>(`catalog/getGrupoById/${idGrupo}`); 
  }

  getGruposFiltro(texto: string): Observable<Grupo[]>  {
    return this.http.get<Grupo[]>(`catalog/getGrupoByFilter/${texto}`); 
  }

  updateGrupo(grupo: Partial<Grupo>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`catalog/updateGrupo`, JSON.stringify(grupo), { headers: headerss});
  }

  deleteGrupo(grupo:  Partial<Grupo>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`catalog/deleteGrupo`, JSON.stringify(grupo), { headers: headerss});
  }
}
