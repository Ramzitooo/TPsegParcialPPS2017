import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController, Platform, AlertController } from 'ionic-angular';

import { ListadoAdministrativoPage } from '../listado-administrativo/listado-administrativo';
import { DatosAdministrativoPage } from '../datos-administrativo/datos-administrativo';
import { LoginPage } from '../login/login';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home-administrativo',
  templateUrl: 'home-administrativo.html',
  providers:[LocalNotifications]
})
export class HomeAdministrativoPage {

  animacionSeleccion : Array<string> = ["", "", "", "", "", "", "", "", "", ""];
  seleccionAnimar : number;

  loading : any;
  iconos : string = "Grandes";

  constructor(public navCtrl: NavController, public navParams: NavParams,private localNotifications: LocalNotifications,
              public loadingController : LoadingController, public actionSheetController : ActionSheetController, private platform: Platform,
              public alertCtrl: AlertController) 
  {
    this.Noti("Bienvenido Secretario!");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAdministrativoPage');
  }

  /**
  * Seleccion de una opcion de la pagina principal.
  * @param opcion numero que representa la opcion seleccionada.
  */
  Seleccion(opcion : number)
  {
    console.log("Selecciono " + opcion);
    this.animacionSeleccion[opcion] = "animated flash infinite";
    this.seleccionAnimar = opcion;

    if (opcion != 9)
      this.MostrarLoading(this.SeleccionOpcion(opcion));
    else
    {
      this.Salir();
      this.animacionSeleccion[opcion] = "";
      this.seleccionAnimar = 0;
    }
  }
  Noti(mensaje)
  {
  this.localNotifications.schedule({
   text: mensaje,
   at: new Date(new Date().getTime() + 1000),
   led: 'FF0000',
   sound: null
});
  }
  NoImplementado()
  {
    let confirm = this.alertCtrl.create({
      title: 'Informacion',
      message: 'No implementado aun...',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  /**
  * A partir de la opcion seleccionada de 'Seleccion', se obtiene la pagina a mostrar y lo que se quiere mostrar (Materia, Usuario, Division, Aula).
  * @param opcion numero que representa la opcion seleccionada.
  */
  SeleccionOpcion(opcion)
  {
    var objOpcion = {ruta : "listado-administrador", mensaje : "", tipo : ""};

    switch (opcion) {
      case 0:

        objOpcion.mensaje = "Tomar asistencias";
        objOpcion.tipo = "Asistencia";
        break;

      case 1:

        objOpcion.mensaje = "Agregar usuario";
        objOpcion.ruta = "agregar-administrador";
        objOpcion.tipo = "Usuario";
        break;

      case 2:

        objOpcion.mensaje = "Listado de divisiones";
        objOpcion.tipo = "Division";
        break;

      case 3:

        objOpcion.mensaje = "Listado de alumnos";
        //objOpcion.ruta = "agregar-administrador";
        objOpcion.tipo = "Alumno";
        break;

      case 4:

        objOpcion.mensaje = "Listado de profesores";
        objOpcion.tipo = "Profesor";
        break;

      case 5:

        objOpcion.mensaje = "Agregar materia";
        objOpcion.ruta = "agregar-administrador";
        objOpcion.tipo = "Materia";
        break;

      case 6:

        objOpcion.mensaje = "Listado de aulas";
        objOpcion.tipo = "Aula";
        break;
    
      case 7:

        objOpcion.mensaje = "Agregar aula";
        objOpcion.ruta = "agregar-administrador";
        objOpcion.tipo = "Aula";
        break;

      default:

        objOpcion.mensaje = "Agregar ciclo";
        objOpcion.ruta = "agregar-administrador";
        objOpcion.tipo = "Ciclo";
        break;
    }

    return objOpcion;
  }

  /**
  * Muestra un menu para cambiar la vista de los iconos de la pagina principal.
  */
  MostrarOpcionesVista() 
  {
   let actionSheet = this.actionSheetController.create({
     title: 'Cambiar vista',
     buttons: [
       {
         text: 'Iconos Grandes',
         icon: "expand",
         handler: () => {
           this.iconos = "Grandes";
         }
       },
      {
         text: 'Iconos Pequeños',
         icon: 'contract',
         handler: () => {
           this.iconos = "Pequeños";
         }
       },
      {
         text: 'Lista',
         icon : "list-box",
         handler: () => {
           this.iconos = "Lista";
         }
       },
       {
         text: 'Cancelar',
         icon: 'exit',
         role: 'cancel',
       }
     ]
   });

   actionSheet.present();
  }

  /**
  * Carga la pagina a mostrar.
  * @param seleccion objeto obtenido de la funcion 'SeleccionOpcion', contiene la pagina a mostrar, el titulo de la misma y el tipo de dato a manejar.
  */
  MostrarLoading(seleccion) 
  {
    console.log(seleccion);

    let loading = this.loadingController.create({
      spinner: 'bubbles',
      content: `Cargando ` + seleccion.mensaje + `, 
      Por Favor Espere un Momento...`,
      duration: 1000
    });

    loading.onDidDismiss(() => {
      this.animacionSeleccion[this.seleccionAnimar] = "";
      this.navCtrl.push(ListadoAdministrativoPage,
                           {opciones : seleccion},
                           {animate: true, direction: 'forward'});
    });

    this.loading = loading;

    this.loading.present();
  }

  MostrarDatos()
  {
    let loading = this.loadingController.create({
      spinner: 'bubbles',
      content: `Cargando datos del administrativo, 
      Por Favor Espere un Momento...`,
      duration: 1000
    });

    loading.onDidDismiss(() => {
      this.animacionSeleccion[1] = "";
      this.navCtrl.push(DatosAdministrativoPage);
    });

    this.loading = loading;

    this.loading.present();
  }

  Salir()
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('¿Que desea hacer?');

    alert.addInput({
      type: 'radio',
      label: 'Cerrar sesion, ir a Login',
      value: 'cerrarSesion',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Salir de la aplicacion',
      value: 'salir'
    });

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Aceptar',
      handler: data => {
        if(data == "cerrarSesion")
        {
            this.navCtrl.setRoot(LoginPage);
        }
        else
        {
            this.platform.exitApp();
        }
      }
    });
    alert.present();
  }

}
