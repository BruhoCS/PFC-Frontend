import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent implements OnInit {

  // Formularios
  formUsuarios: FormGroup;
  formDeportes: FormGroup;
  formEntrenadores: FormGroup;

  // Listas de elementos
  usuarios: any[] = [];
  deportes: any[] = [];
  entrenadores: any[] = [];

  constructor(private fb: FormBuilder) {

    /* ============================
       FORMULARIO USUARIOS
    ============================ */
    this.formUsuarios = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['user', Validators.required],

      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      hobby: ['', Validators.required]
    });

    /* ============================
       FORMULARIO DEPORTES
    ============================ */
    this.formDeportes = this.fb.group({
      id_entrenador: ['', Validators.required],
      nombre: ['', Validators.required],
      dia: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      nivel: ['', Validators.required],
      duracion: ['', Validators.required]
    });

    /* ============================
       FORMULARIO ENTRENADORES
    ============================ */
    this.formEntrenadores = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Aquí cargarías usuarios, deportes y entrenadores desde el servicio
  }

  /* ============================
        GETTERS USUARIOS
  ============================ */
  get campoName() { return this.formUsuarios.get('name'); }
  get campoEmail() { return this.formUsuarios.get('email'); }
  get campoPassword() { return this.formUsuarios.get('password'); }
  get campoRol() { return this.formUsuarios.get('rol'); }

  get campoApellido() { return this.formUsuarios.get('apellido'); }
  get campoDireccion() { return this.formUsuarios.get('direccion'); }
  get campoTelefono() { return this.formUsuarios.get('telefono'); }
  get campoHobby() { return this.formUsuarios.get('hobby'); }

  /* ============================
        GETTERS DEPORTES
  ============================ */
  get campoIdEntrenador() { return this.formDeportes.get('id_entrenador'); }
  get campoNombreDep() { return this.formDeportes.get('nombre'); }
  get campoDia() { return this.formDeportes.get('dia'); }
  get campoPrecio() { return this.formDeportes.get('precio'); }
  get campoDescripcion() { return this.formDeportes.get('descripcion'); }
  get campoNivel() { return this.formDeportes.get('nivel'); }
  get campoDuracion() { return this.formDeportes.get('duracion'); }

  /* ============================
      GETTERS ENTRENADORES
  ============================ */
  get campoEmailEnt() { return this.formEntrenadores.get('email'); }
  get campoNombreEnt() { return this.formEntrenadores.get('nombre'); }
  get campoApellidoEnt() { return this.formEntrenadores.get('apellido'); }
  get campoDireccionEnt() { return this.formEntrenadores.get('direccion'); }
  get campoTelefonoEnt() { return this.formEntrenadores.get('telefono'); }


  /* ============================
      FUNCIONES VACÍAS
  ============================ */

  // Usuarios
  crearUsuario() { }
  modificarUsuario() { }
  borrarUsuario(user: any) { }

  // Deportes
  crearDeporte() { }
  modificarDeporte() { }
  borrarDeporte(dep: any) { }

  // Entrenadores
  crearEntrenador() { }
  modificarEntrenador() { }
  borrarEntrenador(ent: any) { }

}
