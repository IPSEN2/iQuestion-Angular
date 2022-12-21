import { KeyValue } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  navOpen : boolean = false;
  user: any;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user$
      .subscribe((user) => {
        this.user = user?.user;
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }
}