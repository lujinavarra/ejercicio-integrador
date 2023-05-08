// clase para los productos para vender
class ProductoParaVender {
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

//genero los productos
const queso = new ProductoParaVender('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new ProductoParaVender('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new ProductoParaVender('PV332MJ', 'Cerveza', 20, 'bebidas');

// listado de productos
const productosDelSuper = [queso, gaseosa, cerveza];
//con esto accedo a los atributos de los productos
//console.log(productosDelSuper[2]);
//con el for se puede recorrer el array y poder acceder
// for (let i= 0; i< productosDelSuper.length; i++) {
//     console.log(productosDelSuper[i].sku);
// }

//molde para el carrito
class Carrito {
    constructor(precioTotal, productos, categorias) {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }
}
function buscarProducto (sku){
    const productoEncontrado = productosDelSuper.find(producto => producto.sku === sku);
    if (productoEncontrado){
        console.log(productoEncontrado);
    }else {
        console.log("producto no encontrado");
    }
}

function agregarProducto (sku, cantidad){
    //ejecuto la funcion de buscar en la base de datos
    const productoAAgregar = buscarProducto(sku);
    console.log(`Producto encontrado: ${productoAAgregar}`);

    //si el producto existe hay que crear el producto a comprar para agregarlo al carrito
    const productoNuevoEnCarrito = new ProductoParaComprar(sku, productoAAgregar.nombre, cantidad);

}





//molde para el producto en carrito
class ProductoParaComprar {
    constructor(sku, nombre, cantidad) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;  
        }
}
// const carrito1 = new Carrito (20, "Cerveza", "bebidas");
// console.log(carrito1);

// console.log(carrito1);
//const prod2= new ProductoParaComprar("sdgh", "jabon", 2);
//console.log(prod2);

