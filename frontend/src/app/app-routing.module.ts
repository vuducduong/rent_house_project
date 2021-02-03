import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDetailComponent } from './Components/home/home-detail/home-detail.component';
import { HomeComponent } from './Components/home/home.component';
import { HostComponent } from './Components/host/host.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';

const routes: Routes = [
  {path:'',component: HomeComponent},

  {path:'homes',component: HomeComponent},

  {path:'myHomeList',component: HostComponent},
  
  {path:'houseDetail/:id',component: HomeDetailComponent},

  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
