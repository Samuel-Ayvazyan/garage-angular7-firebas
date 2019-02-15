import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { DeviceService } from 'src/app/shared/services/device.service';

@Component({
  selector: 'app-devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.scss']
})
export class DevicesTableComponent implements OnInit {
  displayedColumns = ['id', 'device', 'os', 'manufacturer', 'lastCheckOutDate', 'lastCheckOutBy', 'isCheckedOut'];
  dataSource = new DeviceDataSource(this.ds);

  constructor(private ds: DeviceService) { }

  ngOnInit() {
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