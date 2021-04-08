import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Register } from '@core/interfaces/register';

// Expresión regular para el correo
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
  dataRegisters: Array<Register> = []

  constructor(
    public formB: FormBuilder,
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
    */

    this.registerPersonForm = this.formB.group({
      namesForm: new FormControl('', [
        Validators.required
      ]),
      surnameForm: new FormControl('', [
        Validators.required
      ]),
      lastnameForm: new FormControl('', [
        Validators.required
      ]),
      nationalityForm: new FormControl('CHILENA', [
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
        Validators.minLength(9),
        Validators.maxLength(9)
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
  }
  clearForm(): void{
    this.registerPersonForm.reset();
    this.registerPersonForm.controls['namesForm'].clearValidators();
    this.registerPersonForm.controls['namesForm'].updateValueAndValidity();
    this.registerPersonForm.controls['surnameForm'].clearValidators();
    this.registerPersonForm.controls['surnameForm'].updateValueAndValidity();
    this.registerPersonForm.controls['lastnameForm'].clearValidators();
    this.registerPersonForm.controls['lastnameForm'].updateValueAndValidity();

    this.registerPersonForm.controls['nationalityForm'].setValue('CHILENA')
    // this.registerPersonForm.controls['nationalityForm'].clearValidators(); este no se limpia.
    // this.registerPersonForm.controls['nationalityForm'].updateValueAndValidity(); este no se limpia.
    this.registerPersonForm.controls['bornForm'].clearValidators();
    this.registerPersonForm.controls['bornForm'].updateValueAndValidity();
    this.registerPersonForm.controls['CeduleForm'].clearValidators();
    this.registerPersonForm.controls['CeduleForm'].updateValueAndValidity();
    this.registerPersonForm.controls['dateIssueForm'].clearValidators();
    this.registerPersonForm.controls['dateIssueForm'].updateValueAndValidity();
    this.registerPersonForm.controls['expirationDateForm'].clearValidators();
    this.registerPersonForm.controls['expirationDateForm'].updateValueAndValidity();
    this.registerPersonForm.controls['emailForm'].clearValidators();
    this.registerPersonForm.controls['emailForm'].updateValueAndValidity();
    this.registerPersonForm.controls['phoneForm'].clearValidators();
    this.registerPersonForm.controls['phoneForm'].updateValueAndValidity();
    this.registerPersonForm.controls['temperatureForm'].clearValidators();
    this.registerPersonForm.controls['temperatureForm'].updateValueAndValidity();
    this.registerPersonForm.controls['presionForm'].clearValidators();
    this.registerPersonForm.controls['presionForm'].updateValueAndValidity();
    this.registerPersonForm.controls['saturationForm'].clearValidators();
    this.registerPersonForm.controls['saturationForm'].updateValueAndValidity();
    this.registerPersonForm.controls['bloodTypeForm'].clearValidators();
    this.registerPersonForm.controls['bloodTypeForm'].updateValueAndValidity();

  }
}
