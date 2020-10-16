import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";

//Material Module 
import { MaterialModule } from './material.module';

//Firebase Modules + environment
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from 'src/environments/environment';

//Application Components
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';
import { RestaurantRankingComponent } from './restaurant-ranking/restaurant-ranking.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ModalComponent } from './restaurant-ranking/modal.component';

//Application Services
import { AuthService } from './services/auth.service';
import { RestaurantService } from './services/restaurant.service';


@NgModule({
  declarations: [
    AppComponent,
    SuggestionFormComponent,
    SuggestionListComponent,
    RestaurantRankingComponent,
    RestaurantsComponent,
    ModalComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    SuggestionListComponent
  ],
  providers: [
    AuthService,
    RestaurantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
