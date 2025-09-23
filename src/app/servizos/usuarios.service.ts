import { Injectable } from '@angular/core';
import { Usuario } from '../vista-general/modelo/usuario';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  //Variables para almacenar al usuario que se encuentra en la sesión
  usuarioActual:Usuario;
  usuarioActual$:BehaviorSubject<Usuario>;//Empieza sin subscripción

  // Variable para almacenar todos los usuarios
  usuarios:Usuario[]=[];

  // Flujo reactivo para emitir la lista de usuarios a quien se suscriba.
  // Debe inicializarse, p. ej. con [] para evitar null/undefined al hacer next.
  usuarios$:BehaviorSubject<Usuario[]>;
  
  constructor(private router:Router , private http:HttpClient) {
    
    }
  // Método que hace una petición HTTP GET al backend para obtener los perfiles
  // y actualiza tanto el array local como el BehaviorSubject.
    mostrarPerfiles(){
      // Realiza una petición GET.
      this.http.get<Usuario[]>('http://127.0.0.1:8000/api/perfiles')
      // Nos suscribimos al Observable para ejecutar la petición y manejar la respuesta.
      .subscribe({
        // next se ejecuta cuando llega la respuesta correcta del servidor.
        next:(perfiles)=>{
          // Guardamos los perfiles en la variable local 
          this.usuarios = perfiles;
          // Emitimos los perfiles a todos los suscriptores del BehaviorSubject.
          this.usuarios$.next(perfiles);
        },
        // error se ejecuta si la petición falla (4xx/5xx, red, etc.).
        error: (err)=>{
          // Registramos el error en consola 
          console.log("Error al cargar usuarios");
          // Dejamos el estado local vacio
          this.usuarios = [];
          // Emitimos lista vacía para que la UI reaccione
          this.usuarios$.next([]);
        }
      });
    }

   //Metodo que permite añadir un nuevo usuario al tiempo que informa a los subscriptores
   crearUsuario(nuevoUsuario:Usuario){
    //Hacemos el post
    
   }

   //Modificar usuario
   modificarUsuario(email: string, password: string){

   }

   //Eliminar usuario
   eliminarUsuario(email: string, password: string){

   }

   // Método para iniciar sesión con un email y contraseña
  iniciarsesion(email: string, password: string): Promise<boolean> {
    const loginData = { email, password };
    console.log('Enviando credenciales:', loginData);

    return new Promise((resolve, reject) => {
      this.http.post<any>('http://127.0.0.1:8000/api/loginAPI', loginData, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }),
      }).subscribe({
        next: (response) => {
          console.log("Respuesta del login:", response);

          // Guardar token
          const token = response.accessToken;
          if (!token) {
            console.error("No se recibió ningún token en la respuesta del login");
            reject(false);
            return;
          }
          localStorage.setItem('token', token);

          // Guardar usuario
          const usuario: Usuario = response.user;
          this.usuarioActual = usuario;
          this.usuarioActual$.next(usuario);

          // Guardamos usuario en sessionStorage
          sessionStorage.setItem('usuarioActual', JSON.stringify(usuario));

          // Redirigimos al inicio de la web
          this.router.navigate(['/']);
          resolve(true);
        },
        error: (error) => {
          console.error('Error de login:', error);
          this.usuarioActual$.next(undefined);
          reject(false);
        }
      });
    });
  }

}
