import { Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent {

  datos!: string;
  products: any = []
  updating: boolean = false
  update!: number
  subTotal: number = 0
  totalIva: number = 0
  valor!: number
  cant!: number

  codigo = ''
  nombre = ''
  precio = ''
  cantidad = ''
  descripcion = ''

  formularioProducto = new FormGroup({
    codigo: new FormControl(''),
    nombre: new FormControl(''),
    precio: new FormControl(''),
    cantidad: new FormControl(''),
    descripcion: new FormControl('')

  })

  public Agregar() {

    this.products.push({
      codigo: this.formularioProducto.value.codigo,
      nombre: this.formularioProducto.value.nombre,
      precio: this.formularioProducto.value.precio,
      cantidad: this.formularioProducto.value.cantidad,
      descripcion: this.formularioProducto.value.descripcion

    });

    this.valor=parseInt(this.formularioProducto.value.precio)
    this.cant=parseInt(this.formularioProducto.value.cantidad)

    this.totalIva= this.totalIva + (this.valor*this.cant*1.19)
    console.log("Total Iva: "+ this.totalIva);
    console.log(this.products);
  }

  public borrar() {

    this.products.pop({
      codigo: this.formularioProducto.value.codigo,
      nombre:  this.formularioProducto.value.nombre,
      precio: this.formularioProducto.value.precio,
      cantidad: this.formularioProducto.value.cantidad,
      descripcion: this.formularioProducto.value.descripcion

    });
    console.log(this.products);
  }

  public clean(){
    this.formularioProducto.setValue({codigo: null, nombre: null, precio: null, cantidad: null, descripcion: null})
  }

  public actualizar() {

    if (this.updating){
      this.products[this.update] = {
        codigo: this.formularioProducto.value.codigo,
        nombre:  this.formularioProducto.value.nombre,
        precio: this.formularioProducto.value.precio,
        cantidad: this.formularioProducto.value.cantidad,
        descripcion: this.formularioProducto.value.descripcion
      };
    } else {
      this.products.push({
        codigo: this.formularioProducto.value.codigo,
        nombre: this.formularioProducto.value.nombre,
        precio: this.formularioProducto.value.precio,
        cantidad: this.formularioProducto.value.cantidad,
        descripcion: this.formularioProducto.value.descripcion

      });
    }
    this.clean()
    this.updating = false
    console.log(this.products);
  }

  public editar(index:number){
    this.formularioProducto.setValue(this.products[index])
    this.updating = true
    this.update = index
  }

}
