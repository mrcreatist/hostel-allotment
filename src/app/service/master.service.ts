import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  data = {
    classSection: ['A', 'B'],
    foodType: ['Veg', 'Non-Veg']
  }

  getClassSection() {
    return this.data.classSection;
  }

  getFoodType() {
    return this.data.foodType;
  }

}
