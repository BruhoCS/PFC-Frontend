import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { Perfil } from '../modelo/perfil';
import { UsuariosService } from '../../servizos/usuarios.service';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  //Obtener usuario actual
  usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));
  //Variable para almacenar los datos del perfil
  perfilUser:Perfil;

  //Constructor para poder llamar al servicio
  constructor(private servicio:UsuariosService){

  }
 
  //NgOnit para poder cargar los datos al entrar en la página
  ngOnInit(): void {
    //Función para cargar el perfil
    this.servicio.mostrarPerfil();
    //Rellenamos la variable perfilUser con los datos del perfil del usuario
    this.servicio.subscribirsePerfil$().subscribe((perfilUser)=>{
      this.perfilUser = perfilUser;
    })
  }
}
