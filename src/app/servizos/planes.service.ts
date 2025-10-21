import { Injectable } from '@angular/core';
import { Plan } from '../vista-general/modelo/plan';
import { BehaviorSubject } from 'rxjs';
import { rejects } from 'assert';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  planes: Plan[];// Variable para almacenar los planes
  planes$: BehaviorSubject<Plan[]>;// Empieza sin subscripciones

  constructor(private http: HttpClient) {
    this.planes$ = new BehaviorSubject(this.planes);
  }

  //Método para mostrar los planes disponibles en el gimnasio
  mostrarPlanes() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });
    // Lanza una petición HTTP GET al endpoint de planes
    this.http.get<Plan[]>('http://127.0.0.1:8000/api/planes', { headers })
      .subscribe({//Nos subscribimos
        //En caso de que haya datos y este todo correcto rellenamos las variables
        next: (listaPlanes) => {
          this.planes = listaPlanes;
          this.planes$.next(listaPlanes);
        },
        //En caso de error salta el mensaje que no es posible cargarlos dejando las variables vacias
        error: (err) => {
          console.error("Error al cargar los planes" + err);
          this.planes = [];
          this.planes$.next([]);
        }
      });


  }
}
