import { Component, OnInit } from '@angular/core';
import {Ingreso} from '../../models/ingreso.model';
import { Product } from '../../models/product';
import {IngresoService} from '../../services/ingreso.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-nuevo-ingreso',
  templateUrl: './nuevo-ingreso.component.html',
  styleUrls: ['./nuevo-ingreso.component.css']
})
 //-----------------------------------------------------------
export class NuevoIngresoComponent implements OnInit {

  form: any = {};
  producto: Product;
  creado = false;
  failProducto = false;
  mensajeFail = '';
  mensajeOK = '';
  productos:Product [] = [];
  idProductoIngreso:string;

  actualizado = false;
  failActualizado = false;
  msjErr = '';
  msjOK = '';
  failInit = false;
   //-----------------------------------------------------------
  constructor(private ingresoService:IngresoService,private productService:ProductService) { }
  

  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';

  ngOnInit() {
    this.cargarProducts();
   
  }


  onCreate(): void {
   // this.form.image_product=this.verSeleccion;
  //  this.form.type_product=this.verSeleccion;
  //    this.form.idProductIdIngreso=this.productService.detalle().subscribe;
  //  this.form.stock=0;
    
    this.productService.getProductNombre(this.verSeleccion).subscribe(data=>{
      
    //  this.form.idProductIdIngreso=data.id_product;
     // localStorage.setItem('id', JSON.stringify(data.id_product));
      var producto1:Product=data;
      producto1.stock=data.stock+this.form.cantidadStockProducto;
      this.form.idProductIdIngreso=data.id_product;
      console.log("stock a agregar"+producto1.stock+" al id de producto "+data.id_product);
      this.productService.editar(producto1,data.id_product).subscribe(data=>{
        this.actualizado = true;
      this.failActualizado = false;
      this.msjOK = data.mensaje;
      },
      (err: any) => {
        this.actualizado = false;
        this.failActualizado = true;
        this.msjErr = err.error.mensaje;
      }
      );
      this.ingresoService.crear(this.form).subscribe(data => {
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



    });
    var guardado = localStorage.getItem('id');
    console.log("dato extraido del servidor "+guardado);

    

    
  }


  cargarProducts(): void {
    
    this.productService.lista().subscribe(data => {
      this.productos = data;
     // localStorage.setItem('datos', JSON.stringify(this.productos));
      
    },
      (err: any) => {
        console.log(err);
      }
    );
    //console.log(this.tipoProductos);
    //console.log(this.products);
   // var guardado = localStorage.getItem('datos');
  //  console.log(guardado);
  }

  volver(): void {
    window.history.back();
  }


  capturar() {

    this.verSeleccion = this.opcionSeleccionado;
   

  }

  cleanForm(){
    this.form.name_product="";
    this.form.price_product="";
    this.form.info_product="";
    this.form.stock="";
    this.form.image_product="";
    this.form.cost_product="";
  }
}
