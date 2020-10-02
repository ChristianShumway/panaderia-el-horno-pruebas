export interface Cliente {
  idCliente?: number;
  idEmpleadoModifico?: number;
}

// export interface Empleado {
//   nombre: string;
//   apellidoPaterno: string;
//   apellidoMaterno: string;
//   direccion: string;
//   telefono: string;
//   nss: string;
//   perfil?: Perfil;
//   gafete: string;
//   email: string;
//   contrasena?: string;
//   cambiarContrasena?: number;
//   imagen?: string;
// }

export interface ClienteContent {
  numberPage: number;
  totalPages: number;
  totalItems: number;
  content: Cliente[];
}

