import { Component, OnInit } from '@angular/core';
import { EntrenoManualComponent } from "./entreno-manual/entreno-manual.component";
import { CommonModule } from '@angular/common';
import { Ejercicio } from '../../ejercicio';
import { EntrenosIaService } from '../../servizos/entrenos-ia.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-entrenos',
  standalone: true,
  imports: [EntrenoManualComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './entrenos.component.html',
  styleUrl: './entrenos.component.css'
})
export class EntrenosComponent implements OnInit {

  //Variable que almacenará los ejercicios recogidos de la API
  ejercicios: Ejercicio[] = [];
  // Variable que almacenara la info del formulario
  formulario: FormGroup;

  // desde el contructor llamamos al servicio que recoge la api y creamos el elaborador del formulario
  constructor(private servicio: EntrenosIaService, private elaborador: FormBuilder) {
    this.formulario = this.elaborador.group({
      id: new FormControl(),
      nombre: new FormControl(),
      tipo: new FormControl()
    })
  }

  // Uso de ngOnInit para subscribirse el componente al servicio
  ngOnInit(): void {
    this.servicio.obtenerEjercicio().subscribe({
      next: (ejercicios) => this.ejercicios = ejercicios,
      error: (error) => console.log("ERROR AL MOSTRAR LOS EJERCICIOS:", error)
    });
  }

  // CRUD para añadir y modificar ejercicios de ejemplo

  //Añadir un ejemplo de ejercicio
  anhadir() {
    this.ejercicios.push(this.formulario.value);
    this.formulario.reset();
  }

  // Enviar al formulario
  enviarForm(ejercicio: Ejercicio) {
    // Con setValue cubrimos los campos del formulario con el ejercicio indicado("lo enviamos al formulario")
    this.formulario.setValue({
      // Igualamos los campos del formulario a los valores del objeto
      id:ejercicio.id,
      nombre: ejercicio.nombre,
      tipo: ejercicio.tipo
    });
  }

  //Modificar ejercicio
  modificar(evento:Event) {
    evento.preventDefault();
    //Buscamos al ejercicio para ello creamos una variable que lo almacenará
    let buscarEjer = this.ejercicios.find(ejercicio => ejercicio.id == this.formulario.value.id);

    // Si el ejercicio existe
    if(buscarEjer){
      // Modificamos los campos
      buscarEjer.nombre = this.formulario.value.nombre;
      buscarEjer.tipo = this.formulario.value.tipo;
    }
  }

  //Eliminar ejercicio
  eliminar(ejercicio: Ejercicio) {
    this.ejercicios = this.ejercicios.filter(e => e !== ejercicio);
  }

  // FUnción para limpiar el formulario
  cancelar() {
    this.formulario.reset();
  }
}
