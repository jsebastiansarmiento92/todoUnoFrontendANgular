import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeProducts } from 'src/app/models/typeProducts';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  form: any = {};
  actualizado = false;
  failActualizado = false;
  msjErr = '';
  msjOK = '';
  failInit = false;
  valueDefecto:string;
  tipoProductos:TypeProducts [] = [];
  verSeleccion: string        = '';
  opcionSeleccionado: string  = '0';
  constructor(private productoService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.detalle(id).subscribe( data => {
      this.form.name_product = data.name_product;
      this.form.price_product = data.price_product;
      this.form.info_product = data.info_product;
      this.form.stock = data.stock;
      this.form.type_product = data.type_product;
      this.form.image_product = data.image_product;
      this.form.cost_product = data.cost_product;
      this.valueDefecto=data.type_product;
    },
      (err: any) => {
        this.failInit = true;
        this.router.navigate(['']);
      }
    );


    this.cargarTypeProducts();
  }


  capturar() {

    this.verSeleccion = this.opcionSeleccionado;

  }
  agregarImagen(){
    alert("accion no disponible");
  }
  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    console.log("datos del formulario costo "+this.form.cost_product)
    this.form.type_product=this.verSeleccion;
    console.log("datos del formulario tipo "+this.form.type_product)
    
    this.productoService.editar(this.form, id).subscribe( data => {
      this.actualizado = true;
      this.failActualizado = false;
      this.msjOK = data.mensaje;
      console.log(data.mensaje)
    },
    (err: any) => {
      this.actualizado = false;
      this.failActualizado = true;
      this.msjErr = err.error.mensaje;
      console.log(err.error.mensaje)
    }
    );
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



  
}
