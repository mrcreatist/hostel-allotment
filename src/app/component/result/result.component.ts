import { Component, Input } from '@angular/core';
import { section } from 'src/app/enum';
import { result } from 'src/app/model';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  @Input() columns: Array<result>;
  @Input() result: Array<result>;

  hostel = 0;

  getHostel(element) {
    return this.isHostel(element) ? ++this.hostel : null
  }

  isHostel(element) {
    return element.section === section.A || element.section === section.B
  }
}
