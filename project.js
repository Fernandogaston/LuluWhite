//JQuery-DOM

$('#ofertas').append("<div><h3 class = 'promo parpadea'><br>BLACK FRIDAY HASTA 15% OFF!! + 12 CUOTAS SIN INTERES<br></h3></div>");

//Eventos y efectos con JQuery

$('#boton1').prepend('<button class="btn btn-danger botonEnviar">SALE !!</button>');
$('#boton1').css({"display": "flex",
                  "flex-direction": "row",
                  "justify-content": "center",
                  "padding-bottom": "10px",
                  "background-color": "pink"})
            .slideUp(2000)
            .slideDown(2000)

$("#boton1").click(function () {
  $('#boton1').toggle(1000);
  $('.imgDescuentos').fadeIn("fast");
  $('.imgDescuentos').animate({
    height: "350px",
  })
});

document.getElementById("inputName").placeholder =
  "Introduce tu nombre y apellido";
document.getElementById("inputMail").placeholder =
  "A ésta casilla enviaremos el detalle de tu compra";

//Arrays

let productos = [
  { id: 1, 
    nombre: "Cartera", 
    precio: 3500, 
    imagen: "./img/bandolera.jpg", 
  },
  
  { id: 2, 
    nombre: "Matera", 
    precio: 3000, 
    imagen: "./img/mochimatera.jpg",
  },
  
  { id: 3, 
    nombre: "Mochila", 
    precio: 3500, 
    imagen: "./img/veraanimal.jpg", 
  },
  
  {
    id: 4,
    nombre: "Porta Cosméticos",
    precio: 1800,
    imagen: "./img/portacosmeticos.jpg",
  },

  {
    id: 5,
    nombre: "Mochila Rita Suela",
    precio: 4000,
    imagen: "./img/Mochila Rita suela.jpg",
  },

  {
    id: 6,
    nombre: "Mochila Fanny Fucsia",
    precio: 4000,
    imagen: "./img/Mochila Fanny Fucsia.jpg",
  },

  {
    id: 7,
    nombre: "Matera Lola",
    precio: 4500,
    imagen: "./img/materalola.jpg",
  },

  {
    id: 8,
    nombre: "Matera Ingrid Fucsia",
    precio: 1800,
    imagen: "./img/Matera Ingrid Fucsia.jpg",
  },

];

//Capturo contenedor del HTML y lo almaceno en variale contenido.
//Creo un elemento div que contiene las imágenes, nombres y precios recorriendo el array con un forEach
//Se inserta en el HTML usando DOM y se agrega al hijo dentro de la variable contenido. 
//Se genera un evento onClick para que el usuario al hacer click nos devuelva un console.log

const contenedor = document.getElementById("container");
contenedor.innerHTML = "";

productos.forEach((producto, indice) => {
  let card = document.createElement("div");
  card.classList.add("card", "col-sm-12", "col-lg-3");
  let html = `
    <img src="${producto.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">$${producto.precio}</p>
      <a href="#cart" class="btn btn-secondary" onClick="abrirCarrito(${indice})">Comprar</a>
    </div>
      `;
  card.innerHTML = html;
  contenedor.appendChild(card);
});

const cart = [];

const abrirCarrito = (indice) => {
  const indiceEncontradoCarrito = cart.findIndex((elemento) => {
    return elemento.id === productos[indice].id;
  });
  if (indiceEncontradoCarrito === -1) {
    const productoAgregar = productos[indice];
    productoAgregar.cantidad = 1;
    cart.push(productoAgregar);
    actualizarCarrito();
  } else {
    cart[indiceEncontradoCarrito].cantidad += 1;
    actualizarCarrito();
  }
};

let modalCarrito = document.getElementById("cart");

const actualizarCarrito = () => {
  let total = 0;
  modalCarrito.className = "cart";
  modalCarrito.innerHTML = "";
  if (cart.length > 0) {
    cart.forEach((producto, indice) => {
      total = total + producto.precio * producto.cantidad;
      const carritoContainer = document.createElement("div");
      carritoContainer.className = "producto-carrito";
      carritoContainer.innerHTML = `
        <img class="car-img" src="${producto.imagen}"/>
        <div class="product-detalle">
          ${producto.nombre}
        </div>
        <div class="product-detalle" > Cantidad: ${producto.cantidad}</div>
        <div class="product-detalle"> Precio: $ ${producto.precio}</div>
        <div class="product-detalle"> Subtotal: $ ${
          producto.precio * producto.cantidad
        }</div>
        <button class="btn btn-danger"  id="remove-product" onClick="removeProduct(${indice})">Eliminar</button>
         `;
      modalCarrito.appendChild(carritoContainer);
    });
    const totalContainer = document.createElement("div");
    totalContainer.className = "total-carrito";
    totalContainer.innerHTML = `<div class= "total"> TOTAL $ ${total}</div>
    <button class= "btn btn-secondary finalizar" id="finalizar" onClick="finalizarCompra()"> FINALIZAR COMPRA </button>`;
    modalCarrito.appendChild(totalContainer);
  } else {
    modalCarrito.classList.remove("cart");
  }
};

const removeProduct = (indice) => {
  cart.splice(indice, 1);
  actualizarCarrito();
};

const finalizarCompra = () => {
  const total = document.getElementsByClassName("total")[0].innerHTML;
  modalCarrito.innerHTML = "";
  const compraFinalizada = 
  `<div class="finalizarCompra">
  <button class="btn btn-danger finalizarCompraDos" id="formulario" onClick="apareceForm()"> Complete el formulario para enviarle su compra</button>
  </div>`;
  modalCarrito.innerHTML = compraFinalizada;
};

const apareceForm = () => {
  modalCarrito.innterHTML = "";
  const formulario = `
  <section class="form-container" id="ocultar">
  <form id="datos" class="col-sm-5">
    <div class="form-group col-sm-5">
      <label for="inputName">Nombre y Apellido</label>
      <input type="text" class="form-control" id="inputName" name="inputName"
        placeholder="Introduzca su Nombre y Apellido">
    </div>
    <div class="form-group col-sm-5">
      <label for="inputMail">e-mail</label>
      <input type="text" class="form-control" id="inputMail" name="inputMail" placeholder="Introduzca su e-mail">
    </div>
    <div class="form-group col-sm-5">
      <label for="inputAddress">Dirección</label>
      <input type="text" class="form-control" id="inputAddress" name="inputAddress" placeholder="A ésta dirección enviaremos los productos">
    </div>
    <div class="form-group col-sm-5">
      <label for="inputTelphone">Teléfono</label>
      <input type="text" class="form-control" id="inputTelphone" name="inputTelphone">
    </div>
    <button class="btn btn-secondary botonEnviar" onclick="cargaFormulario()">Enviar</button>
  </form>
</section>
  `;
  modalCarrito.innerHTML = formulario;
};

//DOM con funciónes para capturar los elementos en un formulario.

$(function() { 
  $('#ocultar').hide();
});

class Persona {
  constructor(apellido, email, direccion, telefono) {
    this.nombre = apellido;
    this.email = email;
    this.direccion = direccion;
    this.telefono = telefono;
  }
}

function cargaFormulario() {
  let apellido = document.getElementById("inputName").value;
  let email = document.getElementById("inputMail").value;
  let direccion = document.getElementById("inputAddress").value;
  let telefono = document.getElementById("inputTelphone").value;
  let formulando = new Persona(apellido, email, direccion, telefono);
  console.log(formulando);
  visualizarCliente(formulando);
}

// Eliminando formulario para visualizar mensaje de compra.

function visualizarCliente(persona) {
  let planilla = document.getElementById("datos");
  modalCarrito.innerHTML = "";
  let mensajeFinal = `<strong class="message">${persona.nombre}, gracias por tu compra. 
  Por favor verifica tu mail ${persona.email} 
  con el detalle de la misma. 
  El/los productos serán enviados a  
  ${persona.direccion} en las próximas 48hs. </strong>`;
  modalCarrito.innerHTML = mensajeFinal;
}

//JSON y almacenamiento en localStorage y parseo.

const myDataJson = JSON.stringify(productos);
localStorage.setItem("productos", myDataJson);
localStorage.getItem("productos");
console.log(typeof productos);
console.log(typeof myDataJson);
console.log(localStorage);

const myDataJson2 = JSON.parse(localStorage.getItem("productos"));
console.log(typeof myDataJson2);
console.log(myDataJson2);

//AJAX - Petición a servidor local (live server)

const URL_LOCAL = 'redes.json'

$.getJSON(URL_LOCAL, (respuesta, estado) => {
  if (estado === 'success') {
    console.log (respuesta);
    respuesta.social.forEach( sitios => {
      console.log(sitios.nombre);
      $('#redes').append(`<a target="_blank" href="${sitios.url}"><img height="40px" src="${sitios.imagen}"></a>`)
    });
  }
})