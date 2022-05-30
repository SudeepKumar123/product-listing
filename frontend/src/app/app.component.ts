import { Component,ViewContainerRef} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service'


declare var alertify:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:any=''
  constructor(private router:Router,private viewContainer:ViewContainerRef,private cookie: CookieService){
  }

  // async load(){
  //   this.viewContainer.clear()
  //   const {RegisterComponent}=await import('./register/register.component')
  //   this.viewContainer.createComponent(RegisterComponent)
  //   // this.viewContainer.clear()
  //   console.log('load')
  // }

  // async load1(){
  //   this.viewContainer.clear()
  //   const {LoginComponent}=await import('./login/login.component')
  //   this.viewContainer.createComponent(LoginComponent)
  //   // this.viewContainer.clear()
  //   console.log('load1')
  // }
  // async load2(){
  //   this.viewContainer.clear()
  //   const {AddProductComponent}=await import('./add-product/add-product.component')
  //   this.viewContainer.createComponent(AddProductComponent)
  //   // this.viewContainer.clear()
  //   console.log('load2')
  // }
  // async load3(){
  //   this.viewContainer.clear()
  //   const {ProductListComponent}=await import('./product-list/product-list.component')
  //   this.viewContainer.createComponent(ProductListComponent)
  //   // this.viewContainer.clear()
  //   console.log('load3')
  // }

  loggedIn(){
    return this.cookie.get("s.id")
    // return localStorage.getItem('token')
    
  }

  onLogout(){
    // localStorage.removeItem('token')
    // alert('Logout successfully..!!')
    

    this.cookie.delete("s.id")
    this.cookie.delete("logged_in")
    alertify.set('notifier','position', 'bottom-right');
    // alertify.success('Current position : ' + alertify.get('notifier','position'));
    alertify.error('Logout successfully',1.50)
    this.router.navigate(['login']) 
    // this.cookie.set("logged_in", "no", { expires: new Date(Date.now() + 300000), secure: true })

  }

  ngOnInit(): void {
    this.cookie.set("logged_in", "no", { expires: new Date(Date.now() + 300000), secure: true })
  
 
}
}

