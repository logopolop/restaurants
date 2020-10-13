import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";

//Material Module 
import { MaterialModule } from './material.module';

//Firebase Modules
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import firestoreConfig from './my-firestore';

//Application Components
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';
import { RestaurantRankingComponent } from './restaurant-ranking/restaurant-ranking.component';
import { ModalComponent } from './restaurant-ranking/modal.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

//Application Services
import { RestaurantService } from './services/restaurant.service';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    SuggestionFormComponent,
    SuggestionListComponent,
    RestaurantRankingComponent,
    RestaurantsComponent,
    ModalComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firestoreConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    RestaurantService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
