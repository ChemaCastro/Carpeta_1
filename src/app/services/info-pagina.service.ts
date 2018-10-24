import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = [];

  constructor( private http: HttpClient) {

    // console.log('Servicio de infoPagina LISTO');

    // Leemos el archivo JSON en local
    this.cargarInfo();
    // Leemos el JSON generado por Firebase
    this.cargarEquipo();

  }

  private cargarInfo() {

      this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;
      //console.log(resp);
    });
  }

  private cargarEquipo() {

    this.http.get('https://mi-proyecto-en-angular.firebaseio.com/equipo.json')
    .subscribe( (resp: any[]) => {
    this.equipo = resp;
    //console.log(resp);
    });

  }
}
