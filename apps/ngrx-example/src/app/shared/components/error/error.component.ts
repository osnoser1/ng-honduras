import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'ng-honduras-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent implements OnChanges {
  @Input() controlName?: string;
  @Input() messages?: Record<string, string>;

  control?: AbstractControl | null;

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.controlName || changes.messages) && this.controlName) {
      this.control = this.formGroupDirective.control.get(this.controlName);
    }
  }
}
