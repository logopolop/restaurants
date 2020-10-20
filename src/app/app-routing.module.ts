import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { AuthGuard } from './guards/auth.guard';
import { RestaurantsComponent } from './restaurants/restaurants.component';


const routes: Routes = [
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/verify-email', component: VerifyEmailComponent },
  { path: '', redirectTo:'restaurants', pathMatch:'full' },
  { path: '**', redirectTo:'restaurants' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
