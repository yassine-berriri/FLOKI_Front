import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { VisitorComponent } from './core/spaces/spaces.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, NgClass, RouterOutlet, VisitorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'flokiProject_MVP';
  isActive = true;
  //name: string = "";
  name = signal<string>(''); 
  listOfNames: string[] = [];

  handleClick() {
    this.isActive = !this.isActive;
    if (this.name().length === 0 || this.name == null) {
    return;
    }
    console.log('click name = ', this.name());
    this.listOfNames.push(this.name());
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.name.set(inputElement.value);
  }
}
