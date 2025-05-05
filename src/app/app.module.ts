import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { AbstractControl, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms'
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core'
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormlyFieldStepper } from './types/stepper.type'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatStepperModule } from '@angular/material/stepper'
import { MatButtonModule } from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSelectModule } from '@angular/material/select'

export function isAdultValidatorMessage(error: any, field: FormlyFieldConfig) {
  return `"${field?.formControl?.value}" is not a valid age.`;
}
export function adultValidator(control: AbstractControl): ValidationErrors | null {
  return Number(control.value) >= 18 ? null : { 'adult': true };
}

@NgModule({
  declarations: [AppComponent, FormlyFieldStepper],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,

    FormlyModule.forRoot({
      /* Añade aqui todos los modulos que necesites */
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'adult', message: isAdultValidatorMessage },
      ],
      validators: [{ name: 'isAdult', validation: adultValidator }],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
