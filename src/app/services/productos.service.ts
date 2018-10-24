import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  producto: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
   }

  private cargarProductos() {
    this.http.get('https://mi-proyecto-en-angular.firebaseio.com/productos_idx.json')
    .subscribe( (resp: Producto[]) => {
      this.producto = resp;
      console.log(resp);
      // SÓLO para probar que funciona el "loading" ponemos un Timeout...
      // setTimeout(() => {
      this.cargando = false;
    // }, 2000);
    });
  }
}
