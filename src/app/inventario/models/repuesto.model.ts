export interface Repuesto {
  id: number;
  nombre: string;
  sku: string;
  categoria: string;
  proveedor: string;
  ubicacion: string;
  stock: number;
  stockMin: number;
  stockMax: number;
  precioCompra: number;
  precioVenta: number;
}
