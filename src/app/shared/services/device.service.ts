import { Injectable } from '@angular/core';
import { Device } from '../interfaces/device'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private itemsCollection: AngularFirestoreCollection<Device>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Device>('devices');
  }

  getDevices(): Observable<Device[]> {
    return this.itemsCollection.valueChanges();
  }

  addDevice(item: Device) {
    this.itemsCollection.add(item);
  }

  updateDevice(item : Device){
    this.itemsCollection.doc(item.$key).update(item);
  }
 
  deleteDevice($key : string){
    this.itemsCollection.doc($key).delete();
  }
}
