import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms'
import { UserService } from '../user.service'
import { RouterModule, Router } from '@angular/router';
declare var alertify: any
console.log('rrrrrrrrrrrrrrrrrrr')

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  title = ''
  submitted: boolean = false
  state: boolean= false
  state1: any= ''
   
  // CREATE REACTIVE FORM
  register = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    cpassword: new FormControl('', [Validators.required]),
  })

 constructor(private user: UserService, private router: Router) {
  console.log("register")
 }
//  passMatch(){
//   if(this.register.value.password==this.register.value.cpassword){
//     console.log('password match')
//   }
//  }

  collection() {
    this.submitted = true
    this.state= false
    this.state1= ''
    
    if (this.register.invalid) {
      return
    }

    if(this.register.value.password!=this.register.value.cpassword){
      this.state = true
      console.log('password not match')
      return
    }
    
    this.user.registerUser(this.register.value).subscribe((result: any) => {
      this.register.controls['name'].reset()
      console.log(result)
      this.title = result
      if (result == 'That username already exists') {

        alertify.success(result, 3)

      }

      else
        if (result == 'That email already exists') {
          alertify.success(result, 3)
        }
        else {
          alertify.success("Registered successfully..!!", 3)
          this.router.navigate(['/login'])
        }
    })
  }

  get name() {
    return this.register.get('name')
  }
  get email() {
    return this.register.get('email')
  }
  get password() {
    return this.register.get('password')
  }

  get cpassword() {
    return this.register.get('cpassword')
  }

  ngOnInit(): void {

  }

}
