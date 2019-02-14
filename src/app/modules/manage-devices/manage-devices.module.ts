import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesTableComponent } from './devices-table/devices-table.component';
import { ManageDevicesRoutingModule } from './manage-devices-routing.module';

@NgModule({
  declarations: [DevicesTableComponent],
  imports: [
    CommonModule,
    ManageDevicesRoutingModule,
  ]
})
export class ManageDevicesModule { }
