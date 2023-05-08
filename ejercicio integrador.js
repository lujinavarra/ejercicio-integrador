/*
En el archivo tarea2.js podemos encontrar un código de un supermercado que vende productos.
El código contiene 
    - una clase Producto que representa un producto que vende el super
    - una clase Carrito que representa el carrito de compras de un cliente
    - una clase ProductoEnCarrito que representa un producto que se agrego al carrito
    - una función findProductBySku que simula una base de datos y busca un producto por su sku
El código tiene errores y varias cosas para mejorar / agregar
​
Ejercicios
1) Arreglar errores existentes en el código
    a) Al ejecutar agregarProducto 2 veces con los mismos valores debería agregar 1 solo producto con la suma de las cantidades.    
    b) Al ejecutar agregarProducto debería actualizar la lista de categorías solamente si la categoría no estaba en la lista.
    c) Si intento agregar un producto que no existe debería mostrar un mensaje de error.
​
2) Agregar la función eliminarProducto a la clase Carrito
    a) La función eliminarProducto recibe un sku y una cantidad (debe devolver una promesa)
    b) Si la cantidad es menor a la cantidad de ese producto en el carrito, se debe restar esa cantidad al producto
    c) Si la cantidad es mayor o igual a la cantidad de ese producto en el carrito, se debe eliminar el producto del carrito
    d) Si el producto no existe en el carrito, se debe mostrar un mensaje de error
    e) La función debe retornar una promesa
​
3) Utilizar la función eliminarProducto utilizando .then() y .catch()
​
*/


// Cada producto que vende el super es creado con esta clase
class Producto {
    //Dejamos comentado lo que no usamos
    // sku;            // Identificador único del producto
    // nombre;         // Su nombre
    // categoria;      // Categoría a la que pertenece este producto
    // precio;         // Su precio
    // stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;

        // Si no me definen stock, pongo 10 por default
        if (stock) {
            this.stock = stock;
        } else {
            this.stock = 10;
        }
    }

}


// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];



// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra
    // Al crear un carrito, empieza vacio
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias =[]; 
    }
    
   
    //Valido si el sku ya fue cargado al carrito y actualizo la cantidad 
    validarProducto(sku, cantidad){
        for(let i = 0; i<this.productos.length;i++){
            if(this.productos[i].sku === sku){
                this.productos[i].cantidad = this.productos[i].cantidad +  cantidad;
                return true;
            }
        }
    }
    
     /**
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */

    //async agregarProducto(sku, cantidad) {
    agregarProducto(sku, cantidad) {
    
        console.log(`Agregando ${cantidad} ${sku}`);
    
    // Busco el producto en la "base de datos     
    //const producto = await findProductBySku(sku);
    const promesaEncontrarProducto =  findProductBySku(sku);
    promesaEncontrarProducto
        .then((producto) =>{
            console.log("Producto encontrado", producto);
    
            //Creo un producto nuevo en caso de que no este agragado, caso contrario solo se actualiza la cantidad
            
        if(!this.validarProducto(sku, cantidad)){
            const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad)
            this.productos.push(nuevoProducto);
            this.precioTotal = this.precioTotal + (producto.precio * cantidad);
            this.cantidad = this.cantidad + cantidad
            if(!this.categorias.includes(producto.categoria)){
                this.categorias.push(producto.categoria);
            }
                
        } else{
            console.log(`El producto ${sku} ya fue cargado`)
                
        }
            //muestro los productos en el carrito
        for(let i =0; i<this.productos.length;i++){
            console.log(`Producto: ${this.productos[i].nombre} Cantidad: ${this.productos[i].cantidad}`)
        }   
      }).catch((producto)=>{
            console.log(producto)
        });
    }

    eliminarProducto (sku, cantidad){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let resultado;
                for(let i = 0; i<this.productos.length;i++){
                    if(this.productos[i].sku === sku && cantidad < this.productos[i].cantidad){
                        resultado = `Cantidad Actualizada de ${sku} es: ${ this.productos[i].cantidad - cantidad}`;
                    }else if (this.productos[i].sku === sku && cantidad >= this.productos[i].cantidad){
                        resultado =this.productos.splice(i, 1);
                        console.log("Productos actuales en carrito")
                        console.log(this.productos);
                        console.log("Producto eliminado:")
                        
                    }
                }
                if (resultado){
                    resolve (resultado)
                }else{
                    reject("Producto no encontrado")
                }
            }, 0);
        })
    }
   
}

// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito
    constructor(sku, nombre, cantidad) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
        
    }

}

// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                reject(`Product ${sku} not found`);
            }
        }, 0);
    });
}

const carrito = new Carrito();
carrito.agregarProducto('WE328NJ',4);
carrito.agregarProducto('XX92LKI',3);
carrito.agregarProducto('OL883YE',2);
carrito.agregarProducto('WE328N',2);// este no existe en BD
carrito.agregarProducto('PV332MJ',1);
carrito.agregarProducto('OL883YE',1);//producto ya cargado en el carrito
carrito.agregarProducto('FN312PPE',3);

//Probamos para eliminar producto, actualizar cantidad y/ informar que el producto no existe
const resultadoPromesaEliminarProducto = carrito.eliminarProducto('FN312PPE',1);
resultadoPromesaEliminarProducto
    .then((resultado)=>{
        console.log(resultado)
  }).catch((resultado)=>{
    console.log(resultado)
}).finally(()=>{
    console.log("Compra finalizada con exito!!")
})
// Trabajo realizado por los alumnos: 
//María Luján Navarra Morero
//Leandro Hernán Ibarra


