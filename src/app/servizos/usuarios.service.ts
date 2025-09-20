import { Injectable } from '@angular/core';
import * as Usuarios from "../../../public/data/usuarios.json";
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
  usuarioActual$:BehaviorSubject<Usuario>;

  constructor(private router:Router , private http:HttpClient) {

    }

   //Metodo que permite añadir un nuevo usuario al tiempo que informa a los subscriptores
   crearUsuario(nuevoUsuario:Usuario){
    //Reconvertir para hacer POST a la API de Laravel
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

          // Guardamos usuario en localStorage y sessionStorage
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
