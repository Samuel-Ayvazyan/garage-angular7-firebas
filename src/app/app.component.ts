import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'garage-angular7-firebase';
  constructor(public auth: AuthService, public router: Router) {
    this.auth.user.subscribe( user =>{
      if( user ) {
        this.router.navigate(['/manage-devices']);
      }
    })
  }
}
