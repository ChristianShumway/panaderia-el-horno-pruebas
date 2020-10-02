export interface Proveedor {
  idProveedor?: number;
  tipoProveedor: TipoProveedor;
  periodoCompra: PeriodoCompraProveedor;
  nombre: string;
  rfc: string;
  telefono: string;
  direccion: string;
  observacion: string;
  email: string;
  idEmpleadoModifico?: number;
}


export interface ProveedorContent {
  numberPage: number;
  totalPages: number;
  totalItems: number;
  content: Proveedor[];
}

export interface TipoProveedor {
  idTipoProveedor: number;
  descripcion: string;
}

export interface PeriodoCompraProveedor {
  idPeriodocompra: number;
  descripcion: string;
}

