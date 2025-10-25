import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Entreno } from '../vista-general/modelo/entreno';
import { Usuario } from '../vista-general/modelo/usuario';
import { userInfo } from 'os';

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

  // Este método permite subscribirse aos cambios do array productos
  subscribirseEntrenos$(): Observable<Entreno[]> {
    return this.ejercicios$.asObservable();
  }

  //Método para mostrar los ejercicios
  mostrarEjercicios() {
    const token = localStorage.getItem('token');
    const usuarioActual = sessionStorage.getItem('usuarioActual');
    const idUser = usuarioActual ? (JSON.parse(usuarioActual) as Usuario) : null;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });
    // Lanza una petición HTTP GET al endpoint de planes
    this.servidor.post<Entreno[]>('http://127.0.0.1:8000/api/entrenos/getEntreno',idUser.id, { headers })
      .subscribe({//Nos subscribimos
        //En caso de que haya datos y este todo correcto rellenamos las variables
        next: (listaEjercicios) => {
          // Igualamos la variable al lista ejercicios
          this.ejercicios = listaEjercicios;
          //Guardamos los ejercicios en la variable a la que se va a subscribir el componente
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
    this.servidor.post<Entreno[]>('http://127.0.0.1:8000/api/entrenos', { headers }).subscribe({
      // En caso de que tengamos los datos y este todo correcto enviamos los datos a la bd
      next:(ejercicio)=>{
        
      }
    })
  }
}
