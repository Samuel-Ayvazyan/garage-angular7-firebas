import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-device-dialog',
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./device-dialog.component.scss']
})
export class DeviceDialogComponent implements OnInit {
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    fb: FormBuilder) {
      this.frm = fb.group({
        device: ['', Validators.required],
        os: ['', Validators.required],
        manufacturer: ['', Validators.required],
      });
  }

  ngOnInit() {
    if(this.data.values) {
      this.frm.setValue(this.data.values);
    }
  }

  onSubmit() {
    if( this.frm.valid ) {
      console.log(this.data.$key);
      if(this.data.$key) {
        let $key = this.data.$key;
        this.dialogRef.close({ $key, ...this.frm.value });
      } else {
        this.dialogRef.close(this.frm.value);
      }
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
