import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../servizos/usuarios.service';
import { Usuario } from '../modelo/usuario';
import { debounceTime } from 'rxjs';


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
  //Declaremos la propiedad FormBuilder que agilizará la creación del formulario
  constructor(private elaborador: FormBuilder, private router: Router, private servicioUsuario: UsuariosService) {
    this.formulario = this.elaborador.group({

      //Campos para tabla user 
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      rol: ["user"], // por defecto usuario normal
      id_plan: [null], // normalmente null al registrarse

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

  //Funcion para guardar la sesión
  async onSubmit(evento: Event) {
    evento.preventDefault(); // Evitamos o comportamento por defecto do navegador que borraría o formulario ao lanzar un "submit"
    // Marca todos los controles como "tocados" para mostrar validaciones
    this.formulario.markAllAsTouched();
    // Si el formulario no cumple las validaciones...                      
    if (this.formulario.invalid) {
      // ...activa el indicador de error de sesión en la UI                             
      this.errorSesion = true;
      // ...y sale sin intentar loguear                      
      return;
    }

    // Extrae los valores actuales de email y password del formulario
    const { email, password } = this.formulario.value;
    // Inicia bloque de manejo de errores para operaciones asíncronas
    try {
      // Espera a que el servicio haga el login contra el backend                                                       
      const correcto = await this.servicioUsuario.iniciarsesion(email, password);
      // Si el servicio indica que el login no fue correcto...
      if (!correcto) {
        // ...muestra error en la UI                                   
        this.errorSesion = true;
        // ...y termina el flujo                              
        return;
      }
      // Si ocurre una excepción (error de red, 4xx/5xx, etc.)
    } catch {
      // ...activa el error de sesión para informar en la UI                                                
      this.errorSesion = true;
    }
  }

  //GETTERS para facilitar el trabajo con los campos del formulario
  // ---- GETTERS PARA USER ----
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

  // ---- GETTERS PARA PERFIL ----
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


  //Funcion para subscribirse al servicio y obtener a los usuarios
  ngOnInit(): void {
    this.servicioUsuario.usuarioActual$.subscribe((usuarios) => {
      this.usuario = usuarios;

    })
  }
}
