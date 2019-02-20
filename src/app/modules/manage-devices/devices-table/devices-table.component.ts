import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { DeviceService } from 'src/app/shared/services/devices/device.service';
import { MatDialog } from '@angular/material';
import { DeviceDialogComponent } from '../device-dialog/device-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.scss']
})
export class DevicesTableComponent implements OnInit {
  displayedColumns = ['id', 'device', 'os', 'manufacturer', 'lastCheckOutDate', 'lastCheckOutBy', 'isCheckedOut', 'edit'];
  dataSource = new DeviceDataSource(this.ds);
  devicesCount;

  constructor(private ds: DeviceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.ds.getDevices().subscribe( data => {
      this.devicesCount = data.length;
    })
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
      if(result) {
        result = this._prepareForAdd(result);
        this.ds.addDevice(result).then( data => {
          console.log('Device is added');
        }).catch(error =>{
          this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
              title: "Information",
              message: "Only 10 Devices allowed",
              onlyConfirm: true,
            }
          });
        });
      }
    });
  }

  public openEdit(device) {
    const dialogRef = this.dialog.open(DeviceDialogComponent, {
      width: '250px',
      data: {
        title: "Edit",
        $key: device.$key,
        values: this._prepareForEditDialog(device),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        result = this._prepareForEdit(result);
        this.ds.updateDevice(result);
      }
    });
  }

  public deleteDevice(device) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: "Please confirm",
        message: "Delete selected device?",
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.ds.deleteDevice(device.$key);
      }
    });
  }

  public checkIn(device) {
    this.ds.updateCheckedOut(device.$key, false);
  }
  public checkOut(device) {
    this.ds.updateCheckedOut(device.$key, true).then( data => {
      console.log('Check-out is done');
    }).catch(error =>{
      this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        data: {
          title: "Information",
          message: "Checkouts can only be performed between 9AM and 5PM",
          onlyConfirm: true,
        }
      });
    });
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