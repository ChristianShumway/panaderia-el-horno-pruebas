import { Perfil } from "./perfil";

export interface Usuario {
  idUsuario?: number;
  email: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombreCompleto?: string;
  usuario: string;
  idPerfil: number;
  perfil?: Perfil;
  telefono: string;
  direccion: string;
  imagen?: string;
  contrasena?: string;
  cambiarContrasena: number;
  token?: string;
}
