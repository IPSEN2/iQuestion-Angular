import {Component, OnInit} from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
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
  collapsed: boolean = true;
  // Get the full route, including the parent route
  
  path:string = this.activatedRoute.snapshot.parent?.parent?.routeConfig?.path || this.activatedRoute.snapshot.parent?.routeConfig?.path || this.activatedRoute.snapshot.routeConfig?.path || '';


  constructor(private authService: AuthService, private localUserService: LocalUserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = this.localUserService.localUser;

    console.log(this.path)
  }

  onLogout() {
    this.authService.logout();
  }
}
