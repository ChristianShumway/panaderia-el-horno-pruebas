import { Component, OnInit,  ViewChild, OnDestroy, ChangeDetectorRef  } from '@angular/core';

import { Familia, FamiliaContent } from '../../../../shared/models/familia'

import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar';
import { FamiliaService } from 'app/shared/services/familia.service';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
import { ModalEliminarComponent } from '../../../../shared/components/modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.scss']
})
export class FamiliaComponent implements OnInit {

  familias: Familia[] = [];
  familiasTemp: Familia[] = [];
  idUsuarioLogeado;
  paginaActual= 0;
  estatusData = 1;
  dataSerach;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Familia> = new MatTableDataSource<Familia>();

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar,
    private familiaService: FamiliaService,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getFamilias(this.paginaActual);
    this.changeDetectorRef.detectChanges();
    // this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.modifPaginator();
  }

  public pageEvent(event?:PageEvent){
    this.getFamilias(event.pageIndex);
    console.log(event.pageIndex);
  }

  getFamilias(idPaginator){
    this.familiaService.getFamilias(idPaginator).subscribe(
      ( (familias: FamiliaContent) => {
        this.familias = familias.content;
        this.paginator.length = familias.totalItems;
        console.log(this.familias);
        this.familiasTemp = this.familias;
        this.dataSource.data = this.familias;
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
      this.familiaService.getFamiliasFiltro(val).subscribe(
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
      this.getFamilias(this.paginaActual);
    }
    // var columns = Object.keys(this.familiasTemp[0]);
    // columns.splice(columns.length - 1);

    // if (!columns.length)
    //   return;

    // const rows = this.familiasTemp.filter(function(d) {
    //   for (let i = 0; i <= columns.length; i++) {
    //     let column = columns[i];
    //     if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
    //       return true;
    //     }
    //   }
    // })

    // this.dataSource.data = rows;
    // console.log(this.dataSource.data);
  }

  openDialoAlertDelete(idFamilia) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: idFamilia
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
        const familiaBaja: Partial<Familia> = {
          // descripcion: '',
          idFamilia: idFamilia,
          idEmpleadoModifico: this.idUsuarioLogeado
        };

        console.log(familiaBaja)

        this.familiaService.deleteFamilia(familiaBaja).subscribe(
          response => {
            console.log(response);
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getFamilias(this.paginaActual);
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
