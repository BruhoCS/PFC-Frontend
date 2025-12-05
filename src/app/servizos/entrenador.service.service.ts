import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entrenador } from '../vista-general/modelo/entrenador';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorServiceService {
  // Variables para almacenar los entrenadores
  entrenadores: Entrenador[];
  entrenadores$: BehaviorSubject<Entrenador[]>;//Empieza sin subscripción

  constructor(private http: HttpClient) {
    this.entrenadores$ = new BehaviorSubject(this.entrenadores);
  }
  //Mostrar Entrenadores
  mostrarEntrenadores() {
    //Obtener el token y la autorización para hacer la petición
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });
    // Petición a la API (ajusta la URL si tu ruta es distinta)
    this.http.get<Entrenador[]>('http://127.0.0.1:8000/api/entrenadores', { headers })
      .subscribe({
        next: (listaEntrenadores) => {
          // Guardamos los usuarios en la variable local
          this.entrenadores = listaEntrenadores;
          // Emitimos la lista a los suscriptores del BehaviorSubject
          this.entrenadores$.next(listaEntrenadores);
        },
        error: (err) => {
          console.error("Error al cargar los usuarios:", err);
          // Si falla, limpiamos los datos
          this.entrenadores = [];
          this.entrenadores$.next([]);
        }
      });

  }

  //Función para poder subscribirse a entrenadores haciendolo un observable
  subscribirseEntrenadores$() {
    return this.entrenadores$.asObservable();
  }
}
