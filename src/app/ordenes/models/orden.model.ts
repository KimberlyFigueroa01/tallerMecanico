export type EstadoOrden = 'ABIERTA' | 'EN_PROGRESO' | 'LISTA' | 'CERRADA';
export type TipoServicio = 'REPARACION' | 'MANTENCION' | 'GARANTIA';

export interface Usuario {
  id: number;
  nombre: string;
  rol: string;
}

export interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
}

export interface Vehiculo {
  id: number;
  marca: string;
  modelo: string;
  placa: string;
  ano: number;
  color: string;
}

export interface Nota {
  id: number;
  autor: string;
  fecha: string;
  texto: string;
}

export interface Tarea {
  id: number;
  descripcion: string;
  mecanico: string;
  completada: boolean;
}

export interface LineaOrden {
  id: number;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  descuentoPct: number;
  total: number;
  repuestoId?: number;
}

export interface Orden {
  id: number;
  numero: string;
  estado: EstadoOrden;
  tipoServicio: TipoServicio;
  descripcion: string;
  fechaCreacion: string;
  fechaLimite: string;
  cliente: Cliente;
  vehiculo: Vehiculo;
  tecnicoAsignado?: Usuario;
  lineas: LineaOrden[];
  inventarioVehiculo: Record<string, boolean>;
  kilometraje: number;
  nivelCombustible: number;
  estadoVehiculo: string;
  notas: Nota[];
  diagnostico: string;
  tareas: Tarea[];
  subtotal: number;
  descuento: number;
  iva: number;
  total: number;
}
