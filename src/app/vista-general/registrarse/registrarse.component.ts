import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../servizos/usuarios.service';
import { Usuario } from '../modelo/usuario';
import { BehaviorSubject, debounceTime, Observable } from 'rxjs';
import { Plan } from '../modelo/plan';
import { PlanesService } from '../../servizos/planes.service';


@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {
  formulario: FormGroup;//Definimos el formulario que irá asociado al formulario
  usuario: Usuario;// Array que gardará o usuario da sesión
  errorSesion: boolean = false;//Variable que nos permitirá mostrar un mensaje de error en caso de que la sesión no sea válida
  //variable para almacenar los planes y que el usuario elija el suyo
  planes: Plan[];

  //Declaremos la propiedad FormBuilder que agilizará la creación del formulario
  constructor(private elaborador: FormBuilder, private servicioUsuario: UsuariosService, private servicioPlanes: PlanesService) {
    this.formulario = this.elaborador.group({

      //Campos para tabla user 
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      rol: ["user"], // por defecto usuario normal
      id_plan: [Validators.required], 

      //Campos para tabla perfil
      apellido: ["", [Validators.required]],
      telefono: ["", [Validators.required, Validators.pattern(/^[0-9+\- ]{6,20}$/)]],
      direccion: ["", [Validators.required, Validators.minLength(5)]],
      hobby: ["", [Validators.required, Validators.minLength(3)]],

    });

    // Definimos el comportamento de nuestro formulario cada vez que sufra un cambio, en este caso, se reinicia el error de sesion
    this.formulario.valueChanges
      .pipe(debounceTime(50))
      .subscribe(valor => {
        this.errorSesion = false;
      });
  }

  //Funcion para registrarse
  registrarUser(nuevoUsuario: String[]) {
    this.servicioUsuario.crearUsuario(nuevoUsuario);
  }

  async onSubmit(evento: Event) {
    //Prevenir errores del navegador
    evento.preventDefault();

    //Validación del formulario
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) {
      this.errorSesion = true;
      return;
    }
    //Usamos la función para enviar los datos al backend y registrar asi el usuario
    this.registrarUser(this.formulario.value);

  }

  //GETTERS para facilitar el trabajo con los campos del formulario
  get campoName() {
    return this.formulario.get('name');
  }

  get campoEmail() {
    return this.formulario.get('email');
  }

  get campoPassword() {
    return this.formulario.get('password');
  }

  get campoRol() {
    return this.formulario.get('rol');
  }

  get campoIdPlan() {
    return this.formulario.get('id_plan');
  }

  // ---- Getter para perfil ----
  get campoApellido() {
    return this.formulario.get('apellido');
  }

  get campoTelefono() {
    return this.formulario.get('telefono');
  }

  get campoDireccion() {
    return this.formulario.get('direccion');
  }

  get campoHobby() {
    return this.formulario.get('hobby');
  }


  
  ngOnInit(): void {
    //Funcion para subscribirse al servicio y obtener a los usuarios
    this.servicioUsuario.usuarioActual$.subscribe((usuarios) => {
      this.usuario = usuarios;

    });

    //Cargamos los pplanes y subscribimos nuestra variable para poder mostrarlos y que el usuario elija 1 
    this.servicioPlanes.mostrarPlanes();
    this.servicioPlanes.subscribirsePlanes$().subscribe((planes) => {
      this.planes = planes;
    });
  }
}
