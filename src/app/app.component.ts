import { Component } from '@angular/core';
import { CountDown } from './countdown';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  directives: [CountDown],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {
  title = 'Election day countdown!';
}
