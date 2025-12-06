import { Injectable } from '@angular/core';
import { Usuario } from '../vista-general/modelo/usuario';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Perfil } from '../vista-general/modelo/perfil';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // Variable para almacenar todos los usuarios
  usuarios: Usuario[] = [];
  // Flujo reactivo para emitir la lista de usuarios a quien se suscriba.
  usuarios$: BehaviorSubject<Usuario[]>;
  //Variables para almacenar al usuario que se encuentra en la sesión
  usuarioActual: Usuario;
  usuarioActual$: BehaviorSubject<Usuario>;//Empieza sin subscripción
  //Variables para guardar los perfiles de los usuarios
  perfiles: Perfil[];
  perfiles$: BehaviorSubject<Perfil[]>;
  //Variable para guardar el perfil
  perfilUser: Perfil;
  perfilUser$: BehaviorSubject<Perfil>;



  constructor(private router: Router, private http: HttpClient) {
    //Usuario actual
    this.usuarioActual$ = new BehaviorSubject(this.usuarioActual);
    //Perfil del usuario actual
    this.perfilUser$ = new BehaviorSubject(this.perfilUser);
    //Todos los usuarios
    this.usuarios$ = new BehaviorSubject(this.usuarios);
    //Todos los perfiles
    this.perfiles$ = new BehaviorSubject(this.perfiles);
  }

  //Mostrar Usuarios
  mostrarUsuarios() {
    //Obtener el token y la autorización para hacer la petición
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });
    // Petición a la API (ajusta la URL si tu ruta es distinta)
    this.http.get<Usuario[]>('http://127.0.0.1:8000/api/usuarios', { headers })
      .subscribe({
        next: (listaUsuarios) => {
          // Guardamos los usuarios en la variable local
          this.usuarios = listaUsuarios;
          // Emitimos la lista a los suscriptores del BehaviorSubject
          this.usuarios$.next(listaUsuarios);
        },
        error: (err) => {
          console.error("Error al cargar los usuarios:", err);
          // Si falla, limpiamos los datos
          this.usuarios = [];
          this.usuarios$.next([]);
        }
      });

  }

  //Hacer usuarios un observable
  subscribirseUsuarios$() {
    return this.usuarios$.asObservable();
  }

  //Mostrar perfil del usuario de la sesión
  mostrarPerfil() {
    //Obtener el token y la autorización para hacer la petición
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });
    //Obtener el id del usuario actual
    const usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));

    // Realiza una petición GET.
    this.http.get<Perfil>('http://127.0.0.1:8000/api/perfil/' + usuarioActual.id, { headers })
      .subscribe({
        // next se ejecuta si llega la respuesta correcta del servidor
        next: (perfilUser) => {
          //Guardamos el perfil en la variable local
          this.perfilUser = perfilUser;
          //Emitimos el perfil a los subscriptores del behaviorSubject
          this.perfilUser$.next(perfilUser)
        },
        // error se ejecuta si la petición falla (4xx/5xx, red, etc.).
        error: (err) => {
          // Registramos el error en consola 
          console.log("Error al cargar el perfil");
        }
      })
  }

  // Este método permite subscribirse aos cambios do perfil
  subscribirsePerfil$(): Observable<Perfil> {
    return this.perfilUser$.asObservable();
  }

  // Método que hace una petición HTTP GET al backend para obtener los perfiles
  // y actualiza tanto el array local como el BehaviorSubject.
  mostrarPerfiles() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });
    // Realiza una petición GET.
    this.http.get<Perfil[]>('http://127.0.0.1:8000/api/perfiles', { headers })
      // Nos suscribimos al Observable para ejecutar la petición y manejar la respuesta.
      .subscribe({
        // next se ejecuta cuando llega la respuesta correcta del servidor.
        next: (perfiles) => {
          // Guardamos los perfiles en la variable local 
          this.perfiles = perfiles;
          // Emitimos los perfiles a todos los suscriptores del BehaviorSubject.
          this.perfiles$.next(perfiles);
        },
        // error se ejecuta si la petición falla (4xx/5xx, red, etc.).
        error: (err) => {
          // Registramos el error en consola 
          console.log("Error al cargar usuarios", err);
          // Dejamos el estado local vacio
          this.usuarios = [];
          // Emitimos lista vacía para que la UI reaccione
          this.usuarios$.next([]);
        }
      });
  }
  // Este método permite subscribirse aos cambios do perfil
  subscribirsePerfiles$(): Observable<Perfil[]> {
    return this.perfiles$.asObservable();
  }

  //Metodo que permite añadir un nuevo usuario al tiempo que informa a los subscriptores
  crearUsuario(nuevoUsuario: String[]) {
    //Hacemos el post para enviar la información al servidor
    this.http.post('http://127.0.0.1:8000/api/register', nuevoUsuario, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    })
      // Nos suscribimos al Observable para ejecutar la petición y manejar la respuesta.
      .subscribe({
        // next se ejecuta cuando llega la respuesta correcta del servidor.
        next: () => {
          console.log("Se ha registrado correctamente");

        },
        // error se ejecuta si la petición falla (4xx/5xx, red, etc.).
        error: (err) => {
          // Registramos el error en consola 
          console.log("Error al registrarse", err);
        }
      });
  }

  //Modificar usuario
  modificarUsuario(id: number, usuarioModificado: string[]) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`,
      Accept: 'application/json'
    });
    //Hacemos el post para enviar la información al servidor
    this.http.put(`http://127.0.0.1:8000/api/usuarios/${id}`, usuarioModificado, { headers })
      // Nos suscribimos al Observable para ejecutar la petición y manejar la respuesta.
      .subscribe({
        // next se ejecuta cuando llega la respuesta correcta del servidor.
        next: () => {
          console.log("Se ha modificado el usuario correctamente");

        },
        // error se ejecuta si la petición falla (4xx/5xx, red, etc.).
        error: (err) => {
          // Registramos el error en consola 
          console.log("Error al modificar", err);
        }
      });
  }

  // Eliminar usuario por ID
  eliminarUsuario(id: number) {

    const token = localStorage.getItem('token') ?? '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });

    this.http.delete(`http://127.0.0.1:8000/api/usuarios/${id}`, { headers })
      .subscribe({
        next: () => {
          console.log("Usuario eliminado correctamente");

          //actualizamos la lista 
          this.usuarios = this.usuarios.filter(u => u.id !== id);
          this.usuarios$.next(this.usuarios);
        },
        error: (err) => {
          //Si hay algun fallo mostramos el error
          console.error("Error al eliminar el usuario:", err);
        }
      });
  }


  // Método para iniciar sesión con un email y contraseña
  iniciarsesion(email: string, password: string): Promise<boolean> {

    // Crea el objeto con las credenciales que se enviarán al backend
    const loginData = { email, password };

    // Muestra en consola el payload que se va a enviar (útil para depurar)
    console.log('Enviando credenciales:', loginData);

    // Devuelve una nueva Promesa; llamará a resolve(true) si todo va bien o reject(false) si falla
    return new Promise((resolve, reject) => {
      // Lanza una petición HTTP POST al endpoint de login enviando loginData en el cuerpo
      this.http.post<any>('http://127.0.0.1:8000/api/loginAPI', loginData, {
        // Configura cabeceras HTTP para la petición
        headers: new HttpHeaders({
          // Indica que el cuerpo de la petición es JSON
          'Content-Type': 'application/json',
          // Indica que se espera una respuesta en JSON
          'Accept': 'application/json',
        }),
        // Se suscribe al Observable para ejecutar la petición y gestionar la respuesta
      }).subscribe({
        // Callback que se ejecuta cuando la respuesta llega correctamente (status 2xx)
        next: (response) => {
          console.log("Respuesta del login:", response);

          // Guardar token
          const token = response.accessToken;
          // Comprueba que realmente exista un token
          if (!token) {
            console.error("No se recibió ningún token en la respuesta del login");
            // Rechaza la Promesa indicando que el login ha fallado
            reject(false);
            // Sale de la función para no continuar con el flujo
            return;
          }
          // Guarda el token en localStorage (persistente entre sesiones del navegador)
          localStorage.setItem('token', token);

          // Guardar usuario
          const user: Usuario = response.user;
          this.usuarioActual = user;
          this.usuarioActual$.next(user);

          // Guardamos usuario en sessionStorage
          sessionStorage.setItem('usuarioActual', JSON.stringify(user));
          // Redirigimos al inicio de la web
          this.router.navigate(['/']);
          resolve(true);
        },
        // Callback que se ejecuta si la petición falla (errores 4xx/5xx o de red)
        error: (error) => {
          console.error('Error de login:', error);
          // Emite undefined para indicar que no hay usuario autenticado
          this.usuarioActual$.next(undefined);
          // Rechaza la Promesa con false indicando fallo
          reject(false);
        }
      });
    });
  }

}
