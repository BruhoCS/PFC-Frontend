import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../modelo/usuario';
import { Deporte } from '../modelo/deporte';
import { Entrenador } from '../modelo/entrenador';
import { UsuariosService } from '../../servizos/usuarios.service';
import { PlanesService } from '../../servizos/planes.service';
import { Plan } from '../modelo/plan';
import { DeportesService } from '../../servizos/deportes.service';
import { EntrenadorServiceService } from '../../servizos/entrenador.service.service';
import { Perfil } from '../modelo/perfil';

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
  usuarios: Usuario[];
  perfiles: Perfil[];
  deportes: Deporte[];
  entrenadores: Entrenador[];
  planes: Plan[];

  constructor(private fb: FormBuilder, private servicioUsuario: UsuariosService,
    private servicioPlanes: PlanesService, private servicioDeportes: DeportesService,
    private servicioEntrenadores: EntrenadorServiceService) {

    //Formulario usuarios
    this.formUsuarios = this.fb.group({
      //necesario para modificar
      id: [null],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['user'],
      id_plan: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      hobby: ['', Validators.required]
    });


    //Formulario deportes
    this.formDeportes = this.fb.group({
      id_entrenador: ['', Validators.required],
      nombre: ['', Validators.required],
      dia: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      nivel: ['', Validators.required],
      duracion: ['', Validators.required]
    });

    //Formulario entrenadores
    this.formEntrenadores = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    /* PLANES */
    //Cargamos los planes
    this.servicioPlanes.mostrarPlanes();
    //Y rellenamos nuestra variable local para poder mostrarlos y que el admin elija
    this.servicioPlanes.subscribirsePlanes$().subscribe((planes) => {
      this.planes = planes;
    });

    /* DEPORTES */
    //Cargamos los deportes
    this.servicioDeportes.mostrarDeportes();
    //Rellenamos la variable local con los deportes
    this.servicioDeportes.subscribirseDeportes$().subscribe((deportes) => {
      this.deportes = deportes
    });

    /* USUARIOS */
    //Cargamos los usuarios
    this.servicioUsuario.mostrarUsuarios();
    //Subscribimos nuestra variable local para obtenerlos
    this.servicioUsuario.subscribirseUsuarios$().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
    //Tambien cargaremos sus perfiles
    this.servicioUsuario.mostrarPerfiles();
    // Y subscribiremos nuestra variable local
    this.servicioUsuario.subscribirsePerfiles$().subscribe((perfiles) => {
      this.perfiles = perfiles;
    });

    /* ENTRENADORES */
    //Cargamos los entrenadores
    this.servicioEntrenadores.mostrarEntrenadores();
    //Subscribimos la variable local para obtenerlos
    this.servicioEntrenadores.subscribirseEntrenadores$().subscribe((entrenadores) => {
      this.entrenadores = entrenadores;
    })
  }

  // Usuarios
  //Función para obtener el usuario y enviarlo al formulario para modificarlo
  obtenerUser(usuario: Usuario) {
    this.formUsuarios.patchValue({
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      password: "",
      rol: usuario.rol,
      id_plan: usuario.id_plan,
    });
  }

  // Función para crear usuario nuevo
  crearUsuario(usuario: string[]) {
    //En caso de que el formulario sea invalido no envia la información
    if (this.formUsuarios.invalid) { return };
    //Si no llamamos a la función para enviar los datos del ususario al backend
    this.servicioUsuario.crearUsuario(usuario);
    //Y limpiamos el formulario
    this.formUsuarios.reset();
  }
  //Funcion para modificar usuario
  modificarUsuario() {
    //Obtenemos todos los datos del usuario
    const userModificado = this.formUsuarios.value;
    console.log("USuario modificado: "+userModificado);
    console.log("ID DEL USUARIO MODIFICADO: "+userModificado.id)
    //En caso de que no tenga id mostramos error
    if (!userModificado.id) {
      console.error("No hay id");
      return;
    }
    //Enviamos al backend donde se gestionará la modificación
    this.servicioUsuario.modificarUsuario(userModificado.id, userModificado);
  }

  // Funcion para eliminar el usuario buscando por id
  borrarUsuario(id: number) {
    this.servicioUsuario.eliminarUsuario(id);
  }

  // Deportes
  //Función para obtener el usuario y enviarlo al formulario para modificarlo
  obtenerDeporte(deporte: Deporte) {
    this.formDeportes.patchValue({
      nombre: deporte.nombre,
      dia: deporte.dia,
      precio: deporte.precio,
      descripcion: deporte.descripcion,
      nivel: deporte.nivel,
      duracion: deporte.duración,
      id_entrenador: deporte.id_entrenador
    });
  }
  crearDeporte() { }
  modificarDeporte() { }
  borrarDeporte(dep: any) { }

  // Entrenadores
  // Función para obtener un entrenador y enviar sus datos al formulario
  obtenerEntrenador(entrenador: Entrenador) {
    this.formEntrenadores.patchValue({
      email: entrenador.email,
      nombre: entrenador.nombre,
      apellido: entrenador.apellido,
      direccion: entrenador.direccion,
      telefono: entrenador.telefono
    });
  }

  crearEntrenador() { }
  modificarEntrenador() { }
  borrarEntrenador(ent: any) { }


  //GETTERS USUARIOS

  get campoName() { return this.formUsuarios.get('name'); }
  get campoEmail() { return this.formUsuarios.get('email'); }
  get campoPassword() { return this.formUsuarios.get('password'); }
  get campoRol() { return this.formUsuarios.get('rol'); }
  get campoIdPlan() { return this.formUsuarios.get('id_plan'); }

  get campoApellido() { return this.formUsuarios.get('apellido'); }
  get campoDireccion() { return this.formUsuarios.get('direccion'); }
  get campoTelefono() { return this.formUsuarios.get('telefono'); }
  get campoHobby() { return this.formUsuarios.get('hobby'); }

  //GETTERS DEPORTES
  get campoIdEntrenador() { return this.formDeportes.get('id_entrenador'); }
  get campoNombreDep() { return this.formDeportes.get('nombre'); }
  get campoDia() { return this.formDeportes.get('dia'); }
  get campoPrecio() { return this.formDeportes.get('precio'); }
  get campoDescripcion() { return this.formDeportes.get('descripcion'); }
  get campoNivel() { return this.formDeportes.get('nivel'); }
  get campoDuracion() { return this.formDeportes.get('duracion'); }

  //GETTERS ENTRENADORES
  get campoEmailEnt() { return this.formEntrenadores.get('email'); }
  get campoNombreEnt() { return this.formEntrenadores.get('nombre'); }
  get campoApellidoEnt() { return this.formEntrenadores.get('apellido'); }
  get campoDireccionEnt() { return this.formEntrenadores.get('direccion'); }
  get campoTelefonoEnt() { return this.formEntrenadores.get('telefono'); }
}
