import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  producto: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
   }

  private cargarProductos() {

    // tslint:disable-next-line:no-shadowed-variable
    return new Promise( (resolve, reject) => {

      this.http.get('https://mi-proyecto-en-angular.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        this.producto = resp;
        // console.log(resp);
        // SÓLO para probar que funciona el "loading" ponemos un Timeout...
        // setTimeout(() => {
        this.cargando = false;
        // }, 2000);
        resolve();
      });

    });
  }

  public getProducto( id: string ) {

    return this.http.get(`https://mi-proyecto-en-angular.firebaseio.com/productos/${ id }.json`);

  }

  public buscarProducto( termino: string) {

    if ( this.producto.length === 0 ) {
      // No hay productos cargados por lo que los cargamos
      this.cargarProductos().then( () => {
      // Ejecutamos después de tener los productos (.then())
      // Aplicamos el filtro
        this.filtrarProductos( termino );
      });
    } else {
      // Aplicamos el filtro
      this.filtrarProductos ( termino );
    }

    this.productosFiltrado = this.productosFiltrado.filter( producto => {
       return true;
    });

    // console.log( this.productosFiltrado );

  }

  private filtrarProductos ( termino: string) {

    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.producto.forEach( prod => {

      const categoriaLow = prod.categoria.toLocaleLowerCase();
      const tituloLow = prod.titulo.toLocaleLowerCase();

      if ( categoriaLow.indexOf( termino) >= 0 ||
           tituloLow.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push(prod);
      }

    });

  }
}
