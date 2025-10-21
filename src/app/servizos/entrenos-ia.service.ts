import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ejercicio } from '../ejercicio';

@Injectable({
  providedIn: 'root'
})
export class EntrenosIaService {

  constructor(private cliente: HttpClient) {

  }


}
