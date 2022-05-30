import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserService } from '../user.service'
import { ActivatedRoute, Router } from '@angular/router';
declare var alertify: any

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  editProduct = new FormGroup({
    pname: new FormControl(''),
    barcode: new FormControl(''),
    cdate: new FormControl(''),
    edate: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
  })
  constructor(private user: UserService, private router: ActivatedRoute, private routers: Router) { }
  update() {
    this.user.updateProduct(this.router.snapshot.params['id'], this.editProduct.value).subscribe((result) => {
      if (result) {
        alertify.success(result)
        this.routers.navigate(['/product-list'])
      }
    })
  }


  get pname() {
    return this.editProduct.get('pname')
  }
  get barcode() {
    return this.editProduct.get('barcode')
  }
  get cdate() {
    return this.editProduct.get('cdate')
  }
  get edate() {
    return this.editProduct.get('edate')
  }
  get price() {
    return this.editProduct.get('price')
  }
  get quantity() {
    return this.editProduct.get('quantity')
  }

  ngOnInit(): void {
    console.log('hlw')
    this.user.getCurrentProduct(this.router.snapshot.params['id']).subscribe((result: any) => {
      console.log(result[0].pname)
      this.editProduct = new FormGroup({
        pname: new FormControl(result[0].pname),
        barcode: new FormControl(result[0].barcode, [Validators.required, Validators.pattern('[a-zA-Z0-9_]')]),
        cdate: new FormControl(result[0].cdate),
        edate: new FormControl(result[0].edate),
        price: new FormControl(result[0].price),
        quantity: new FormControl(result[0].quantity)
      })
    })
  }
}
