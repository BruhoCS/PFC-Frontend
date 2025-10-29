import { Component, OnInit } from '@angular/core';
import { Deporte } from '../modelo/deporte';
import { BehaviorSubject } from 'rxjs';
import { DeportesService } from '../../servizos/deportes.service';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deportes',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './deportes.component.html',
  styleUrl: './deportes.component.css'
})
export class DeportesComponent implements OnInit {
  deportes:Deporte[];
  // Índice actual del deporte visible
  actual = 0;

  // Constructor 
  constructor(private servicio:DeportesService){

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

  ngOnInit(): void {
    // Ejecuto el método para obtener los ejercicios del back
    this.servicio.mostrarDeportes();
     // Relleno la variable del TS con los datos para poder mostrarlos
    this.servicio.subscribirseDeportes$().subscribe((deportes) => {
      this.deportes = deportes;
    });
  }
}
