import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesTableComponent } from './devices-table/devices-table.component';

const routes: Routes = [
  { path: '', component:  DevicesTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ManageDevicesRoutingModule {}
