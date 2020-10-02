import { Component, OnInit,  ViewChild, OnDestroy, ChangeDetectorRef  } from '@angular/core';

import { Grupo, GrupoContent } from '../../../../shared/models/grupo'

import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar';
import { GruposService } from 'app/shared/services/grupos.service';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
import { ModalEliminarComponent } from '../../../../shared/components/modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  grupos: Grupo[] = [];
  gruposTemp: Grupo[] = [];
  idUsuarioLogeado;
  paginaActual= 0;
  estatusData = 1;
  dataSerach;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Grupo> = new MatTableDataSource<Grupo>();

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar,
    private gruposService: GruposService,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getGrupos(this.paginaActual);
    this.changeDetectorRef.detectChanges();
    // this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.modifPaginator();
  }

  public pageEvent(event?:PageEvent){
    this.getGrupos(event.pageIndex);
    console.log(event.pageIndex);
  }

  getGrupos(idPaginator){
    this.gruposService.getGrupos(idPaginator).subscribe(
      ( (grupos: GrupoContent) => {
        this.grupos = grupos.content;
        this.paginator.length = grupos.totalItems;
        console.log(grupos.totalItems);
        console.log(this.paginator.length);
        console.log(this.grupos);
        this.gruposTemp = this.grupos;
        this.dataSource.data = this.grupos;
        this.estatusData = 1;
      }),
      error => console.log(error)
    );
  }

  ngOnDestroy(){
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    this.dataSerach = val;
    if(val) {
      this.gruposService.getGruposFiltro(val).subscribe(
        result => {
          if(result.length > 0) {
            console.log(result);
            this.dataSource.data = result;
            this.paginator.length = result.length;
            this.estatusData = 1;
          } else {
            this.dataSource.data = [];
            this.paginator.length = 0;
            this.estatusData = 0;
            console.log('no se encontro');
          }
        },
        error => console.log(error)
      );
    } else {
      this.getGrupos(this.paginaActual);
    }
    // const val = event.target.value.toLowerCase();
    // var columns = Object.keys(this.gruposTemp[0]);
    // columns.splice(columns.length - 1);

    // if (!columns.length)
    //   return;

    // const rows = this.gruposTemp.filter(function(d) {
    //   for (let i = 0; i <= columns.length; i++) {
    //     let column = columns[i];
    //     if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
    //       return true;
    //     }
    //   }
    // })

    // this.dataSource.data = rows;
  }

  openDialoAlertDelete(idGrupo) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: idGrupo
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
        const grupoBaja: Partial<Grupo> = {
          idGrupo: idGrupo,
          idEmpleadoModifico: this.idUsuarioLogeado
        };

        console.log(grupoBaja)

        this.gruposService.deleteGrupo(grupoBaja).subscribe(
          response => {
            console.log(response);
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getGrupos(this.paginaActual);
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
            }
          },
            error => {
            this.useAlerts(error.mensaje, ' ', 'error-dialog');
            console.log(error);
          }
        );
      }
    });
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

  modifPaginator() {
    this.paginator._intl.itemsPerPageLabel ="items por pagina"
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${length}`;
    };
  }

}
