import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
// import { RouterModule, Router } from '@angular/router';

declare var alertify: any
console.log('ppppppppppppppppppp')

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  collection: any = [];
  constructor(private user: UserService) {
    console.log("product-list")
  }

  ngOnInit(): void {
    this.user.getProductList().subscribe((result:any) => {
      console.log(result)
      var stringified = JSON.stringify(result);
      var parsedObj = JSON.parse(stringified);
      this.collection = parsedObj;
    })
  }

  deleteProduct(item: any) {
    this.user.deleteProduct(item).subscribe((result) => {
      if (result) {
        this.user.getProductList().subscribe((result) => {
          console.log(result)
          this.collection = result;
        })

        alertify.success("Product removed from list..!!", 3)
      }

    })

  }
}
