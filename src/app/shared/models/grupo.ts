export interface Grupo {
  idGrupo?: number;
  descripcion: string;
  idEmpleadoCreo: number;
  idEmpleadoModifico: number;
  fechaCreacion: string;
  fechaModificacion: string;
}

export interface GrupoContent {
  numberPage: number;
  totalPages: number;
  totalItems: number;
  content: Grupo[];
}

