import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductosTiendaService } from '../../servizos/productos-tienda.service';
import { Productos } from '../modelo/productos';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent implements OnInit {
  comida: Productos[];
  suplementos: Productos[];
  accesorios: Productos[];

  constructor(private servicioProductos: ProductosTiendaService) {

  }

  ngOnInit(): void {
    this.servicioProductos.cargarProductos();

    this.servicioProductos.subscribirseComida$()
      .subscribe(c => this.comida = c);

    this.servicioProductos.subscribirseSuplementos$()
      .subscribe(s => this.suplementos = s);

    this.servicioProductos.subscribirseAccesorios$()
      .subscribe(a => this.accesorios = a);
  }



}
