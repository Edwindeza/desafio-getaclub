import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, ValidatorFn} from '@angular/forms';
import { Register } from '@core/interfaces/register';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMAIL_REGEX } from '@core/consts/regex';

// Expresión regular para el correo

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})

export class RegistroComponent implements OnInit {
  //Variables
  registerPersonForm: FormGroup;
  //Loader
  activeloadingfull = false;
  // Arreglo tipado de Registers
  dataRegisters: Array<Register> = []
  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(
    public formB: FormBuilder,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.activeloadingfull = true; 

    this.initForm();

  }

  initForm(): void {
    /*
      La cédula chilena tiene los siguientes datos
    
      Apellidos                    listo
      Nombres                      Listo
      Nacionalidad                 Listo
      Fecha de nacimiento          Listo
      Número de documento          Listo
      Fecha de emisión             Listo
      Fecha de vencimiento         Listo
      Firma del titular, esta se obviará

      Adicional se agregará la Temperatura y información de contacto como:
      - Correo
      - Celular


      Además tambien pediremos información médica como:
      - Temperatura
      - Presión
      - Saturación
      - Tipo de sangre
    */

    this.registerPersonForm = new FormGroup({
      namesForm: new FormControl('', [
        Validators.required
      ]),
      surnameForm: new FormControl('', [
        Validators.required
      ]),
      lastnameForm: new FormControl('', [
        Validators.required
      ]),
      nationalityForm: new FormControl('', [
        Validators.required
      ]),
      bornForm: new FormControl('', [
        Validators.required
      ]),
      CeduleForm: new FormControl('', [
        Validators.required,
      ]),
      dateIssueForm: new FormControl('', [
        Validators.required
      ]),
      expirationDateForm: new FormControl('', [
        Validators.required
      ]),
      emailForm: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)
      ]),
      phoneForm: new FormControl('', [
        Validators.required,
        // Agregamos una validación personalizada al celular para asegurar 9 caráctener en el número de teléfono
        this.ValidatePhone
      ]),
      temperatureForm: new FormControl('', [
        Validators.required
      ]),
      presionForm: new FormControl('', [
        Validators.required
      ]),
      saturationForm: new FormControl('', [
        Validators.required
      ]),
      bloodTypeForm: new FormControl('', [
        Validators.required
      ]),

    });
  }
  onSubmitRegister(): void {
    // Verificamos si el formulario es válido
    if(this.registerPersonForm.valid){
      // Obtenemos la data de local storage
      let tempDataRegister = localStorage.getItem('dataRegisters')

      //Inicializamos el arreglo en base a si hay data o no
      if(tempDataRegister){
        this.dataRegisters = JSON.parse(tempDataRegister)
      }else{
        this.dataRegisters = []
      }
      // Inicializamos una variable temporal con la información del formulario
      let tempData: Register = {
        namesForm: this.registerPersonForm.controls['namesForm'].value,
        surnameForm: this.registerPersonForm.controls['surnameForm'].value,
        lastnameForm: this.registerPersonForm.controls['lastnameForm'].value,
        nationalityForm: this.registerPersonForm.controls['nationalityForm'].value,
        bornForm: this.registerPersonForm.controls['bornForm'].value,
        CeduleForm: this.registerPersonForm.controls['CeduleForm'].value,
        dateIssueForm: this.registerPersonForm.controls['dateIssueForm'].value,
        expirationDateForm: this.registerPersonForm.controls['expirationDateForm'].value,
        emailForm: this.registerPersonForm.controls['emailForm'].value,
        phoneForm: this.registerPersonForm.controls['phoneForm'].value,
        temperatureForm: this.registerPersonForm.controls['temperatureForm'].value,
        presionForm: this.registerPersonForm.controls['presionForm'].value,
        saturationForm: this.registerPersonForm.controls['saturationForm'].value,
        bloodTypeForm: this.registerPersonForm.controls['bloodTypeForm'].value,
      };
      // Pusheamos la información en el arreglo declarado previamente
      this.dataRegisters.push(tempData)
      // Guardamos en local storage
      localStorage.setItem('dataRegisters', JSON.stringify(this.dataRegisters));
      // Finalmente, limpiamos el formulario
      this.clearForm();
      this.snackBar.open('Registro completo', 'ok', {
        duration: 2000,
      });
    }else{
      this.snackBar.open('Debe llenar correctamente el formulario', 'ok', {
        duration: 2000,
      });
    }
    
  }
  clearForm(): void{
    this.formDirective.resetForm();
  }
  ValidatePhone(control: FormControl): { [key: string]: boolean } | null {
    // Si hay alguna cadena 
    var regex =  new RegExp(/[0-9]{9}/);
    if (control.value && control.value.length > 0) {
      var tempValue = control.value.replace(/\s/g, "")
      var posNight = tempValue.indexOf('9');
      var tempPhone = tempValue.slice(posNight, tempValue.length).trim();
      if(tempPhone.length != 9 || !regex.test(tempPhone)){
        return { 'notPhone': true }
      }else{
        return null;
      }
    }else{
      return null;
    }
  }
}
