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

  constructor(private _formBuilder: FormBuilder) {}

  form = new FormGroup({})
  model: any = {}
  options: FormlyFormOptions = {}

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
    
            {         
              key: 'aplication',
              type: 'input',         
              props: {           
                label: 'Aplicación',           
                required: true      
              }       
            },
            {
              key: 'enviroment',
              type: 'select',
              props: {
                label: 'Entorno',
                required: true,
                options:[
                  {label:'PRO', id : '1', value : 'PRO'},
                  {label:'PRE', id : '2', value : 'PRE'},
                  {label:'DEV', id : '3', value : 'DEV'}
                ]
              },
              
            },
            {
              key: 'category',
              type: 'select',
              props: {
                label: 'Categoría',
                disabled: true,
                options:[
                {label:'PRO', id : '1', value : 'PRO'},
                {label:'PRE', id : '2', value : 'PRE'},
                {label:'DEV', id : '3', value : 'DEV'}
              ]
              },
              expressions: {
                "props.disabled": (field: FormlyFieldConfig)=>{
                  if(this.form.get('enviroment')?.value === undefined){
                    return false
                  }else{}
                    return true
                }
                }
              
              
            }
            
                      
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
