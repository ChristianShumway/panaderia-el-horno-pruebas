import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Proveedor, ProveedorContent, TipoProveedor, PeriodoCompraProveedor } from 'app/shared/models/proveedor'
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProveedorService } from 'app/shared/services/proveedor.service';
import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { ModalEliminarComponent } from 'app/shared/components/modal-eliminar/modal-eliminar.component';
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {

  proveedores: Proveedor[] = [];
  proveedoresTemp: Proveedor[] = [];
  idUsuarioLogeado;
  paginaActual = 0;
  estatusData = 1;
  dataSerach;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Proveedor> = new MatTableDataSource<Proveedor>();

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar,
    private proveedorService: ProveedorService,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getProveedores(this.paginaActual);
    this.changeDetectorRef.detectChanges();
    // this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.modifPaginator();
  }

  public pageEvent(event?: PageEvent) {
    this.getProveedores(event.pageIndex);
    console.log(event.pageIndex);
  }

  getProveedores(idPaginator) {
    this.proveedorService.getProveedores(idPaginator).subscribe(
      ((proveedores: ProveedorContent) => {
        this.proveedores = proveedores.content;
        this.paginator.length = proveedores.totalItems;
        this.proveedoresTemp = this.proveedores;
        this.dataSource.data = this.proveedores;
        this.estatusData = 1;
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
    this.dataSerach = val;
    if(val) {
      this.proveedorService.getProveedoresFiltro(val).subscribe(
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
      this.getProveedores(this.paginaActual);
    }
    // const val = event.target.value.toLowerCase();
    // var columns = Object.keys(this.proveedoresTemp[0]);
    // columns.splice(columns.length - 1);

    // if (!columns.length)
    //   return;

    // const rows = this.proveedoresTemp.filter(function (d) {
    //   for (let i = 0; i <= columns.length; i++) {
    //     let column = columns[i];
    //     if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
    //       return true;
    //     }
    //   }
    // })

    // this.dataSource.data = rows;
  }

  openDialoAlertDelete(idProveedor) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: idProveedor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const proveedorBaja: Partial<Proveedor> = {
          idProveedor: idProveedor,
          idEmpleadoModifico: this.idUsuarioLogeado
        };

        console.log(proveedorBaja)

        this.proveedorService.deleteProveedor(proveedorBaja).subscribe(
          response => {
            console.log(response);
            if (response.estatus === '05') {
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getProveedores(this.paginaActual);
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
            }
          },
          error => {
            this.useAlerts(error.message, ' ', 'error-dialog');
            console.log(error);
          }
        );
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
