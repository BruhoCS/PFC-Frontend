import { Component, OnInit } from '@angular/core';
import { Deporte } from '../modelo/deporte';
import { BehaviorSubject } from 'rxjs';
import { DeportesService } from '../../servizos/deportes.service';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Entrenador } from '../modelo/entrenador';
import { EntrenadorServiceService } from '../../servizos/entrenador.service.service';

@Component({
  selector: 'app-deportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deportes.component.html',
  styleUrl: './deportes.component.css'
})
export class DeportesComponent implements OnInit {
  //Varible donde almacenamos los deportes
  deportes:Deporte[];
  //Variable donde almacenamos los entrenadores
  entrenadores:Entrenador[];
  // Índice actual del deporte visible
  actual = 0;

  // Constructor 
  constructor(private servicio:DeportesService,private servicioEntrenador:EntrenadorServiceService){

  }
  

  // Muestra el deporte anterior
  prev() {
    this.actual = (this.actual - 1 + this.deportes.length) % this.deportes.length;
  }

  // Muestra el siguiente deporte
  next() {
    this.actual = (this.actual + 1) % this.deportes.length;
  }

  // Salta a un deporte específico (para los puntitos indicadores)
  go(i: number) {
    this.actual = i;
  }

  // Permite usar las flechas del teclado (izquierda/derecha)
  onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      this.prev();
    }
    if (e.key === 'ArrowRight') {
      this.next();
    }
  }


  //Apuntarse a un deporte
  apuntarseDeporte(deporte:Deporte){
    //Llamamos a la funcion del servicio pasandole el deporte
    this.servicio.apuntarseDeporte(deporte);
  }

  ngOnInit(): void {
    // Ejecuto el método para obtener los ejercicios del back
    this.servicio.mostrarDeportes();
     // Relleno la variable del TS con los datos para poder mostrarlos
    this.servicio.subscribirseDeportes$().subscribe((deportes) => {
      this.deportes = deportes;
    });
    
    // Ejecuto el método para obtener los ejercicios del back
    this.servicioEntrenador.mostrarEntrenadores();
     // Relleno la variable del TS con los datos para poder mostrarlos
    this.servicioEntrenador.subscribirseEntrenadores$().subscribe((entrenadores) => {
      this.entrenadores = entrenadores;
    });
  }
}
