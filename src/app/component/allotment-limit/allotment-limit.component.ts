import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-allotment-limit',
  templateUrl: './allotment-limit.component.html',
  styleUrls: ['./allotment-limit.component.scss']
})
export class AllotmentLimitComponent {
  @Input() control: FormControl;
  @Input() perHostelValue: number;
  @Input() hostelCount: number;
  @Output() action = new EventEmitter();

  operation(type: string) {
    this.action.emit(type);
  }
}
