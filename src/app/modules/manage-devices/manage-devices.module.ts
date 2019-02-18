import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesTableComponent } from './devices-table/devices-table.component';
import { ManageDevicesRoutingModule } from './manage-devices-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { DeviceDialogComponent } from './device-dialog/device-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [DevicesTableComponent, DeviceDialogComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    ManageDevicesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    DeviceDialogComponent,
    ConfirmDialogComponent,
  ]
})
export class ManageDevicesModule { }
