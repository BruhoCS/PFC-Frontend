import { Injectable } from '@angular/core';
import { Deporte } from '../vista-general/modelo/deporte';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from 'console';
import { Usuario } from '../vista-general/modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class DeportesService {

  // Variable de deportes
  deportes: Deporte[];
  deportes$: BehaviorSubject<Deporte[]>;

  //Variable para almacenar los deportes del usuario de la sesión
  misDeportes: Deporte[];
  misDeportes$: BehaviorSubject<Deporte[]>;

  //Constructor
  constructor(private http: HttpClient) {
    this.deportes$ = new BehaviorSubject(this.deportes);
    this.misDeportes$ = new BehaviorSubject(this.misDeportes);
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
          console.error("Error al cargar los deportes" + err);
          this.deportes = [];
          this.deportes$.next([]);
        }
      });


  }

  //Funcion para crear un deporte nuevo
  crearDeporte(deporte: string[]) {

    //Obtenemos el token y la autenticación
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });

    // Lanza una petición HTTP GET al endpoint de planes
    this.http.post<Deporte>('http://127.0.0.1:8000/api/deportes', deporte, { headers })
      .subscribe({//Nos subscribimos
        //En caso de que haya datos y este todo correcto rellenamos las variables
        next: () => {
          console.log("Deporte creado con exito");
        },
        //En caso de error salta el mensaje que no es posible cargarlos dejando las variables vacias
        error: (err) => {
          console.error("Error al cargar los deportes" + err);
        }
      });
  }

  //Función para modificar un deporte existente
  modificarDeporte(deporteModificado: string[], id: string) {
    //Obtenemos el token
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });

    this.http.put<Deporte[]>(`http://127.0.0.1:8000/api/deportes/${id}`,deporteModificado, { headers })
      .subscribe({
        next: (deporteModificado) => {
          console.log("Deporte modificado",deporteModificado)
        },
        error: (err) => {
          console.error('Error al modificar el deporte', err);
        }
      });
  }

  //Fución para eliminar el deporte
  eliminarDeporte(deporteBorrado:Deporte){
     //Obtenemos el token
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });

    this.http.delete<Deporte[]>(`http://127.0.0.1:8000/api/deportes/${deporteBorrado.id}`, { headers })
      .subscribe({
        next: (deporteEliminado) => {
          console.log("Exito al eliminar el deporte: "+deporteEliminado)
        },
        error: (err) => {
          console.error('Error al eliminar el deporte', err);
        }
      });
  }
  // Este método permite subscribirse aos cambios do array deportes
  subscribirseDeportes$(): Observable<Deporte[]> {
    return this.deportes$.asObservable();
  }

  //Función para que el usuario se apunte al deporte
  apuntarseDeporte(deporte: Deporte) {
    //Obtenemos el token
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });

    const url = `http://127.0.0.1:8000/api/deportes/${deporte.id}/apuntarse`;

    // Lanza una petición HTTP GET al endpoint de planes
    this.http.post<Deporte>(url, {}, { headers })
      .subscribe({//Nos subscribimos
        //En caso de que haya datos y este todo correcto rellenamos las variables
        next: () => {
          console.log("Se inscribió correctamente");
        },
        //En caso de error salta el mensaje que no es posible cargarlos dejando las variables vacias
        error: (err) => {
          console.error("Error al cargar los planes" + err);
        }
      });
  }

  //Función para que el usuario vea a los deportes que se encuentra apuntado
  cargarMisDeportes(): void {
    const token = localStorage.getItem('token') ?? '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });

    this.http.get<Deporte[]>('http://127.0.0.1:8000/api/perfil/deportes', { headers })
      .subscribe({
        next: (deportes) => {
          this.misDeportes = deportes;
          this.misDeportes$.next(deportes);
        },
        error: (err) => {
          console.error('Error al cargar los deportes del perfil', err);
          this.misDeportes = [];
          this.misDeportes$.next([]);
        }
      });
  }

  // Método para que el componente se suscriba de forma tipada
  obtenerMisDeportes$(): Observable<Deporte[]> {
    return this.misDeportes$.asObservable();
  }

  //Funcion para llamar a la api y desapuntarse del deporte
  desapuntarseDeporte(depId: string) {
    //Obtenermos el oken y el permiso
    const token = localStorage.getItem('token') ?? '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });

    //Enviamos el deporte
    this.http.delete<any>(`http://127.0.0.1:8000/api/deportes/${depId}/borrarse`, { headers })
      .subscribe({
        //Si la API responde la lista de deportes apuntados se actualiza
        next: (deportes) => {
          this.misDeportes = deportes;
          this.misDeportes$.next(deportes);
        },
        //Si no nos salta el error
        error: (err) => {
          console.error('Error al desapuntarse del deporte', err);
          this.misDeportes = [];
          this.misDeportes$.next([]);
        }
      });
  }
}
