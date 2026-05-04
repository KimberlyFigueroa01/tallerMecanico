import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';

import { OrdenService } from '../services/orden.service';
import { OrdenStateService } from '../services/orden-state.service';
import { EstadoOrden, LineaOrden, Nota, Orden, Tarea, Usuario } from '../models/orden.model';
import { InventarioService } from '../../inventario/services/inventario.service';
import { Repuesto } from '../../inventario/models/repuesto.model';
import { OrdenTimeline } from '../orden-timeline/orden-timeline';
import { OrdenTrabajo } from '../orden-trabajo/orden-trabajo';

@Component({
  selector: 'app-orden-detail',
  standalone: true,
  imports: [DatePipe, DecimalPipe, RouterLink, OrdenTimeline, OrdenTrabajo],
  templateUrl: './orden-detail.html',
  styleUrl: './orden-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenDetail {
  private readonly ordenService = inject(OrdenService);
  private readonly ordenState = inject(OrdenStateService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly inventarioService = inject(InventarioService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly order = signal<Orden | null>(null);
  readonly isLoading = signal(false);
  readonly activeTab = signal('Vehiculo');
  readonly lineEditId = signal<number | null>(null);
  readonly lineDraft = signal<LineaOrden | null>(null);
  readonly descripcionDraft = signal('');
  readonly diagnosticoDraft = signal('');
  readonly notaDraft = signal('');
  readonly isSavingDescripcion = signal(false);
  readonly isSavingDiagnostico = signal(false);
  readonly repuestos = signal<Repuesto[]>([]);

  readonly tabs = ['Vehiculo', 'Fotos', 'Notas', 'Informe', 'Tareas', 'Pago', 'Info'];

  readonly tecnicos: Usuario[] = [
    { id: 7, nombre: 'Carlos Mendez', rol: 'MECANICO' },
    { id: 8, nombre: 'Laura Perez', rol: 'MECANICO' },
    { id: 9, nombre: 'Jorge Diaz', rol: 'MECANICO' }
  ];

  readonly totals = computed(() => {
    const orden = this.order();
    if (!orden) {
      return { subtotal: 0, descuento: 0, iva: 0, total: 0 };
    }
    const subtotal = orden.lineas.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );
    const descuento = orden.lineas.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad * (item.descuentoPct / 100),
      0
    );
    const neto = subtotal - descuento;
    const iva = neto * 0.19;
    const total = neto + iva;
    return { subtotal, descuento, iva, total };
  });

  readonly elapsed = computed(() => {
    const fecha = this.order()?.fechaCreacion;
    if (!fecha) {
      return '-';
    }
    const diff = Date.now() - Date.parse(fecha);
    const hours = Math.floor(diff / 3600000);
    if (hours < 24) {
      return `${hours} hrs`;
    }
    const days = Math.floor(hours / 24);
    return `${days} dias`;
  });

  readonly inventarioItems = computed(() => {
    const inventario = this.order()?.inventarioVehiculo ?? {};
    return Object.entries(inventario).map(([label, value]) => ({ label, value }));
  });

  readonly timelineItems = computed(() => {
    const orden = this.order();
    if (!orden) {
      return [];
    }
    return [
      {
        titulo: `Orden #${orden.numero} creada`,
        fecha: orden.fechaCreacion,
        detalle: 'Ingreso en recepcion'
      },
      {
        titulo: 'Diagnostico inicial',
        fecha: orden.fechaCreacion,
        detalle: orden.diagnostico || 'Pendiente'
      },
      {
        titulo: 'Fecha limite',
        fecha: orden.fechaLimite,
        detalle: 'Compromiso de entrega'
      }
    ];
  });

  readonly showIngresarPago = computed(() => {
    const estado = this.order()?.estado;
    return estado !== 'CERRADA';
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }
    const id = Number(idParam);
    this.isLoading.set(true);
    this.ordenService.getById(id).subscribe({
      next: orden => {
        this.order.set(orden);
        this.ordenState.setOrden(orden);
        this.descripcionDraft.set(orden.descripcion);
        this.diagnosticoDraft.set(orden.diagnostico);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });

    this.inventarioService.getRepuestos().subscribe(items => this.repuestos.set(items));
  }

  setTab(tab: string): void {
    this.activeTab.set(tab);
  }

  updateEstado(value: EstadoOrden): void {
    const orden = this.order();
    if (!orden) {
      return;
    }
    this.ordenService.changeStatus(orden.id, value).subscribe(updated => {
      this.applyOrdenUpdate(updated);
    });
  }

  updateTecnico(value: string): void {
    const orden = this.order();
    if (!orden) {
      return;
    }
    const tecnico = this.tecnicos.find(item => item.nombre === value);
    if (!tecnico) {
      return;
    }
    const updated = { ...orden, tecnicoAsignado: tecnico };
    this.applyOrdenUpdate(updated);
  }

  setTipoServicio(value: 'REPARACION' | 'MANTENCION' | 'GARANTIA'): void {
    const orden = this.order();
    if (!orden) {
      return;
    }
    this.ordenService.updateOrden(orden.id, { tipoServicio: value }).subscribe(updated => {
      this.applyOrdenUpdate(updated);
    });
  }

  startLineEdit(linea: LineaOrden): void {
    this.lineEditId.set(linea.id);
    this.lineDraft.set({ ...linea });
  }

  cancelLineEdit(): void {
    this.lineEditId.set(null);
    this.lineDraft.set(null);
  }

  saveLineEdit(): void {
    const orden = this.order();
    const draft = this.lineDraft();
    if (!orden || !draft) {
      return;
    }
    const original = orden.lineas.find(linea => linea.id === draft.id);
    if (original?.repuestoId) {
      const sameRepuesto = original.repuestoId === draft.repuestoId;
      if (sameRepuesto) {
        const diff = draft.cantidad - original.cantidad;
        if (diff > 0) {
          this.inventarioService.decrementStock(original.repuestoId, diff);
        }
        if (diff < 0) {
          this.inventarioService.incrementStock(original.repuestoId, Math.abs(diff));
        }
      } else {
        this.inventarioService.incrementStock(original.repuestoId, original.cantidad);
        if (draft.repuestoId) {
          this.inventarioService.decrementStock(draft.repuestoId, draft.cantidad);
        }
      }
    } else if (draft.repuestoId) {
      this.inventarioService.decrementStock(draft.repuestoId, draft.cantidad);
    }
    const total = this.calcularTotalLinea(draft);
    const payload = { ...draft, total };
    this.ordenService.updateLinea(orden.id, draft.id, payload).subscribe(updated => {
      const nextLineas = orden.lineas.map(linea =>
        linea.id === updated.id ? { ...updated, total: this.calcularTotalLinea(updated) } : linea
      );
      const nextOrden = this.recalcularTotales({ ...orden, lineas: nextLineas });
      this.applyOrdenUpdate(nextOrden);
      this.cancelLineEdit();
    });
  }

  addLinea(): void {
    const orden = this.order();
    if (!orden) {
      return;
    }
    const nextId = Math.max(0, ...orden.lineas.map(linea => linea.id)) + 1;
    const nuevaLinea: LineaOrden = {
      id: nextId,
      descripcion: 'Nuevo servicio',
      cantidad: 1,
      precioUnitario: 0,
      descuentoPct: 0,
      total: 0
    };
    this.ordenService.addLinea(orden.id, nuevaLinea).subscribe(() => {
      const nextOrden = this.recalcularTotales({
        ...orden,
        lineas: [...orden.lineas, { ...nuevaLinea, total: this.calcularTotalLinea(nuevaLinea) }]
      });
      if (nuevaLinea.repuestoId) {
        this.inventarioService.decrementStock(nuevaLinea.repuestoId, nuevaLinea.cantidad);
      }
      this.applyOrdenUpdate(nextOrden);
    });
  }

  removeLinea(linea: LineaOrden): void {
    const orden = this.order();
    if (!orden) {
      return;
    }
    this.ordenService.removeLinea(orden.id, linea.id).subscribe(() => {
      const nextOrden = this.recalcularTotales({
        ...orden,
        lineas: orden.lineas.filter(item => item.id !== linea.id)
      });
      if (linea.repuestoId) {
        this.inventarioService.incrementStock(linea.repuestoId, linea.cantidad);
      }
      this.applyOrdenUpdate(nextOrden);
    });
  }

  updateDescripcion(value: string): void {
    this.descripcionDraft.set(value);
    this.isSavingDescripcion.set(true);
    this.scheduleDescripcionSave(value);
  }

  updateKilometraje(value: number): void {
    const orden = this.order();
    if (!orden) {
      return;
    }
    this.ordenService.updateOrden(orden.id, { kilometraje: value }).subscribe(updated => {
      this.applyOrdenUpdate(updated);
    });
  }

  updateNivelCombustible(value: number): void {
    const orden = this.order();
    if (!orden) {
      return;
    }
    this.ordenService.updateOrden(orden.id, { nivelCombustible: value }).subscribe(updated => {
      this.applyOrdenUpdate(updated);
    });
  }

  updateEstadoVehiculo(value: string): void {
    const orden = this.order();
    if (!orden) {
      return;
    }
    this.ordenService.updateOrden(orden.id, { estadoVehiculo: value }).subscribe(updated => {
      this.applyOrdenUpdate(updated);
    });
  }

  toggleInventario(label: string, checked: boolean): void {
    const orden = this.order();
    if (!orden) {
      return;
    }
    const next = { ...orden.inventarioVehiculo, [label]: checked };
    this.ordenService.updateOrden(orden.id, { inventarioVehiculo: next }).subscribe(updated => {
      this.applyOrdenUpdate(updated);
    });
  }

  openPago(): void {
    const orden = this.order();
    if (!orden) {
      return;
    }
    this.router.navigate(['/pagos', orden.id]);
  }

  print(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.print();
    }
  }

  updateDiagnostico(value: string): void {
    this.diagnosticoDraft.set(value);
    this.isSavingDiagnostico.set(true);
    this.scheduleDiagnosticoSave(value);
  }

  addNota(): void {
    const orden = this.order();
    const texto = this.notaDraft().trim();
    if (!orden || !texto) {
      return;
    }
    const nota: Nota = {
      id: Math.max(0, ...orden.notas.map(item => item.id)) + 1,
      autor: 'Admin',
      fecha: new Date().toISOString(),
      texto
    };
    this.ordenService.addNota(orden.id, nota).subscribe(() => {
      this.applyOrdenUpdate({ ...orden, notas: [nota, ...orden.notas] });
      this.notaDraft.set('');
    });
  }

  toggleTarea(tarea: Tarea): void {
    const orden = this.order();
    if (!orden) {
      return;
    }
    const nextTareas = orden.tareas.map(item =>
      item.id === tarea.id ? { ...item, completada: !item.completada } : item
    );
    this.applyOrdenUpdate({ ...orden, tareas: nextTareas });
  }

  selectRepuesto(linea: LineaOrden, repuestoId: number): void {
    const repuesto = this.repuestos().find(item => item.id === repuestoId);
    if (!repuesto) {
      return;
    }
    const draft = this.lineDraft();
    if (!draft || draft.id !== linea.id) {
      return;
    }
    this.lineDraft.set({
      ...draft,
      descripcion: repuesto.nombre,
      precioUnitario: repuesto.precioVenta,
      repuestoId
    });
  }

  updateLineDraft<K extends keyof LineaOrden>(field: K, value: LineaOrden[K]): void {
    const draft = this.lineDraft();
    if (!draft) {
      return;
    }
    this.lineDraft.set({ ...draft, [field]: value });
  }

  private scheduleDescripcionSave(value: string): void {
    if (this.descripcionTimer) {
      clearTimeout(this.descripcionTimer);
    }
    this.descripcionTimer = setTimeout(() => {
      const orden = this.order();
      if (!orden) {
        this.isSavingDescripcion.set(false);
        return;
      }
      this.ordenService.updateOrden(orden.id, { descripcion: value }).subscribe(updated => {
        this.applyOrdenUpdate(updated);
        this.isSavingDescripcion.set(false);
      });
    }, 800);
  }

  private scheduleDiagnosticoSave(value: string): void {
    if (this.diagnosticoTimer) {
      clearTimeout(this.diagnosticoTimer);
    }
    this.diagnosticoTimer = setTimeout(() => {
      const orden = this.order();
      if (!orden) {
        this.isSavingDiagnostico.set(false);
        return;
      }
      this.ordenService.saveDiagnostico(orden.id, value).subscribe(updated => {
        this.applyOrdenUpdate(updated);
        this.isSavingDiagnostico.set(false);
      });
    }, 800);
  }

  private applyOrdenUpdate(orden: Orden): void {
    const nextOrden = this.recalcularTotales(orden);
    this.order.set(nextOrden);
    this.ordenState.setOrden(nextOrden);
  }

  private recalcularTotales(orden: Orden): Orden {
    const subtotal = orden.lineas.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad,
      0
    );
    const descuento = orden.lineas.reduce(
      (acc, item) => acc + item.precioUnitario * item.cantidad * (item.descuentoPct / 100),
      0
    );
    const neto = subtotal - descuento;
    const iva = neto * 0.19;
    const total = neto + iva;
    return { ...orden, subtotal, descuento, iva, total };
  }

  calcularTotalLinea(linea: LineaOrden): number {
    const bruto = linea.cantidad * linea.precioUnitario;
    return bruto - bruto * (linea.descuentoPct / 100);
  }

  private descripcionTimer: ReturnType<typeof setTimeout> | null = null;
  private diagnosticoTimer: ReturnType<typeof setTimeout> | null = null;
}
