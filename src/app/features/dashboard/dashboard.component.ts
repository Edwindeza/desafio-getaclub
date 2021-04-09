import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
// Material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Interfaces
import { Register } from '@core/interfaces/register';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit  {

  // Variables para la tabla de material
  displayedColumns: string[] = ['CeduleForm','namesForm', 'surnameForm', 'lastnameForm', 'temperatureForm', 'emailForm', 'phoneForm'];

  // Arreglo tipado de Registers
  dataRegisters: Array<Register> = []

  // Data de la tabla
  dataSource;
  filterDataRegister;

  // Variable de control para la información en la tabla
  showAllData = false;
  
  constructor(
  ) { }

  ngOnInit(): void {
    // Inicializamos la información de la vista
    this.initData();
  }
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  initData(): void{
    // Obtenemos la data de local storage
    let tempDataRegister = localStorage.getItem('dataRegisters')
    
    //Inicializamos el arreglo en base a si hay data o no
    if(tempDataRegister){
      this.dataRegisters = JSON.parse(tempDataRegister)
      //Filtramos los que tengan temp mayor a 37°
      this.filterDataRegister = this.dataRegisters.filter( register => register.temperatureForm > 37);
    }else{
      this.dataRegisters = [];
      this.filterDataRegister = [];
    }

    // Inicializamos la información de la tabla
    this.dataSource = new MatTableDataSource(this.filterDataRegister);
  }

  changeShowData(): void{
    // Invertimos al nuevo valor de showAllData
    this.showAllData = !this.showAllData;
    
    // Filtramos la información según la variable de control
    if(this.showAllData){
      this.filterDataRegister = this.dataRegisters
    }
    else{
      this.filterDataRegister = this.dataRegisters.filter( register => register.temperatureForm > 37);
    }

    // Restablecemos el valor de dataSource
    this.dataSource = new MatTableDataSource(this.filterDataRegister);
    this.ngAfterViewInit();
  }
}
