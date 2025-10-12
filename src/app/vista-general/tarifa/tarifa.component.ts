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

  //Con el uso de ngOninit nos subcribimos a planes$ del servicio
  ngOnInit(): void {
    this.servicioPlan.planes$.subscribe((planes)=>{
        this.planes = planes;
    })
  }
}
