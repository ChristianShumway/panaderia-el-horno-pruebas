export interface Cliente {
  idCliente?: number;
  razonSocial: string;
  propietario: string;
  calle: string;
  numero: string;
  colonia: string;
  codigoPostal: string;
  telefono: string;
  email: string;
  rfc: string;
  ciudad: string;
  latitud: string;
  longitud: string;
  observacion: string;
  idEmpleadoModificacion?: number;
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

