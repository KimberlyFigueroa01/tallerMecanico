export type EstadoOrden = 'Abierta' | 'En progreso' | 'Lista' | 'Cerrada' | 'Alerta';

export interface LineaOrden {
  id: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  descuento: number;
  total: number;
}

export interface Orden {
  id: string;
  cliente: string;
  vehiculo: string;
  tecnico: string;
  tipo: string;
  estado: EstadoOrden;
  fecha: string;
  subtotal: number;
  descuento: number;
  iva: number;
  total: number;
  lineas: LineaOrden[];
}
