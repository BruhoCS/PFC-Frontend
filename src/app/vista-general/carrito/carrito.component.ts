import { Component, Input } from '@angular/core';
import { Productos } from '../modelo/productos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  @Input() productos:Productos[] = [];

}
