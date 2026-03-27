import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosRoutingModule } from './vehiculos-routing-module';

// Importación de componentes
import { VehiculosList } from './vehiculos-list/vehiculos-list';
import { VehiculoForm } from './vehiculo-form/vehiculo-form';
import { VehiculoDetail } from './vehiculo-detail/vehiculo-detail';
import { VehiculoHistorial } from './vehiculo-historial/vehiculo-historial';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    VehiculosRoutingModule,
    // Componentes Standalone
    VehiculosList,
    VehiculoForm,
    VehiculoDetail,
    VehiculoHistorial
  ],
})
export class VehiculosModule {}