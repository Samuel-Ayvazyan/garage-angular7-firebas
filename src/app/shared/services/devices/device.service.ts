import { Injectable } from '@angular/core';
import { Device } from '../../interfaces/device'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private itemsCollection: AngularFirestoreCollection<Device>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Device>('devices');
  }

  getDevices(): Observable<Device[]> {
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Device;
        const $key = a.payload.doc.id;
        return { $key, ...data };
      }))
    );
  }

  addDevice(item: Device) {
    return this.itemsCollection.add(item);
  }

  updateDevice(item : Device){
    this.itemsCollection.doc(item.$key).update(item);
  }

  updateCheckedOut($key : string, isCheckedOut: boolean, lastCheckOutBy: string){
    if(isCheckedOut) {
      return this.itemsCollection.doc($key).update(
        {
          isCheckedOut: isCheckedOut,
          lastCheckOutBy: lastCheckOutBy
        }
      );
    } else {
      return this.itemsCollection.doc($key).update({isCheckedOut: isCheckedOut});
    }
  }
 
  deleteDevice($key : string){
    this.itemsCollection.doc($key).delete();
  }
}
