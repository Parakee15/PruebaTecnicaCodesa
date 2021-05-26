import { Component, forwardRef, Host, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-control-error',
  templateUrl: './form-control-error.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormControlErrorComponent)
    },
  ]
})
export class FormControlErrorComponent implements OnInit, ControlValueAccessor {
  @Input()
  formControlName: string;

  @Input()
  className: string;

  control: AbstractControl;
  formError: string;
  customErrorMessages: any;

  constructor(
    private controlContainer: ControlContainer,
  ) { }

  ngOnInit() {
    this.control = this.controlContainer.control.get(this.formControlName);
    this.customErrorMessages = this.getCustomErrorMessages(<FormGroup>this.control.parent);

    this.control.statusChanges.subscribe(status => {
      if ((this.control.invalid && this.control.dirty) || (this.control.invalid && this.control.touched)) {
        Object.keys(this.control.errors).every(errorName => {
          this.formError = this.getErrorMessage(errorName, this.control.errors[errorName]);
          return false;
        });
      } else { this.formError = ''; };
    });
  }

  private getCustomErrorMessages(form: FormGroup) {
    return (<any>form)._customErrors;
  }

  private getErrorMessage(errorName: string, error: any) {
    if (this.customErrorMessages && this.customErrorMessages[this.formControlName] && this.customErrorMessages[this.formControlName][errorName]) {
      return this.customErrorMessages[this.formControlName][errorName];
    }

    const messages = {
      required: () => 'Campo requerido',
    };

    return messages[errorName].call(this, error);
  }

  writeValue(value: any) { }
  registerOnChange(fn) { }
  registerOnTouched(fn) { }
}
