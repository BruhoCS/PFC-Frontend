import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { UsuariosService } from '../../servizos/usuarios.service';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent{
  usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));

  
 
  

}
