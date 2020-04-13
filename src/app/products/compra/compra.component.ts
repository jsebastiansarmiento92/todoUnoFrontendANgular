import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {SalidaService} from '../../services/salida.service';
import { Salida } from 'src/app/models/salida.model';



@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})

export class CompraComponent implements OnInit {
  producto: Product = null;
  cantidad:number=0;
  creado = false;
  failProducto = false;
  mensajeFail = '';
  mensajeOK = '';
  salida:Salida=new Salida();
  constructor(private productoService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private salidaService:SalidaService
    ) { }


  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.detalle(id).subscribe(data => {
      this.producto = data; },
      err => {
        this.router.navigate(['']);
      }
    );
   //console.log(this.producto);
  }
  volver(): void {
    window.history.back();
  }
  comprar(){
    if((this.producto.stock-this.cantidad)<0){
      alert("no hay suficiente en stock");
      return;
    }if(this.cantidad==0){
      alert("no se puede realziar venta con cantidad 0");
    }else{
     
     this.salida.idProductIdSalida=this.producto.id_product;
     this.salida.cantidadSalida=this.cantidad*this.producto.price_product;
      this.salidaService.crear(this.salida).subscribe(data=>{
        this.mensajeOK = data.mensaje;
      this.creado = true;
      this.failProducto = false;
     // alert("total compra $"+this.cantidad*this.producto.price_product);
      },
      (err: any) => {
        this.mensajeFail = err.error.mensaje;
        console.log(err.error);
        this.creado = false;
        this.failProducto = true;
      });
      this.productoService.detalle(this.producto.id_product).subscribe(data=>{
        var producto1:Product=data;
      producto1.stock=data.stock-this.cantidad;
    
      console.log("stock a agregar"+producto1.stock+" al id de producto "+data.id_product);
      this.productoService.editar(producto1,data.id_product).subscribe(data=>{
        alert("stock actualizado")
      },
      (err: any) => {
        console.log(err)
      }
      );
      })
    }
    this.router.navigate(['home']);
  }
}
