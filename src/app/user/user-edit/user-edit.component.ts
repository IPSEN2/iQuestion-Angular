import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/api/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-userEdit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit{
  user$!: User;
  updateUserForm = new FormGroup({
    updateName: new FormControl(null, Validators.required),
    updateOrganization: new FormControl(null, Validators.required),
    updateRole: new FormControl(null, Validators.required)
  })


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      throw new Error('No id found');
    }

    // get questionnaire from api then create questions
    this.userService.get(id).subscribe((user) => {
      console.log(id);
      console.log(user)
      this.user$ = user;
    });
  }

  ngOnInit(){

  }

}
