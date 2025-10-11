import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../servizos/usuarios.service';
import { Usuario } from '../modelo/usuario';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})

export class AdministracionComponent implements OnInit {
  formulario: FormGroup;//Definimos el formulario que irá asociado al formulario
  usuarios: Usuario[];//Array que gardará os usuarios almacenados na sessionStorage
  //Declaremos la propiedad FormBuilder que agilizará la creación del formulario
  constructor(private elaborador: FormBuilder, private router: Router, private servicioUsuario: UsuariosService) {
    this.formulario = this.elaborador.group({
      //Definimos los arrays para cada control del formulario
      name: ["", [Validators.required]],
      rol: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  //Funcion para guardar el usuario nuevo
  crearUsuario(evento: Event) {
    evento.preventDefault();//Evitamos el comportamiento por defecto del navegador
    //Buscamos el name
    let buscarUsuario = this.usuarios.find(usuario => usuario.name === this.formulario.value.name);
    //Si el formulario cumple con todas las validaciones y no esta registrado
    if (this.formulario.value.name && this.formulario.value.password && this.formulario.value.rol && buscarUsuario == undefined) {
      //Añadimos el nuevo usuario al array de usuarios
      this.usuarios.push(this.formulario.value);
      //Añadimos el usuario al sessionStorage
      sessionStorage.setItem("usuarios", JSON.stringify(this.usuarios));
      //Limpiamos el formulario
      this.formulario.reset();
    }
  }

  // Funcion para modificar el usuario usando el name como si fuera una id
  modificarUsuario(evento: Event) {
    evento.preventDefault();// Evitamos el comportamiento por defecto del navegador
    //Comprobamos que el formulario cumple con las validaciones
    if (this.formulario.value.name && this.formulario.value.password && this.formulario.value.rol) {
      //Buscamos el name
      let buscarUsuario = this.usuarios.find(usuario => usuario.name === this.formulario.value.name);
      //Si existe
      if (this.formulario.value.name = buscarUsuario) {
        //Modificamos el usuario
        buscarUsuario.password = this.formulario.value.password;
        buscarUsuario.rol = this.formulario.value.rol;
        //Actualizamos
          // "spread operator" crea un nuevo array en memoria con los mismos elementos,lo que hace que Angular detecte el cambio y actualice la interfaz
        this.usuarios = [...this.usuarios];
        this.formulario.reset();
      }
    }
  }

  //Funcion para borrar el usuario
  borrarUsuario(usuario: Usuario) {
    const indice = this.usuarios.findIndex(u => u.name === usuario.name);
    if (indice !== -1) {
      this.usuarios.splice(indice, 1); // Elimina el usuario en la posición encontrada
    }
  }

  //GETTERS para facilitar el trabajo con los campos del formulario
  get campoName() {
    return this.formulario.get('name');
  }

  get campoRol() {
    return this.formulario.get('rol');
  }

  get campoPassword() {
    return this.formulario.get('password');
  }

  //Funcion para subscribirse al servicio y obtener a los usuarios
  ngOnInit(): void {
    /*this.servicioUsuario.subscribirseUsuarios$().subscribe((usuarios) => {
      this.usuarios = usuarios;
    })*/
  }
}
