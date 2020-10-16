import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, Validators } from "@angular/forms";
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.scss']
})
export class SuggestionFormComponent implements OnInit {

  suggestionForm;

  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(private builder: FormBuilder, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.suggestionForm = this.builder.group({
      name: ['', Validators.required]
    });
  }

  async addRestaurant() {
    const result = await this.restaurantService.createRestaurant(this.suggestionForm.value.name);
    
    this.formDirective.resetForm();
  }

}
