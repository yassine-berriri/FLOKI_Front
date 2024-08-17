import { Component, Input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [SharedModule],
  providers: [
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: PasswordInputComponent,
    multi: true,
    },
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss'
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() placeholder: string= "";
  passwordControl = new FormControl('');
  showPassword = false;

  public onTouched: () => void = () => {};
  private onChange: (value: string) => void = () => {};

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  writeValue(value: string): void {
    this.passwordControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.passwordControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.passwordControl.disable() : this.passwordControl.enable();
  }
}
