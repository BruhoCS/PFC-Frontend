import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from "./cabecera/cabecera.component";
import { PieComponent } from "./pie/pie.component";


@Component({
  selector: 'app-vista-general',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CabeceraComponent, PieComponent],
  templateUrl: './vista-general.component.html',
  styleUrl: './vista-general.component.css'
})
export class VistaGeneralComponent {

}
