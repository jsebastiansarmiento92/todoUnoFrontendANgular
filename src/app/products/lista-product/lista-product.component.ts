import { Component, OnInit,Input  } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-lista-product',
  templateUrl: './lista-product.component.html',
  styleUrls: ['./lista-product.component.css']
})
  //-----------------------------------------------------------
export class ListaProductComponent implements OnInit {
  @Input() user: string;
  productos: Product[] = [];
  
  constructor(private productoService: ProductService) { }
  //-----------------------------------------------------------
  ngOnInit() {
    this.cargarProductos();
    
  }
  //-----------------------------------------------------------

  cargarProductos(): void {
    this.productoService.lista().subscribe(data => {
      this.productos = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }
    //-----------------------------------------------------------
  onDelete(id: number): void {
    if (confirm('¿Estás seguro?')) {
      this.productoService.borrar(id).subscribe(data => {
        this.cargarProductos();
      });
    }
  }


  
}
