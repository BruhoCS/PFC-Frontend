import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VistaGeneralComponent } from "./vista-general/vista-general.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VistaGeneralComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'couceiro_sande_bruno-VISTA_XERAL';
}
