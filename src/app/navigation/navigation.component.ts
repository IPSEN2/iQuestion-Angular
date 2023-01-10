import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {LocalUserService} from "../shared/services/localUser.service";
import {User} from "../shared/models/user.model";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  navOpen: boolean = false;
  user: User | undefined;

  constructor(private authService: AuthService, private localUserService: LocalUserService) {
  }

  ngOnInit() {
    this.user = this.localUserService.localUser.user;
  }

  onLogout() {
    this.authService.logout();
  }
}
