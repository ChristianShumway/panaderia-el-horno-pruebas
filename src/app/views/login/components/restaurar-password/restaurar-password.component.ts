import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators } from 'ng2-validation';

import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
// import { UsuariosService } from './../../../../shared/services/usuarios.service';
import { Empleado } from '../../../../shared/models/empleado';

@Component({
  selector: 'app-restaurar-password',
  templateUrl: './restaurar-password.component.html',
  styleUrls: ['./restaurar-password.component.scss']
})
export class RestaurarPasswordComponent implements OnInit {

  @ViewChild(MatProgressBar, { static: false }) progressBar: MatProgressBar;
  @ViewChild(MatButton, { static: false }) submitButton: MatButton;

  passwordForm: FormGroup;
  returnUrl: string;
  formData = {};
  existeUsuario= false;
  usuario: Empleado;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService,
    // private usuariosService: UsuariosService
  ) {
   
  }

  ngOnInit() {
    this.getValidations();
    this.getUser();
  }

  getValidations() {
    let contrasena = new FormControl('', [Validators.required, Validators.minLength(8), Validators.required]);
    let confirmarContrasena = new FormControl('', CustomValidators.equalTo(contrasena));

    this.passwordForm = new FormGroup({
      contrasena: contrasena,
      confirmarContrasena: confirmarContrasena,
    })
  }

  getUser(){
    this.route.params.subscribe( (data: Params) => {
      if(data.id){
        console.log(data);
        this.autenticacionService.getUser(data.id).subscribe(
          (user: Empleado) => {
            this.usuario = user;
            console.log(this.usuario);
            // if(this.usuario.cambiarContrasena === 0) {
            //   this.router.navigate(['/login']);
            // }
          },
          error => console.log(error)
        );
      }
    })
  }

  restorePassword() {
    // console.log(this.passwordForm.value);
    if(this.passwordForm.valid){
      const usuario = {
        idEmpleado: this.usuario.idEmpleado,
        ...this.passwordForm.value,
      };
      console.log(usuario);
      this.submitButton.disabled = true;
      this.progressBar.mode = 'indeterminate';
      this.autenticacionService.updatePassword(usuario).subscribe(
        success => {
          console.log(success);
          if(success.estatus === '05'){
            this.useAlerts(success.mensaje, ' ', 'success-dialog');
            this.autenticacionService.logout();
            this.router.navigate(['/login']);
          }
        },
        error => {
          console.log(error);
          this.useAlerts('Contraseña no se ha cambiado', ' ', 'error-dialog');
        }
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
