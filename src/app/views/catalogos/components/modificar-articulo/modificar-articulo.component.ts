import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Articulo, EstatusArticulo } from 'app/shared/models/articulo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticuloService } from 'app/shared/services/articulo.service';
import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { DatePipe } from '@angular/common';
import { FamiliaService } from 'app/shared/services/familia.service';
import { Familia } from 'app/shared/models/familia';

@Component({
  selector: 'app-modificar-articulo',
  templateUrl: './modificar-articulo.component.html',
  styleUrls: ['./modificar-articulo.component.scss']
})
export class ModificarArticuloComponent implements OnInit {

  articuloForm: FormGroup;
  idArticulo;
  idUsuarioLogeado;
  articulo: Articulo;
  hoy = new Date();
  pipe = new DatePipe('en-US');
  familias: Familia[] = [];
  catalogEstatus: EstatusArticulo[] = [];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private articuloService: ArticuloService,
    private familiaService: FamiliaService
  ) { }

  ngOnInit() {
    this.getValidations();
    this.getArticulo();
    this.getCatalogs();
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
  }

  getArticulo() {
    this.activatedRoute.params.subscribe((data: Params) => {
      this.idArticulo = data.idArticulo;
      if (this.idArticulo) {
        this.articuloService.getArticulo(this.idArticulo).subscribe(
          (articulo: Articulo) => {
            console.log(articulo);
            this.articulo = articulo;
            this.articuloForm.patchValue(articulo);
            this.articuloForm.get('familia').setValue(articulo.familia.idFamilia);
            this.articuloForm.get('estatusArticulo').setValue(articulo.estatusArticulo.idEstatusArticulo);
          },
          error => console.log(error)
        );
      }
    });
  }


  getCatalogs() {
    this.familiaService.getSelectFamilia().subscribe(
      (familias: Familia[]) => {
        this.familias = familias;
      },
      error => console.log(error)
    );

    this.articuloService.getSelectEstatusArticulo().subscribe(
      (data: EstatusArticulo[]) => {
        this.catalogEstatus = data;
      }
    );
  }

  getValidations() {
    this.articuloForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
      ]),
      familia: new FormControl('', [
        Validators.required,
      ]),
      estatusArticulo: new FormControl('', [
        Validators.required,
      ]),
      precioPublico: new FormControl('', [
        Validators.required,
      ]),
      costo: new FormControl('', [
        Validators.required,
      ])
    })
  }

  updateArticle() {
    if (this.articuloForm.valid) {
      const format = 'yyyy/MM/dd';
      const myFormatedDate = this.pipe.transform(this.hoy, format);

      const refreshFamily: Familia = this.familias.find((familia: Familia) => familia.idFamilia === this.articuloForm.value.familia);
      // console.log(refreshFamily);
      const refreshEstatus: EstatusArticulo = this.catalogEstatus.find((estatus: EstatusArticulo) => estatus.idEstatusArticulo === this.articuloForm.value.estatusArticulo);
      // console.log(refreshEstatus);

      const articulo: Articulo = {
        idArticulo: parseInt(this.idArticulo),
        idEmpleadoModifico: this.idUsuarioLogeado,
        ...this.articuloForm.value,
        familia: refreshFamily,
        estatusArticulo: refreshEstatus
      };
      console.log(articulo);

      this.articuloService.updateArticulo(articulo).subscribe(
        (response => {
          if (response.estatus === '05') {
            this.router.navigate(['/catalogos/articulos']);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        }),
        (error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        })
      );
    }
  }

  useAlerts(message, action, className) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
