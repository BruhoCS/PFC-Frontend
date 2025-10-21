import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Entreno } from '../vista-general/modelo/entreno';

@Injectable({
  providedIn: 'root'
})
export class EntrenosIaService {

  //Variable que contendrá todos los ejercicios del entreno
  ejercicios: Entreno[];
  ejercicios$: BehaviorSubject<Entreno[]>;// Empieza sin subscripciones

  //Constructor importando HttpClient para poder conectar con el backend
  constructor(private servidor: HttpClient) {
    this.ejercicios$ = new BehaviorSubject(this.ejercicios);
  }

  //Método para mostrar los ejercicios
  mostrarEjercicios() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });
    // Lanza una petición HTTP GET al endpoint de planes
    this.servidor.get<Entreno[]>('http://127.0.0.1:8000/api/entrenos', { headers })
      .subscribe({//Nos subscribimos
        //En caso de que haya datos y este todo correcto rellenamos las variables
        next: (listaEjercicios) => {
          this.ejercicios = listaEjercicios;
          this.ejercicios$.next(listaEjercicios);
        },
        //En caso de error salta el mensaje que no es posible cargarlos dejando las variables vacias
        error: (err) => {
          console.error("Error al cargar los planes" + err);
          this.ejercicios = [];
          this.ejercicios$.next([]);
        }
      });
  }

  // Añadir ejercicio
  anhadirEjercicio(ejercicio: Entreno) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });
    //Lanza una peticion POST para añadir el nuevo ejercicio
    this.servidor.post<Entreno[]>('http://127.0.0.1:8000/api/entrenos', { headers }).subscribe
  }
}
