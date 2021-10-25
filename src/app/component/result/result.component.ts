import { Component, Input } from '@angular/core';
import { result } from 'src/app/model';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  @Input() columns: Array<result>;
  @Input() result: Array<result>;
}
