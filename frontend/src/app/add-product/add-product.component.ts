import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms'
import { UserService } from '../user.service'
import { RouterModule, Router } from '@angular/router';
declare var alertify: any
console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa')


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  submitted: any = false

  addproduct = new FormGroup({
    pname: new FormControl(''),
    barcode: new FormControl(''),
    cdate: new FormControl(''),
    edate: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
  })

  constructor(private user: UserService, private router: Router) {
    console.log("add-product")
   }

  addingItem() {
    console.log(this.addproduct)
    this.user.addProduct(this.addproduct.value).subscribe((result: any) => {
      if (result == false) {
        this.submitted = true
      } else {
        this.submitted = false
        console.log(result)
        alertify.success('Product Add successfully..!!')
        this.addproduct.reset()
      }
    })
  }

  get pname() {
    return this.addproduct.get('pname')
  }
  get barcode() {
    return this.addproduct.get('barcode')
  }
  get cdate() {
    return this.addproduct.get('cdate')
  }
  get edate() {
    return this.addproduct.get('edate')
  }
  get price() {
    return this.addproduct.get('price')
  }
  get quantity() {
    return this.addproduct.get('quantity')
  }

  ngOnInit(): void {
  }

}
