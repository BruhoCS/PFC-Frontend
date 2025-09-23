import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../servizos/usuarios.service';
import { Usuario } from '../modelo/usuario';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  formulario: FormGroup;//Definimos el formulario que irá asociado al formulario
  usuarios: Usuario[];//Array que gardará os usuarios almacenados na sessionStorage
  errorSesion: boolean = false;//Variable que nos permitirá mostrar un mensaje de error en caso de que la sesión no sea válida
  //Declaremos la propiedad FormBuilder que agilizará la creación del formulario
  constructor(private elaborador: FormBuilder, private router: Router, private servicioUsuario: UsuariosService) {
    this.formulario = this.elaborador.group({
      //Definimos los arrays para cada control del formulario
      nombre: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
    // Definimos el comportamento de nuestro formulario cada vez que sufra un cambio, en este caso, se reinicia el error de sesion
    this.formulario.valueChanges
      .pipe(debounceTime(50))
      .subscribe(valor => {
        this.errorSesion = false;
      });
  }

  //Funcion para guardar la sesión
  onSubmit(evento: Event) {
    evento.preventDefault(); // Evitamos o comportamento por defecto do navegador que borraría o formulario ao lanzar un "submit"

    // Comprobamos se o formulario cumpre todas as súas validacións
    if (this.formulario.valid) {
      this.usuarios.forEach(usuario => {
        if (usuario.nombre == this.formulario.get("nombre")?.value && usuario.password == this.formulario.get("password")?.value) {
            this.errorSesion = false;
            this.router.navigate(['/']);
          }
      
      });
      this.errorSesion = true;
    } else {
      this.errorSesion = true;
      this.formulario.markAllAsTouched(); // No caso de que o formulario sexa inválido, marcamos todos os campos como tocados para que se vexan as mensaxes de validación
    }
  }

  //GETTERS para facilitar el trabajo con los campos del formulario
  get campoNombre() {
    return this.formulario.get('nombre');
  }

  get campoRol() {
    return this.formulario.get('rol');
  }

  get campoPassword() {
    return this.formulario.get('password');
  }

  //Funcion para subscribirse al servicio y obtener a los usuarios
  ngOnInit(): void {
    this.servicioUsuario.subscribirseUsuarios$().subscribe((usuarios) => {
      this.usuarios = usuarios;
    })
  }
}
