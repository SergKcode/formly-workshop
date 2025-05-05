import { Component, OnInit } from '@angular/core'
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formValuesJson: string = ''
  public languages = [
    { value: 'en', viewValue: 'En' },
    { value: 'es', viewValue: 'Es' },
  ]

  constructor(private _formBuilder: FormBuilder) { }

  form = new FormGroup({})
  model: any = {}
  options: FormlyFormOptions = {
    formState: {
      isData: false
    }
  }

  dataForm = this._formBuilder.group({
    isData: false,

  })

  fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          props: { label: 'Test' },
          fieldGroup: [

            {
              key: "age",
              type: "input",
              //validators: {
              //  validation: ['isAdult']
              // },
              props: {
                label: "Edad",
                // required: true
              },
            },
            // 
            //  {
            //  key: "brands",
            //   type: "input",
            //   props: {
            //     label: 'Brands'
            //   },
            //   expressions: {
            //      className: (field: FormlyFieldConfig) => {
            //       return !!field?.options?.formState.isData ? 'text-primary' : 'text-warning';
            //     },
            //   hide: (field: FormlyFieldConfig) => {
            //      return !!field?.options?.formState.isData
            //    }
            //   }

            //    }

            // {
            //   key: "drink",
            //   type: "input",
            //validators: {
            //  validation: ['isAdult']
            // },
            //    props: {
            //     label: "Botella de alcohol",
            // required: true
            //    },
            //   expressions: {
            //className: (field: FormlyFieldConfig) => {
            //   return this._getIfCarBrandExist() ? 'input-red' : 'input-green';
            // },
            //hide: (field: FormlyFieldConfig) => {
            //   return Number(field.model.age) < 18 || !field.model.age
            //  },
            //  'props.label': (field: FormlyFieldConfig) => {
            //     return (Number(field.model.age) < 18 || !field.model.age) ? 'Botella de agua' : 'Botella de alcohol'
            //  },
            // }
            // }
          ],
        }
      ],
    },
  ]

  ngOnInit(): void {
    this._getIsScibGlobal()
    this._printFormValues()
  }

  reset() {

    //Añade el codigo necesario para resetear el formulario
  }

  private _getIsScibGlobal() {
    this.dataForm.valueChanges.subscribe((values) => {
      this.options.formState.isData = values.isData
      // Añade aqui el codigo necesario para poder hacer dinamicos los campos que requieren el valor de SCIB y el idioma
    })
  }

  private _printFormValues() {
    this.form.valueChanges.subscribe((formValues) => {
      this.formValuesJson = JSON.stringify(formValues, null, 2) // Guárdalo como string bonito
    })
  }




  submit() {
    alert(JSON.stringify(this.model))
  }
}
