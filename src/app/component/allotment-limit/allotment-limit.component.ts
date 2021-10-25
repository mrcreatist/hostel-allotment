import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-allotment-limit',
  templateUrl: './allotment-limit.component.html',
  styleUrls: ['./allotment-limit.component.scss']
})
export class AllotmentLimitComponent {
  @Input() control: FormControl;
}
