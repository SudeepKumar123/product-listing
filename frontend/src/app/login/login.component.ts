import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../user.service'
import { CookieService } from 'ngx-cookie-service'

declare var alertify: any

console.log('lllllllllllllllllllllllll')


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  show: any = true
  rem: any = false
  checked: any = false

  loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private user: UserService, private router: Router, private cookie: CookieService) {
    console.log("login")
  }

  login() {
    this.user.loginUser({ login: this.loginForm.value, rem: this.rem }).subscribe((result: any) => {
      console.log(result)
      if (result.rem == true) {
        this.cookie.set("name", result.data.name, { path: "http://localhost:4200/login" })
        this.cookie.set("pswd", result.pass, { path: "http://localhost:4200/login" })

      }else{
        this.cookie.delete("name")
        this.cookie.delete("pswd")
      }

      if (result) {

        // this.cookie.set("name", result.data.name, { expires: new Date(Date.now() + 300000), secure: true })

        this.cookie.set("s.id", result.session, { expires: new Date(Date.now() + 300000), secure: true })
        this.cookie.set("logged_in", "yes", { expires: new Date(Date.now() + 300000), secure: true })
        alertify.success("Login Successfully..!!" + result.data.name, 3)
        this.router.navigate(['/list'])

        // localStorage.setItem("token", JSON.stringify(result))
        // let getUser = JSON.parse(localStorage.getItem("token")!)
        // alertify.success("Login Successfully..!!" + getUser.data.name, 30)

      }
      else {
        // this.cookie.set("logged_in", "no", { expires: new Date(Date.now() + 300000), secure: true })
        alertify.error("Login Failed..!!", 3)
      }
    })
  }

  toggle() {
    this.show = !this.show
  }

  remember() {
    this.rem = !this.rem
    // this.cookie.set("name",this.loginForm.value.name,{path:"http://localhost:4200/login"})
    // this.cookie.set("pswd",this.loginForm.value.password,{path:"http://localhost:4200/login"})
  }

  ngOnInit(): void {
    this.cookie.set("logged_in", "no", { expires: new Date(Date.now() + 300000) })
    this.loginForm = new FormGroup({
      name: new FormControl(this.cookie.get("name")),
      password: new FormControl(this.cookie.get("pswd"))
    })

    if(this.cookie.get("name")){
         this.rem=true
    }

  }

  get name() {
    return this.loginForm.get('name')
  }

}

