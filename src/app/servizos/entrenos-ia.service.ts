import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ejercicio } from '../ejercicio';

@Injectable({
  providedIn: 'root'
})
export class EntrenosIaService {

  ejercicios: string = "https://67ec05b2aa794fb3222c8e69.mockapi.io/ejercicios/ejercicios";

  constructor(private cliente: HttpClient) {

  }

  // CRUD

  //Obtener todos los ejercicios
  obtenerEjercicio():Observable<Ejercicio[]> {
    return this.cliente.get<Ejercicio[]>(this.ejercicios);
  }
  // Añadir un ejercicio
  anhadirEjercicio(nombre: string) {
    return this.cliente.post<Ejercicio>(this.ejercicios, { nombre })
  }

  // Eliminar un ejercicio
  eliminarEjercicio(id: string) {
    return this.cliente.delete<void>(this.ejercicios + '/' + id);
  }
}
