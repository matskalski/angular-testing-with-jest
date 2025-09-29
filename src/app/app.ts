import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from "./components/todos/todos.component";

@Component({
  selector: 'app-root',
  imports: [TodosComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-testing-with-jest');
}
