import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-error-message',
  templateUrl: './errorMessage.component.html',
  standalone: true,
})
export class ErrorMessageComponent {
  @Input() message: string = 'Something went wrong';
}
