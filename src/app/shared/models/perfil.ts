
export interface Perfil {
  idPerfil?: number;
  descripcion: string;
  idEmpleadoCreo: number;
  idEmpleadoModifico: number;
  fechaCreacion: string;
  fechaModificacion: string;
}

export interface PerfilContent {
  numberPage: number;
  totalPages: number;
  totalItems: number;
  content: Perfil[];
}

