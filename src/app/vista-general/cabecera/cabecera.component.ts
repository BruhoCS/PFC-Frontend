import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../modelo/usuario';
import { UsuariosService } from '../../servizos/usuarios.service';


@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent implements OnInit {


  usuarioActual: any = null;

  constructor(private router: Router, private servicioUsuario: UsuariosService) { }

  ngOnInit() {
    // Suscribirse a los cambios del usuario en tiempo real
    this.servicioUsuario.usuarioActual$.subscribe(user => {
      this.usuarioActual = user;
    });

    // Por si había sesión guardada
    const storedUser = sessionStorage.getItem("usuarioActual");
    if (storedUser) {
      this.usuarioActual = JSON.parse(storedUser);
      this.servicioUsuario.usuarioActual$.next(this.usuarioActual);
    }
  }
  cerrarSesion() {
    sessionStorage.clear();
    //Reenviamos a la página de inicio
    this.router.navigate(['/login']);
  }

}

