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
  usuario:Usuario;// Array que gardará o usuario da sesión
  errorSesion: boolean = false;//Variable que nos permitirá mostrar un mensaje de error en caso de que la sesión no sea válida
  //Declaremos la propiedad FormBuilder que agilizará la creación del formulario
  constructor(private elaborador: FormBuilder, private router: Router, private servicioUsuario: UsuariosService) {
    this.formulario = this.elaborador.group({
      //Definimos los arrays para cada control del formulario
      email: ["", [Validators.required]],
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
        const correcto = await this.servicioUsuario.iniciarsesion(email,password);
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
  get campoEmail() {
    return this.formulario.get('email');
  }

  get campoPassword() {
    return this.formulario.get('password');
  }

  //Funcion para subscribirse al servicio y obtener a los usuarios
  ngOnInit(): void {
    this.servicioUsuario.usuarioActual$.subscribe((usuarios) => {
      this.usuario = usuarios;

    })
  }
}
