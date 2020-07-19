import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';
import { RankingComponent } from './ranking/ranking.component';


const routes: Routes = [
  { path: '', component: RankingComponent},
  { path:'', redirectTo:'restaurants', pathMatch:'full' },
  { path:'**', redirectTo:'restaurants' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
