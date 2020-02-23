import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ng-honduras-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  title = 'ngrx-example';
}
