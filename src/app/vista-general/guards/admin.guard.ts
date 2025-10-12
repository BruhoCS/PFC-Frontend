import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {

  let router = inject(Router);//Injectamos el router para poder redirigir el tráfico
  let usuario = sessionStorage.getItem("usuarioActual"); //recuperamos el valor del usuario desde el sessionStorage
  const usuario1 = JSON.parse(usuario);// Lo convertivos de JSON a string

  //Si el rol es administrador permitimos entrar
  if (usuario1.rol == "admin") {
    return true;
  } else {// si no lo és devolvemos al login
    router.navigate(['/login']);
    return false
  }
};
