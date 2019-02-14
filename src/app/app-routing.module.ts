import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'manage-devices',
    loadChildren: './modules/manage-devices/manage-devices.module#ManageDevicesModule'
  },
  {
    path: '**',
    redirectTo: 'manage-devices'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
