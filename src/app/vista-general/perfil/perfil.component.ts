import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { Perfil } from '../modelo/perfil';
import { UsuariosService } from '../../servizos/usuarios.service';
import { DeportesService } from '../../servizos/deportes.service';
import { Deporte } from '../modelo/deporte';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  //Obtener usuario actual
  usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));
  //Variable para almacenar los datos del perfil
  perfilUser:Perfil;
  //Variable para almacenar los deportes a los que el usuario está apuntado
  misDeportes:Deporte[];

  //Constructor para poder llamar al servicio
  constructor(private servicio:UsuariosService, private servicioDeporte:DeportesService){

  }
 
  //Método para desapuntarse del deporte
  desapuntarse(depId:string){
    this.servicioDeporte.desapuntarseDeporte(depId);
  }

  //NgOnit para poder cargar los datos al entrar en la página
  ngOnInit(): void {
    //Función para cargar el perfil
    this.servicio.mostrarPerfil();
    //Rellenamos la variable perfilUser con los datos del perfil del usuario
    this.servicio.subscribirsePerfil$().subscribe((perfilUser)=>{
      this.perfilUser = perfilUser;
    })

    //Función para cargar los deportes 
    this.servicioDeporte.cargarMisDeportes();
    //Rellenamos el array de misDeportes con los datos recibidos por el servicio
    this.servicioDeporte.subscribirseDeportes$().subscribe((misDeportes)=>{
      this.misDeportes = misDeportes;
    })
  }
}
