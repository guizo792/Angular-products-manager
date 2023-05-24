import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'customers', component: CustomersComponent },
  {path: 'admin', component:AdminTemplateComponent, children: [
    
    {path: '', component: LoginComponent}
    { path: 'login', component: LoginComponent },
]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
