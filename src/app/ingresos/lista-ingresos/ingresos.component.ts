import { Component, OnInit,Input } from '@angular/core';
import { Ingreso } from 'src/app/models/ingreso.model';
import { IngresoService } from 'src/app/services/ingreso.service';
import {ProductService}from '../../services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {
  @Input() user: string;
  ingresos:Ingreso[]=[];
  



  constructor(private ingresoService: IngresoService,private productService:ProductService) { }
  //-----------------------------------------------------------

  ngOnInit() {
    this.cargarProductos();
    console.log(this.ingresos);
  }
  //-----------------------------------------------------------


  cargarProductos(): void {
    this.ingresoService.lista().subscribe(data => {
      this.ingresos = data;
      
    },
      (err: any) => {
        console.log(err);
      }
    );
    
  }
  //-----------------------------------------------------------
  getNombreMotivoingreso(id:number):string{
    let product:Product=null;
    this.productService.detalle(id).subscribe(data=>{
     product=data;
    })
    return ;
  }




}
