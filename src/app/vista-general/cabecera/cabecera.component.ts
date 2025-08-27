import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {

  constructor(private router:Router){
    
  }

  cerrarSesion(){
    sessionStorage.clear();
    //Reenviamos a la página de inicio
    this.router.navigate(['']);
  }

}
