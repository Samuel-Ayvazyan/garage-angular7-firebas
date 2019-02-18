import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { DeviceService } from 'src/app/shared/services/device.service';
import { MatDialog } from '@angular/material';
import { DeviceDialogComponent } from '../device-dialog/device-dialog.component';

@Component({
  selector: 'app-devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.scss']
})
export class DevicesTableComponent implements OnInit {
  displayedColumns = ['id', 'device', 'os', 'manufacturer', 'lastCheckOutDate', 'lastCheckOutBy', 'isCheckedOut', 'edit'];
  dataSource = new DeviceDataSource(this.ds);

  constructor(private ds: DeviceService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  public openAdd(): void {
    const dialogRef = this.dialog.open(DeviceDialogComponent, {
      width: '250px',
      data: {
        title: "Add new",
        values: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        result = this._prepareForAdd(result);
        this.ds.addDevice(result);
      }
    });
  }

  public openEdit(device) {
    console.log(device);
    const dialogRef = this.dialog.open(DeviceDialogComponent, {
      width: '250px',
      data: {
        title: "Edit",
        $key: device.$key,
        values: this._prepareForEditDialog(device),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        result = this._prepareForEdit(result);
        console.log(result);
        this.ds.updateDevice(result);
      }
    });
  }

  public deleteDevice(device) {
    this.ds.deleteDevice(device.$key);
  }

  private _prepareForAdd(device) {
    let deviceDup: any = Object.assign({},device)
    delete deviceDup.id;
    delete deviceDup.$key;
    deviceDup.isCheckedOut = false;
    deviceDup.lastCheckOutBy = null;
    deviceDup.lastCheckOutDate = null;
    return deviceDup
  }
  private _prepareForEdit(device) {
    let deviceDup: any = Object.assign({},device)
    delete deviceDup.id;
    delete deviceDup.isCheckedOut;
    delete deviceDup.lastCheckOutBy;
    delete deviceDup.lastCheckOutDate;
    return deviceDup
  }
  private _prepareForEditDialog(device) {
    let deviceDup: any = Object.assign({},device)
    delete deviceDup.id;
    delete deviceDup.$key;
    delete deviceDup.isCheckedOut;
    delete deviceDup.lastCheckOutBy;
    delete deviceDup.lastCheckOutDate;
    return deviceDup
  }
}

export class DeviceDataSource extends DataSource<any> {

  constructor(private ds: DeviceService) {
    super()
  }

  connect() {
    return this.ds.getDevices();
  }

  disconnect() {

  }
}