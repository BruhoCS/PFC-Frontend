import { Injectable } from '@angular/core';
import * as Usuarios from "../../../public/data/usuarios.json";
import { Usuario } from '../vista-general/modelo/usuario';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  //Definimos los usuarios que al acenará a los usuarios del JSON
  usuarios:Usuario[];
  //Definimos el subject que emitirá el array a todos los subscriptores
  usuarios$:BehaviorSubject<Usuario[]>;

  constructor() {
    this.usuarios = (Usuarios as any).default;//Iniciamos con los usuarios del JSON
    this.usuarios$ = new BehaviorSubject(this.usuarios);//Inicialmente no hay subscriptores
    localStorage.setItem("usuarios",JSON.stringify(this.usuarios));//Guardamos los usuarios en el sessionStorage
    //Comprobamos si esta vacio el localStorage
    if(typeof localStorage == "undefined" ){
      this.usuarios = Usuarios;//Rellennamos con el JSON
      }else{
        this.usuarios = JSON.parse(localStorage.getItem("usuarios"));//Rellenamos con el localStorage
      }
    }
   //Metodo que permite añadir un nuevo usuario al tiempo que informa a los subscriptores
   crearUsuario(nuevoUsuario:Usuario){
    this.usuarios.push(nuevoUsuario);//Rellenamos el array
    this.usuarios$.next(this.usuarios);//Informamos a los subscriptores del nuevo elemento
   }

   //Introducimos los usuuarios en el sessionStorage
   setSesion(usuario:Usuario){
    sessionStorage.setItem("usuario",JSON.stringify(usuario));
   }

   //Metodo que permitirá subscribirse al array
   subscribirseUsuarios$():Observable<Usuario[]>{
    return this.usuarios$.asObservable();
   }
}
