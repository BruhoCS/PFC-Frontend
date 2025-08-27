import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Productos } from '../../app/vista-general/modelo/productos';
import * as comidaJson from "../../../public/data/comida.json";
import * as accesoriosJson from "../../../public/data/accesorios.json";
import * as suplementosJson from "../../../public/data/suplementos.json";

@Injectable({
  providedIn: 'root'
})
export class ProductosTiendaService {
  //Definimos los array que contendrá la comida,los suplementos y los accesorios de los JSON
  comida:Productos[];
  suplementos:Productos[];
  accesorios:Productos[];

  //Definimos los subject que emitirá el array a todos los subscriptores
  comida$: BehaviorSubject<Productos[]>;
  suplementos$: BehaviorSubject<Productos[]>;
  accesorios$: BehaviorSubject<Productos[]>;

  constructor() { 
    //COMIDA
    this.comida = (comidaJson as any).default;//Iniciamos con los productos del JSON
    this.comida$ = new BehaviorSubject(this.comida);//Inicialmente no hay subscriptores
    //SUPLEMENTOS
    this.suplementos = (suplementosJson as any).default;//Iniciamos con los productos del JSON
    this.suplementos$ = new BehaviorSubject(this.suplementos);//Inicialmente no hay subscriptores
    //ACCESORIOS
    this.accesorios = (accesoriosJson as any).default;//Iniciamos con los productos del JSON
    this.accesorios$ = new BehaviorSubject(this.accesorios);//Inicialmente no hay subscriptores
  }

  //Metodos que permiten añadir un nuevo producto al tiempo que informa a los subscritores
  crearComida(nuevaComida:Productos):void{
    this.comida.push(nuevaComida);//Rellenamos el array
    this.comida$.next(this.comida);//Informamos a los subscriptores
  }

  crearSuplemento(nuevoSuplemento:Productos):void{
    this.suplementos.push(nuevoSuplemento);//Rellenamos el array
    this.suplementos$.next(this.suplementos);//Informamos a los subscriptores
  }

  crearAccesorio(nuevoAccesorio:Productos):void{
    this.accesorios.push(nuevoAccesorio);//Rellenamos el array
    this.accesorios$.next(this.accesorios);//Informamos a los subscriptores
  }

  //Métodos para permitir que se subscriban al array
  subscribirseComida$():Observable<Productos[]>{
    return this.comida$.asObservable();
  }

  subscribirseSuplemento$():Observable<Productos[]>{
    return this.suplementos$.asObservable();
  }

  subscribirseAccesorio$():Observable<Productos[]>{
    return this.accesorios$.asObservable();
  }
}
