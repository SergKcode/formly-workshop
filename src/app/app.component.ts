import { Component, OnInit } from '@angular/core'
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AppService } from './services/app.service'
import { switchMap } from 'rxjs'

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

  constructor(private _formBuilder: FormBuilder, private _service: AppService) {}

  form = new FormGroup({})
  model: any = {}
  options: FormlyFormOptions = {}
  roles: any;

  scibForm = this._formBuilder.group({
    scibGlobal: false,
    language: 'en',
  })

  fields: FormlyFieldConfig[] = [
    {
      type: 'stepper',
      fieldGroup: [
        {
          props: { label: 'Reporter' },
          fieldGroup: [
            {
              key: 'employeeNumber',
              type: 'input',
              props: {
                label: 'Employee Number',
                required: true
              },
              
            },
            {
              key: 'roleEmployee',
              type: 'select',
              props: {
                label: 'Role Employee',
                required: true,
                options: []
              },
              hooks: {
                onInit: (field: FormlyFieldConfig) => {    
                  this._service.getRoles().subscribe((data) => {
                    field.props = {...field.props, options: data.map((item) => {return {label: item, value: item, id: item}})}
                  })
                }}
            },
            {
              key: 'assignedResponsable',
              type: 'select',
              props: {
                required: true,
                label: 'Assigned responsable',
                options: [{label:'n1111', id : '1', value : 'n1111'}, {label: 'n2222', id:'2', value: 'n2222'}]
                
              },
              //resetOnHide: true
              expressions: {
                
                // 'props.required': (field: FormlyFieldConfig) => {
                //   const control = field.formControl;
                //   if (control === 'QA'){

                //   }
              }
            },
            {
              key: 'email',
              type: 'input',
              props: {
                label: 'Email',
                required: true
              }

            }
            

            //Configura aqui la seccion 1
          ],
        },
        {
          props: { label: 'Detail' },
          fieldGroup: [
            //Configura aqui la seccion 2
          ],
        },
        {
          props: { label: 'Entorno' },
          fieldGroup: [
            //Configura aqui la seccion 3
          ],
        },
        {
          props: { label: 'Prioridad' },
          fieldGroup: [
            //Configura aqui la seccion 4
          ],
        },
        {
          props: { label: 'Info adicional' },
          fieldGroup: [
            //Configura aqui la seccion 5
          ],
        },
      ],
    },
  ]

  ngOnInit(): void {
    this._getIsScibGlobal()
    this._printFormValues()
    this.getRoles()
  }

  private getRoles() {
    this._service.getRoles().subscribe((data) => {
      this.roles = data
    })
  }


  reset() {
    //Añade el codigo necesario para resetear el formulario
  }

  private _getIsScibGlobal() {
    this.scibForm.valueChanges.subscribe((values) => {
      // Añade aqui el codigo necesario para poder hacer dinamicos los campos que requieren el valor de SCIB y el idioma
    })
  }

  private _printFormValues() {
    this.form.valueChanges.subscribe((formValues) => {
      this.formValuesJson = JSON.stringify(formValues, null, 2) 
    })
  }

  submit() {
    alert(JSON.stringify(this.model))
  }
}
