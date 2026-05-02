export interface Pago {
  id: string;
  ordenId: string;
  metodo: 'efectivo' | 'tarjeta' | 'transferencia';
  monto: number;
  fecha: string;
}
