import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [alt]="housingLocation?.name" [src]="housingLocation?.photo">
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About This Housing</h2>
        <ul>
          <li>Units availble: {{housingLocation?.availableUnits}}</li>
          <li>Does this location wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">

          <label for="first-name">First Name</label>
          <input type="text" id="first-name" placeholder="First Name . . ." formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" placeholder="Last Name . . ." formControlName="lastName">

          <label for="email">email</label>
          <input type="email" id="email" placeholder="email . . ." formControlName="email">

          <button class="primary" type="submit">Apply Now</button>
        </form>

      </section>

    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
    
  }

  submitApplication() {
    const { firstName, lastName, email } = this.applyForm.value;
    this.housingService.submitApplication(
      firstName ?? '',
      lastName ?? '',
      email ?? ''
    );
  }
}
