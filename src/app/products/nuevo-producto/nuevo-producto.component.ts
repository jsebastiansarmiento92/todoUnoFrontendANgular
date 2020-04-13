import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { TypeProducts } from 'src/app/models/typeProducts';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {
  form: any = {};
  producto: Product;
  creado = false;
  failProducto = false;
  mensajeFail = '';
  mensajeOK = '';

  constructor(private productoService: ProductService) { }

  tipoProductos:TypeProducts [] = [];
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';
  ngOnInit() {
    this.cargarTypeProducts();
  }
  onCreate(): void {
    this.form.image_product=this.verSeleccion;
    this.form.type_product=this.verSeleccion;
    this.form.stock=0;
    this.productoService.crear(this.form).subscribe(data => {
      this.mensajeOK = data.mensaje;
      this.creado = true;
      this.failProducto = false;
    },
      (err: any) => {
        this.mensajeFail = err.error.mensaje;
        console.log(err.error);
        this.creado = false;
        this.failProducto = true;
      }
    );
  // this.form.reset();
    this.cleanForm();
  }
    cleanForm(){
      this.form.name_product="";
      this.form.price_product="";
      this.form.info_product="";
      this.form.stock="";
      this.form.image_product="";
      this.form.cost_product="";
    }
  capturar() {

    this.verSeleccion = this.opcionSeleccionado;

  }
  volver(): void {
    window.history.back();
  }



  cargarTypeProducts(): void {
    this.productoService.listaTypeProducts().subscribe(data => {
      this.tipoProductos = data;
      //console.log(this.tipoProductos);
    },
      (err: any) => {
        console.log(err);
      }
    );
    //console.log(this.tipoProductos);
  }
  agregarImagen(){
    alert("accion no disponible");
  }
}
