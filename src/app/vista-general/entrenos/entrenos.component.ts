import { Component, OnInit } from '@angular/core';
import { EntrenoManualComponent } from "./entreno-manual/entreno-manual.component";
import { CommonModule } from '@angular/common';
import { Ejercicio } from '../../ejercicio';
import { EntrenosIaService } from '../../servizos/entrenos-ia.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-entrenos',
  standalone: true,
  imports: [EntrenoManualComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './entrenos.component.html',
  styleUrl: './entrenos.component.css'
})
export class EntrenosComponent {

}
