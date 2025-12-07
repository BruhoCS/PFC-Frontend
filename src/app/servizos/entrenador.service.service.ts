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


  //Funcion para crear un deporte nuevo
  crearEnrenador(deporte: string[]) {

    //Obtenemos el token y la autenticación
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });

    // Lanza una petición HTTP GET al endpoint de planes
    this.http.post<Entrenador>('http://127.0.0.1:8000/api/entrenadores', deporte, { headers })
      .subscribe({//Nos subscribimos
        //En caso de que haya datos y este todo correcto rellenamos las variables
        next: () => {
          console.log("Entrenador creado con exito");
        },
        //En caso de error salta el mensaje que no es posible cargarlos dejando las variables vacias
        error: (err) => {
          console.error("Error al crear el Entrenador" + err);
        }
      });
  }

  //Función para modificar un deporte existente
  modificarEntrenador(entrenadorModificado: string[], id: string) {
    //Obtenemos el token
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });

    this.http.put<Entrenador[]>(`http://127.0.0.1:8000/api/entrenadores/${id}`, entrenadorModificado, { headers })
      .subscribe({
        next: (entrenadorModificado) => {
          console.log("Entrenador modificado", entrenadorModificado);
        },
        error: (err) => {
          console.error('Error al modificar el Entrenador', err);
        }
      });
  }

  //Fución para eliminar el deporte
  eliminarEntrenador(entrenadorBorrado: Entrenador) {
    //Obtenemos el token y la autorización
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });

    this.http.delete<Entrenador[]>(`http://127.0.0.1:8000/api/entrenadores/${entrenadorBorrado.id}`, { headers })
      .subscribe({
        next: (entrenadorBorrado) => {
          console.log("Exito al eliminar el deporte: " + entrenadorBorrado);
        },
        error: (err) => {
          console.error('Error al eliminar el deporte', err);
        }
      });
  }

  //Función para poder subscribirse a entrenadores haciendolo un observable
  subscribirseEntrenadores$() {
    return this.entrenadores$.asObservable();
  }
}
