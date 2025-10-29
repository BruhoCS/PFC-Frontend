import { Routes } from '@angular/router';
import { TarifaComponent } from './vista-general/tarifa/tarifa.component';
import { EntrenosComponent } from './vista-general/entrenos/entrenos.component';
import { InicioComponent } from './vista-general/inicio/inicio.component';
import { LoginComponent } from './vista-general/login/login.component';
import { paginasRestringidasGuard } from './vista-general/guards/paginas-restringidas.guard';
import { CarritoComponent } from './vista-general/carrito/carrito.component';
import { AdministracionComponent } from './vista-general/administracion/administracion.component';
import { adminGuard } from './vista-general/guards/admin.guard';
import { PerfilComponent } from './vista-general/perfil/perfil.component';
import { DeportesComponent } from './vista-general/deportes/deportes.component';

export const routes: Routes = [
    { path: "", title: "Inicio", component: InicioComponent },
    //Ruta carrito de la tienda
    { path: "carrito", title: "Carrito", component: CarritoComponent },
    //Ruta tarifa
    { path: "tarifa", title: "Tarifas", component: TarifaComponent },
    //Ruta Entreno
    { path: "entreno", title: "Entreno", component: EntrenosComponent, canActivate: [paginasRestringidasGuard] },
    //Ruta Deportes
    { path: "deporte", title: "Deporte", component: DeportesComponent, canActivate: [paginasRestringidasGuard] },
    //Ruta administracion
    { path: "administracion", title: "Administracion", component: AdministracionComponent, canActivate: [paginasRestringidasGuard, adminGuard] },
    //Ruta de perfil
    { path: "perfil", title: "Perfil", component: PerfilComponent, canActivate: [paginasRestringidasGuard] },
    //Ruta de login
    { path: "login", title: "Login", component: LoginComponent }
];
