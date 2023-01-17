import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from "../auth/auth.service";
import {LocalUserService} from "../shared/services/localUser.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  navOpen: boolean = false;
  user: any;

  constructor(private authService: AuthService, private localUserService: LocalUserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = this.localUserService.localUser;
  }

  getRoute() {
    // Returns text of the current route
    // Example: /users => Users
    // If path is empty, return questionnaires
    let path = this.activatedRoute.snapshot.routeConfig?.path;
    if (path === '') {
      return 'questionnaires';
    }
    return path;
  }

  onLogout() {
    this.authService.logout();
  }
}
