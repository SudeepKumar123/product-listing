import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login',
    // canActivate: [RouteGuard],
  },
  {
    component: ListComponent,
    path: 'list',
    // canActivate: [RouteGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
