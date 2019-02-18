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
        $key: null,
        id: null,
        device: ['', Validators.required],
        os: ['', Validators.required],
        manufacturer: ['', Validators.required],
      });
  }

  ngOnInit() {
  }

  onSubmit() {
    if( this.frm.valid ) {
      this.dialogRef.close(this.frm.value);
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
