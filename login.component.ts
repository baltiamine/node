import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {UserService} from 'src/app/service/user.service';
import { User } from 'src/app/module/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin:FormGroup
  constructor(public fb:FormBuilder,
    private router:Router,
    private userService:UserService ) {
      this.formLogin = fb.group({

        email: new FormControl("", [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(8)
        ]),
  
      })

     }
     get email(){ return this.formLogin.get('email');};
     get password(){return this.formLogin.get('password')};

  ngOnInit() {
    let isLoged=this.userService.isLoged();
    if(isLoged) {this.router.navigate(['/products-list'])}
  }
  connex() {
    let data = this.formLogin.value;
    console.log(data)
    let user = new User(null, null, null, data.email, data.password)
    console.log("user", user)
    this.userService.loginUser(user).subscribe(
      (res) => {

        console.log("login Result: ", res);       
        let token = res.token;
        localStorage.setItem('token', token);
      
       

        this.router.navigate(['/products'])
          
          
      },
      (err) => {
        console.log(err);

      }
    )
  }

}
