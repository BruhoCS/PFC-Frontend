import { Injectable } from '@angular/core';
import { Deporte } from '../vista-general/modelo/deporte';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class DeportesService {

  // Variable de deportes
  deportes: Deporte[];
  deportes$: BehaviorSubject<Deporte[]>;

  //Constructor
  constructor(private http: HttpClient) {
    this.deportes$ = new BehaviorSubject(this.deportes);
  }

  // Este método permite subscribirse aos cambios do array deportes
  subscribirseDeportes$(): Observable<Deporte[]> {
    return this.deportes$.asObservable();
  }

  //Método para mostrar los planes disponibles en el gimnasio
  mostrarDeportes() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });
    // Lanza una petición HTTP GET al endpoint de planes
    this.http.get<Deporte[]>('http://127.0.0.1:8000/api/deportes', { headers })
      .subscribe({//Nos subscribimos
        //En caso de que haya datos y este todo correcto rellenamos las variables
        next: (listaPlanes) => {
          this.deportes = listaPlanes;
          this.deportes$.next(listaPlanes);
        },
        //En caso de error salta el mensaje que no es posible cargarlos dejando las variables vacias
        error: (err) => {
          console.error("Error al cargar los planes" + err);
          this.deportes = [];
          this.deportes$.next([]);
        }
      });


  }
}
