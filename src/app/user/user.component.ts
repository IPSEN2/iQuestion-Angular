import { Component } from '@angular/core';

export interface User {
  id: number;
  name: string;
  role: string;
  organisation: string;
  email: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

}
