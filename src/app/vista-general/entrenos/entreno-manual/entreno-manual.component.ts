import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Entreno } from '../../modelo/entreno';
import jsPDF from 'jspdf';
import { EntrenosIaService } from '../../../servizos/entrenos-ia.service';

@Component({
  selector: 'app-entreno-manual',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './entreno-manual.component.html',
  styleUrl: './entreno-manual.component.css'
})
export class EntrenoManualComponent implements OnInit {
  //Clase formGroup para obter o formulario reactivo
  formulario: FormGroup;
  //Array para almacear a informacion introducida polo formulario
  listaEntrenos: Entreno[];

  constructor(private servicio: EntrenosIaService) {
    //Inicializamos o formgroup "formulario" indicando que campos ten e como corresponden distintos controis de formulario no html
    this.formulario = new FormGroup({
      dia: new FormControl(),
      grupo_muscular: new FormControl(),
      ejercicio: new FormControl(),
      repeticiones: new FormControl(),
      tipo: new FormControl(),
      duracion: new FormControl(),
      descanso: new FormControl()
    });
  }

  cargarEntreno() {

  }

  eliminarEntreno() {
    this.listaEntrenos = [];
  }

  descargarEntreno() {
    let documento = new jsPDF();

    let y = 20; // Posición inicial vertical
    documento.setFontSize(18);
    documento.text('Lista de Entrenamientos', 105, y, { align: 'center' });

    y += 10; // Bajamos un poco después del título
    documento.setFontSize(12);

    this.listaEntrenos.forEach((entreno, index) => {
      // Dibujar un pequeño separador entre entrenos
      documento.setDrawColor(0); // Color negro
      documento.line(20, y, 190, y); // Línea horizontal

      y += 5;
      documento.text(`Entreno ${index + 1}`, 20, y);
      y += 7;

      documento.text(`Día: ${entreno.dia}`, 25, y);
      y += 7;
      documento.text(`Grupo Muscular: ${entreno.grupo_muscular}`, 25, y);
      y += 7;
      documento.text(`Ejercicio: ${entreno.ejercicio}`, 25, y);
      y += 7;
      documento.text(`Repeticiones: ${entreno.repeticiones}`, 25, y);
      y += 7;
      documento.text(`Duración: ${entreno.duracion}`, 25, y);
      y += 7;
      documento.text(`Tipo: ${entreno.tipo}`, 25, y);
      y += 7;
      documento.text(`Descanso: ${entreno.descanso}`, 25, y);

      y += 15; // Más espacio antes del siguiente entreno

      // Si nos acercamos al final de la página, añadimos nueva página
      if (y > 270) {
        documento.addPage();
        y = 20;
      }
    });

    documento.save('entrenos.pdf');
  }

  //Uso de ngOnInit para subscribinos al servicio
  ngOnInit(): void {
    // Ejecuto el método para obtener los ejercicios del back
    this.servicio.mostrarEjercicios();
    // Relleno la variable del TS con los datos para poder mostrarlos
    this.servicio.ejercicios$.subscribe((ejercicios) => {
      this.listaEntrenos = ejercicios;
    })
  }
}
