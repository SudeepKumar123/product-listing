import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { ListComponent } from './list/list.component'
import { AddProductComponent } from './add-product/add-product.component'
import { ProductListComponent } from './product-list/product-list.component'
import { UpdateProductComponent } from './update-product/update-product.component'
import { AuthGuardGuard } from './auth-guard.guard'
import { RouteGuard } from './route.guard'



const routes: Routes = [
  {
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(mod=>mod.AdminModule)
  },
  {
    component: RegisterComponent,
    path: 'register',
    canActivate: [RouteGuard],
  },
  {
    component: LoginComponent,
    path: 'login',
    canActivate: [RouteGuard]
  },
  {
    component: ListComponent,
    path: 'list',
    canActivate: [AuthGuardGuard]
  },
  {
    component: AddProductComponent,
    path: 'add-product',
    canActivate: [RouteGuard]
  },
  {
    component: ProductListComponent,
    path: 'product-list',
    canActivate: [RouteGuard]
  },
  // {
  //   component: ProductListComponent,
  //   path: '**',
  //   canActivate: [RouteGuard]
  // },
  {
    component: UpdateProductComponent,
    path: 'update-product/:id'
  },
  // {
  //   component: RegisterComponent,
  //   path: '**',
  //   canActivate: [RouteGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
