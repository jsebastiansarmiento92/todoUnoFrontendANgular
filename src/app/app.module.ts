import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// módulos para el cliente http y los formularios

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//importacion de componenentes para el app module
import {HomeComponent}from './home/home.component';
import {ListaProductComponent} from './products/lista-product/lista-product.component';
import { DetalleProductoComponent } from './products/detalle-producto/detalle-producto.component';
import { NuevoProductoComponent } from './products/nuevo-producto/nuevo-producto.component';
import { EditarProductoComponent } from './products/editar-producto/editar-producto.component';
import { LoginComponent } from './auth/login/login.component';
//importar interceptor el cual verifica si hay token y lo envia con el request al servicio rest
import { interceptorProvider } from './interceptors/producto-interceptor.service';
import { UserComponent } from './users/user/user.component';
import { AdminComponent } from './users/admin/admin.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { IngresosComponent } from './ingresos/lista-ingresos/ingresos.component';
import { NuevoIngresoComponent } from './ingresos/nuevo-ingreso/nuevo-ingreso.component';
import { CompraComponent } from './products/compra/compra.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaProductComponent,
    DetalleProductoComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    RegistroComponent,
    IngresosComponent,
    NuevoIngresoComponent,
    CompraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
