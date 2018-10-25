import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  // Definimos esta propiedad pero no está inicializada, ojo al JavaScript
  producto: ProductoDescripcion;
  idProducto: string;

  constructor( private route: ActivatedRoute,
               public productoService: ProductosService) { }

  ngOnInit() {

    this.route.params
    .subscribe( parametros => {

      // console.log(parametros['id']);

      this.productoService.getProducto(parametros['id'])
            .subscribe( (producto: ProductoDescripcion) => {
              this.producto = producto;
              this.idProducto = parametros['id'];
              // console.log(producto);
            });
    });
  }

}
