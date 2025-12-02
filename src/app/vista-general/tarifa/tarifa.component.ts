import { Component, OnInit } from '@angular/core';
import { Plan } from '../modelo/plan';
import { PlanesService } from '../../servizos/planes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarifa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarifa.component.html',
  styleUrl: './tarifa.component.css'
})
export class TarifaComponent implements OnInit {
  planes:Plan[];//Creamos la variable que almacenará los planes

  //Constructor para poder llamar al servicio
  constructor(private servicioPlan:PlanesService){

  }

  //Metodo para apuntarse al nuevo plan
  apuntarsePlan(plan:Plan){
    //Llamamos a la funcion del servicio y le pasamos el plan
    this.servicioPlan.apuntarsePlan(plan);
  }

  //Con el uso de ngOninit nos subcribimos a planes$ del servicio
  ngOnInit(): void {
    //Hacemos el get 
    this.servicioPlan.mostrarPlanes();
    //Subscribimos a la variable para obtener los planes
    this.servicioPlan.planes$.subscribe((planes)=>{
        this.planes = planes;
    })
  }
}
