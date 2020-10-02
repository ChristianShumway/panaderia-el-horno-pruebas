import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Articulo, ArticuloContent } from '../../../../shared/models/articulo'
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticuloService } from 'app/shared/services/articulo.service';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
import { ModalEliminarComponent } from '../../../../shared/components/modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent implements OnInit {

  articulos: Articulo[] = [];
  articulosTemp: Articulo[] = [];
  idUsuarioLogeado;
  paginaActual = 0;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Articulo> = new MatTableDataSource<Articulo>();

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar,
    private articuloService: ArticuloService,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getArticulos(this.paginaActual);
    this.changeDetectorRef.detectChanges();
    // this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.modifPaginator();
  }

  public pageEvent(event?: PageEvent) {
    this.getArticulos(event.pageIndex);
    console.log(event.pageIndex);
  }

  getArticulos(idPaginator) {
    this.articuloService.getArticulos(idPaginator).subscribe(
      ((articulos: ArticuloContent) => {
        this.articulos = articulos.content;
        this.paginator.length = articulos.totalItems;
        this.articulosTemp = this.articulos;
        this.dataSource.data = this.articulos;
      }),
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.articulosTemp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.articulosTemp.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    })

    this.dataSource.data = rows;
  }

  openDialoAlertDelete(idArticulo) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: idArticulo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const empleadoBaja: Partial<Articulo> = {
          idArticulo: idArticulo,
        };

        console.log(empleadoBaja)

        // this.articuloService.deleteEmpleado(empleadoBaja).subscribe(
        //   response => {
        //     console.log(response);
        //     if (response.estatus === '05') {
        //       this.useAlerts(response.mensaje, ' ', 'success-dialog');
        //       this.getArticulos(this.paginaActual);
        //     } else {
        //       this.useAlerts(response.mensaje, ' ', 'error-dialog');
        //     }
        //   },
        //   error => {
        //     this.useAlerts(error.message, ' ', 'error-dialog');
        //     console.log(error);
        //   }
        // );
      }
    });
  }

  useAlerts(message, action, className) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

  modifPaginator() {
    this.paginator._intl.itemsPerPageLabel = "items por pagina"
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${length}`;
    };
  }

}
