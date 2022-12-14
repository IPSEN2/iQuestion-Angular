import {Component} from '@angular/core';
import * as $ from 'jquery';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  navOpen : boolean = false;
  constructor(private authService: AuthService) {
  }

  onLogout() {
    this.authService.logout();
  }
}
