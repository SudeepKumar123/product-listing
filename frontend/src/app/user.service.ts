import { Injectable } from '@angular/core';
import{HttpClient,HttpErrorResponse} from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // http://localhost:5002/product-list
  // http://localhost:5002/product-list
  // rootUrl='http://localhost:5000/'
  // url='http://localhost:5000/lists/'
  constructor(private http:HttpClient,private cookie: CookieService) { }
  registerUser(data:any){
    return this.http.post("register",data)
  }
  
  loginUser(data:any){
    return this.http.post("login",data)
  }

  loggedIn(){
    return this.cookie.get("s.id")
    // return localStorage.getItem('token')
  }

  getList(){
    return this.http.get("list1")
  }

  addProduct(data:any){
    return this.http.post("add-product",data)
  }

  getProductList(): Observable<any>{
    return this.http.get("product-list1",{responseType: "json"})
  }

  // getCurrentUser(id:any){
  //   return this.http.get(this.url + id)
  // }

  deleteProduct(id:any){
    return this.http.delete("product-list/" + id)
  }

  getCurrentProduct(id:any){
    return this.http.get("product-list/" + id)
  }

  // getCurrentProduct(id:any)
  // {
  //   return this.http.get(`${this.rootUrl ${product-list}}/${id}`);
  // }

  updateProduct(id:any,data:any){
    return this.http.put("update-product/" + id,data)
  }

  // userProfile(id:any,data:any){
  //   return this.http.put("profile/" + id,data)
  // }
}

