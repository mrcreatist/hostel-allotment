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

  getValue(item) {

    let str: string = '';
    item.forEach((element, index) => {
      str = str + (index === 1 && item[0].indexOf('<br>') > -1 ? '' : (index === 0 ? '' : ', ')) + element;
    });
    return str;
  }
}
