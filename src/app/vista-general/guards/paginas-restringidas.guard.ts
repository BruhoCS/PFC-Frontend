import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const paginasRestringidasGuard: CanActivateFn = (route, state) => {
  let router =  inject(Router);//Injectamos el router para poder redirigir el tráfico
  let usuario = sessionStorage.getItem("usuarioActual"); //recuperamos el valor del usuario desde el sessionStorage
  
  // Comprobamos si hay usuarios guardados
  if(usuario){
    return true;
  }else{
    router.navigate(['/login']);// Se non hai usuario logueado impedimos o acceso á ruta e rediriximos á páxina de login
    return false;
  }
};
