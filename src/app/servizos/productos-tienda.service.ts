import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Productos } from '../../app/vista-general/modelo/productos';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosTiendaService {

  productos: Productos[] = [];

  comida$: BehaviorSubject<Productos[]> = new BehaviorSubject<Productos[]>([]);
  suplementos$: BehaviorSubject<Productos[]> = new BehaviorSubject<Productos[]>([]);
  accesorios$: BehaviorSubject<Productos[]> = new BehaviorSubject<Productos[]>([]);

  constructor(private http: HttpClient) {}

  cargarProductos() {
    this.http.get<Productos[]>('https://693596ddfa8e704dafbe48f0.mockapi.io/producto')
      .subscribe({
        next: (productos) => {
          console.log("Productos obtenidos:", productos);
          this.productos = productos;

          this.comida$.next(
            productos.filter(p => p.categoria === "comida")
          );

          this.suplementos$.next(
            productos.filter(p => p.categoria === "suplementos")
          );

          this.accesorios$.next(
            productos.filter(p => p.categoria === "accesorios")
          );
        },
        error: (err) => {
          console.log("Error al cargar los productos:", err);
        }
      });
  }

  subscribirseComida$() {
    return this.comida$.asObservable();
  }

  subscribirseSuplementos$() {
    return this.suplementos$.asObservable();
  }

  subscribirseAccesorios$() {
    return this.accesorios$.asObservable();
  }
}
