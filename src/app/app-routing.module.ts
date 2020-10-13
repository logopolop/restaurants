import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';


const routes: Routes = [
  { path: 'restaurants', component: RestaurantsComponent },
  //{ path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path:'', redirectTo:'restaurants', pathMatch:'full' },
  { path:'**', redirectTo:'restaurants' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
