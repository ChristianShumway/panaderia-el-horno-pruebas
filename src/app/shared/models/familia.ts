export interface Familia {
  idFamilia?: number;
  descripcion: string;
  idEmpleadoCreo?: number;
  idEmpleadoModifico?: number;
  fechaCreacion?: string;
  fechaModificacion?: string;
}


export interface FamiliaContent {
  numberPage: number;
  totalPages: number;
  totalItems: number;
  content: Familia[];
}
