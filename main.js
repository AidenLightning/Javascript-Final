let carrito = [];

//Carga de Carrito desde el Storage

let carrito2 = JSON.parse(localStorage.getItem("carritocloud"));

if(carrito2 === null){

}else{
    carrito = carrito2;
    for(let producto of carrito){
        document.getElementById("tablabody").innerHTML += `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>$ ${producto.precio}</td>
            </tr>
        `;
        let totalCarrito = carrito.reduce((acumulador,prod)=>acumulador+prod.precio,0);
        document.getElementById("total").innerText = "Total a pagar $: "+totalCarrito +" USD";
    }
}

//Creacion de Cards de Productos

let contenedor = document.getElementById("misproducts");

function creaProducards(){
    for(const producto of productos){
        contenedor.innerHTML += `
            <div class="card col-sm-6 col-md-4" data-aos="flip-left">
                <img class="card-img-top" src="${producto.foto}" alt="Card image">
                <div class="card-body">
                    <h4 class="card-title">${producto.nombre}</h4>
                    <p class="card-text">${producto.descripcion}</p>
                    <h5 class="card-text">$ ${producto.precio} USD</h5>
                    <button id="btn${producto.id}" class="btn btn-primary">Comprar</a>
                </div>
            </div>
        `;
    }
    productos.forEach((producto)=>{
        document.getElementById(`btn${producto.id}`).addEventListener("click",function(){
            agregarAlCarrito(producto);
        });
    });
}

creaProducards();

//Funcion de Agragar a Carrito, local y en Storage y mostrarlo en HTML

function agregarAlCarrito(productoAComprar){
    carrito.push(productoAComprar);
    let carritoJson = JSON.stringify(carrito);
    localStorage.setItem("carritocloud", carritoJson);
    Swal.fire({
        title: `${productoAComprar.nombre}`,
        text: 'Agregado al Carrito 🎉',
        imageUrl: `${productoAComprar.foto}`,
        imageAlt: 'Producto',
      })
    document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${productoAComprar.id}</td>
            <td>${productoAComprar.nombre}</td>
            <td>$ ${productoAComprar.precio}</td>
        </tr>
    `;
    let totalCarrito = carrito.reduce((acumulador,prod)=>acumulador+prod.precio,0);
    document.getElementById("total").innerText = "Total a pagar $: "+totalCarrito +" USD";
}

//Borrar Carrito

let resetB = document.getElementById("resetB");
resetB.onclick = () => {
    let totalCarrito = carrito.reduce((acumulador,prod)=>acumulador+prod.precio,0);
    if(totalCarrito === 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Carrito Vacio !',
          })
    }else{
    Swal.fire({
        title: 'Estas Seguro?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borralo!'
      }).then((result) => {
        if (result.isConfirmed) {
            carrito=[];
            localStorage.clear();
            document.getElementById("tablabody").innerHTML = ``;
            document.getElementById("total").innerText = "Total a pagar $:";
          Swal.fire(
            'Borrado!',
            'Tu carrito se ha borrado.',
            'success'
          )
        }
      })
    }
}

//Finalizar Compra

let compraB = document.getElementById("compraB");
compraB.onclick = () => {
    let totalCarrito = carrito.reduce((acumulador,prod)=>acumulador+prod.precio,0);
    if(totalCarrito === 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Carrito Vacio !',
          })
    }else{
    Swal.fire({
        title: 'Seguro de finalizar la compra?',
        text: `Su total es de $ ${totalCarrito} USD`,
        imageUrl: './media/StackOAmps.jpg',
        imageWidth: 400,
        imageHeight: 200,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Comprar !'
      }).then((result) => {
        if (result.isConfirmed) {
            carrito=[];
            localStorage.clear();
            document.getElementById("tablabody").innerHTML = ``;
            document.getElementById("total").innerText = "Total a pagar $:";
          Swal.fire(
            '🎉 Gracias por tu compra 🎉',
            'Tu pedido ha sido confirmado',
            'success'
          )
        }
      })
    }
}

// Tipo de Cambio USD a MXN desde Banxico API

function obtenerDatos(){
    const URLGET="https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?mediaType=json&token=bd2d6071112e329b61b9cda2742acbb069416297fe94144c6ff7106a285ef56d#";
    fetch(URLGET)
        .then(resultado => resultado.json())
        .then(data => {
            tituloDolar=data.bmx.series[0].titulo;
            fechaDolar=data.bmx.series[0].datos[0].fecha;
            cambioDolar=data.bmx.series[0].datos[0].dato;
            document.getElementById("cambioDolar").innerHTML += `
                <h4>${tituloDolar}</h4>
                <br>
                <h4>Fecha de cosulta de cambio ${fechaDolar}</h4>
                <br>
                <h4>El tipo de cambio al dia de hoy es de ${cambioDolar} MXN por USD</h4>
                <br>
        `;
        });
}
obtenerDatos();

//API Frase del dia Breaking Bad

function obtenerFrase(){
    const URLGET="https://breaking-bad-quotes.herokuapp.com/v1/quotes";
    fetch(URLGET)
        .then(resultado => resultado.json())
        .then(data => {
            fraseBB=data[0].quote;
            authorBB=data[0].author;
            document.getElementById("frasebb").innerHTML += `
            <h5>${fraseBB}</h5>
            <br>
            <h5>${authorBB}</h5>
            <br>
        `;
        });
}
obtenerFrase();
