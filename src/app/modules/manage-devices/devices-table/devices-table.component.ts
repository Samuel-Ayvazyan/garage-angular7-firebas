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
  displayedColumns = ['id', 'device', 'os', 'manufacturer', 'lastCheckOutDate', 'lastCheckOutBy', 'isCheckedOut'];
  dataSource = new DeviceDataSource(this.ds);

  constructor(private ds: DeviceService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  public openAdd(): void {
    const dialogRef = this.dialog.open(DeviceDialogComponent, {
      width: '250px',
      data: {
        title: "Add new"
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

  private _prepareForAdd(device) {
    delete device.id
    device.isCheckedOut = false;
    device.lastCheckOutBy = null;
    device.lastCheckOutDate = null;
    return device
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