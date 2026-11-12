// =========================================================================
// 1. MODELO DE DATOS Y CATÁLOGO
// =========================================================================

// Diseña aquí el modelo de la armería. Puedes elegir el nombre de la clase,
// organizar los datos como prefieras y añadir propiedades o comportamientos.
// El resto de la aplicación necesita poder leer estos datos de cada producto:
// nombre, imagen, precioEntero, precioOriginal, rareza, tipo y bonus.
// También necesitará una forma de formatear precios, aplicar el efecto de una
// compra y obtener una copia rebajada sin modificar el producto original.



//La clase objetoArmeria.js

class ObjetoArmeria {
  
    constructor(nombre, imagen, precioEntero, precioOriginal, rareza, tipo, bonus) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.precioEntero = precioEntero;
    this.precioOriginal = precioOriginal;
    this.rareza = rareza;
    this.tipo = tipo;
    this.bonus = bonus;
  }

    getPrecioFormateado(precio = this.precioEntero) {
  return (precio / 100).toFixed(2) + ' €'; 
}

aplicarCompra(jugador) {
  
  /*
  if (this.tipo === "Arma") {
    jugador.ataque += this.bonus;
  } else if (this.tipo === "Armadura") {
    jugador.defensa += this.bonus;
  } else if (this.tipo === "Consumible") {
    jugador.vida += this.bonus;
  }
*/

    
    
    let estadoExito=true;
    let mensaje="";
    
  if ((jugador.oroCentimos - this.precioEntero) < 0){
    estadoExito=false;
    console.log(`Compra denegada, creditos insuficientes.`);
    console.log(`No puedes comprar ${this.nombre} que vale ${this.precioEntero} por ${jugador.oroCentimos}.`);
    
mensaje = `Compra denegada, créditos insuficientes. No puedes comprar ${this.nombre} que vale ${this.getPrecioFormateado()} por${(jugador.oroCentimos / 100).toFixed(2)} €.`;    
    
mostrarNotificacion(mensaje,estadoExito);

  }else{

    if (this.tipo === "Arma") {
      mensaje=`Has comprado ${this.nombre} por ${this.precioEntero}. ¡Bonus de ataque! + ${this.bonus}!`;
      console.log(mensaje);
      mostrarNotificacion(mensaje, estadoExito);
      jugador.ataque += this.bonus;


    } else if (this.tipo === "Armadura") {

      mensaje=`Has comprado ${this.nombre} por ${this.precioEntero}. ¡Bonus de defensa! + ${this.bonus}!`;
      console.log(mensaje);
      mostrarNotificacion(mensaje, estadoExito);
      jugador.defensa += this.bonus;


    } else if (this.tipo === "Consumible") {
      mensaje=`Has comprado ${this.nombre} por ${this.precioEntero}. ¡Bonus de vida! + ${this.bonus}!`;
      console.log(mensaje);
      mostrarNotificacion(mensaje, estadoExito);
      jugador.vida += this.bonus;

        if(jugador.vida > 1500 ){
        console.log("Vida al limite")
        jugador.vida= 1500;
      }


    }

    jugador.oroCentimos= jugador.oroCentimos - this.precioEntero;

    renderizarJugador(); //Para actualizar html
    }
  

  }

  obtenerCopiaRebajada(porcentajeDescuento) {
    const descuento = this.precioOriginal * (porcentajeDescuento / 100);
    const nuevoPrecio = this.precioOriginal - descuento;
    
    return new ObjetoArmeria(
      this.nombre, 
      this.imagen, 
      nuevoPrecio, 
      this.precioOriginal,
      this.rareza, 
      this.tipo, 
      this.bonus
    );
  }
}

// =========================================================================
// 2. MERCADO Y CATALOGO PREDEFINIDO
// =========================================================================

// Estos objetos son solo los datos iniciales. Decide cómo convertirlos en las
// instancias de tu modelo y guarda el resultado en productosIniciales.
const datosIniciales = [
  {
    nombre: "Espada de Hierro",
    imagen: "https://images.unsplash.com/photo-1440711085503-89d8ec455791?q=80&w=1098&auto=format&fit=crop",
    precioEntero: 1500, rareza: "Común", tipo: "Arma", bonus: 25
  },
  {
    nombre: "Escudo Antiguo",
    imagen: "https://images.unsplash.com/photo-1778940454592-f9e9595ade99?q=80&w=687&auto=format&fit=crop",
    precioEntero: 2000, rareza: "Común", tipo: "Armadura", bonus: 15
  },
  {
    nombre: "Poción de Vida",
    imagen: "https://images.unsplash.com/photo-1610706936277-f01646bb90c6?q=80&w=687&auto=format&fit=crop",
    precioEntero: 500, rareza: "Común", tipo: "Consumible", bonus: 200
  },
  {
    nombre: "Mandoble Rúnico",
    imagen: "https://images.unsplash.com/photo-1594399430386-913fd5defaa4?q=80&w=1170&auto=format&fit=crop",
    precioEntero: 4500, rareza: "Rara", tipo: "Arma", bonus: 60
  },
  {
    nombre: "Coraza Solar",
    imagen: "https://images.unsplash.com/photo-1664998064103-4075dad55a79?q=80&w=687&auto=format&fit=crop",
    precioEntero: 6000, rareza: "Legendaria", tipo: "Armadura", bonus: 80
  },
  {
    nombre: "Elixir Ancestral",
    imagen: "https://plus.unsplash.com/premium_photo-1695385055449-73d3748a0d9c?q=80&w=1170&auto=format&fit=crop",
    precioEntero: 2500, rareza: "Rara", tipo: "Consumible", bonus: 500
  }
];

// Convierte datosIniciales en objetos de tu modelo.
// const productosIniciales = datosIniciales.map(datos => ...);
// Mientras desarrollas, puedes usar una colección pequeña de prueba.

const productosIniciales = datosIniciales.map(datos => new ObjetoArmeria(datos.nombre, datos.imagen, datos.precioEntero, datos.precioEntero, datos.rareza, datos.tipo, datos.bonus));

// Array de trabajo dinámico
let catalogoMercado = [...productosIniciales];

// Objeto Jugador
const jugador = {
  vida: 1400,
  ataque: 150,
  defensa: 80,
  oroCentimos: 8000 // 80,00 €
};

// =========================================================================
// 3. FUNCIONES DE LÓGICA DE MERCADO (A diseñar)
// =========================================================================

// Completa las operaciones que necesita la interfaz: filtrar por rareza,
// buscar por nombre y crear una colección nueva con descuentos por tipo o
// rareza. Decide si prefieres funciones normales o funciones flecha y cómo
// compones las operaciones, siempre evitando modificar la lista original.

/* 1 Una operacion para filtrar por rareza. El valor todas debe devolver todos los productos.*/
function filtrarPorRareza(catalogoMercado, rareza) {

if(rareza !== "todas"){
  const filtrados = catalogoMercado.filter((objeto) => objeto.rareza === rareza); 
return filtrados;
}

return catalogoMercado;
}


// 2 Una busqueda por nombre que ignore mayusculas, minusculas y espacios sobrantes.

function buscarPorNombre(catalogoMercado, nombre) {

let nombreMinuscula= nombre.toLowerCase().trim();
  const filtrados = catalogoMercado.filter((objeto) => objeto.nombre.toLowerCase().includes(nombreMinuscula)); 
return filtrados;

}

// 3 Una operacion que recorra el catalogo y aplique un descuento cuando el criterio coincida 
//con el tipo o con la rareza.

function aplicarDescuentoFiltro(catalogo, criterio, porcentaje) {

  return catalogo.map(objeto => {
    
    if (objeto.tipo === criterio || objeto.rareza === criterio) {
      return objeto.obtenerCopiaRebajada(porcentaje);
    } 
    
    return objeto;
    
  });
}



// 4 Una operacion que elija al azar un criterio y un porcentaje, actualice la oferta visible y 
//   vuelva a dibujar el catalogo.


// Selecciona aleatoriamente una oferta, la aplica al catálogo e informa en la UI
function generarOfertaAleatoria() {



  const criterios = ['Arma', 'Armadura', 'Consumible', 'Legendaria', 'Rara'];
  const porcentajes = [10, 15, 20, 25, 30, 50];

  const criterioElegido = criterios[Math.floor(Math.random() * criterios.length)];
  const porcentajeElegido = porcentajes[Math.floor(Math.random() * porcentajes.length)];


  console.log("Criterio elegido para descuento --> "+ criterioElegido)
  console.log("Porcentaje elegido para descuento --> "+ porcentajeElegido)

  // Actualizar catálogo global con los productos rebajados
  catalogoMercado = aplicarDescuentoFiltro(productosIniciales, criterioElegido, porcentajeElegido );

  // Mostrar la oferta activa en el elemento HTML #texto-oferta-dia
  const textoOferta = document.getElementById('texto-oferta-dia');
  textoOferta.textContent = `${porcentajeElegido}% de descuento en objetos de tipo/rareza: ${criterioElegido}`;

  aplicarFiltrosCombos();
}

// =========================================================================
// 4. INTERACCIÓN CON EL DOM Y NOTIFICACIONES (Lógica provista)
// =========================================================================

const contenedorCatalogo = document.getElementById('contenedor-catalogo');
const inputBuscar = document.getElementById('input-buscar');
const selectRareza = document.getElementById('select-rareza');
const bannerNotificacion = document.getElementById('banner-notificacion');
const btnNuevaOferta = document.getElementById('btn-nueva-oferta');

function mostrarNotificacion(mensaje, esExito) {
  bannerNotificacion.textContent = mensaje;
  bannerNotificacion.className = `banner-notificacion ${esExito ? 'exito' : 'error'}`;

  setTimeout(() => {
    bannerNotificacion.className = 'banner-notificacion oculto';
  }, 4000);
}

function renderizarJugador() {
  document.getElementById('stat-hp').textContent = jugador.vida;
  document.getElementById('stat-atk').textContent = jugador.ataque;
  document.getElementById('stat-def').textContent = jugador.defensa;
  document.getElementById('stat-oro').textContent = (jugador.oroCentimos / 100).toFixed(2).replace('.', ',') + ' €';
}

function renderizarCatalogo(lista) {
  contenedorCatalogo.innerHTML = '';

  lista.forEach((producto, index) => {
    const tieneRebaja = producto.precioEntero < producto.precioOriginal;
    const card = document.createElement('div');
    card.className = `tarjeta-producto ${producto.rareza.toLowerCase()}`;

    card.innerHTML = `
      <div class="producto-img-container">
        <img src="${producto.imagen}" alt="${producto.nombre}">
      </div>
      <div class="producto-header">
        <span class="producto-nombre">${producto.nombre}</span>
        <span class="badge-rareza">${producto.rareza}</span>
      </div>
      <div class="producto-info">
        <span>Tipo: ${producto.tipo}</span><br>
        <span class="producto-bonus">+${producto.bonus} ${producto.tipo === 'Arma' ? 'ATK' : producto.tipo === 'Armadura' ? 'DEF' : 'HP'}</span>
      </div>
      <div class="producto-footer">
        <div class="precio-contenedor">
          ${tieneRebaja ? `<span class="precio-original">${producto.getPrecioFormateado(producto.precioOriginal)}</span>` : ''}
          <span class="producto-precio">${producto.getPrecioFormateado()}</span>
        </div>
        <button class="btn-comprar" data-index="${index}">Comprar</button>
      </div>
    `;
    contenedorCatalogo.appendChild(card);
  });

  document.querySelectorAll('.btn-comprar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      comprarProducto(lista[idx]);
    });
  });
}

function comprarProducto(producto) {
 /* if (jugador.oroCentimos >= producto.precioEntero) {
    jugador.oroCentimos -= producto.precioEntero;
    producto.aplicarCompra(jugador);
    renderizarJugador();
    mostrarNotificacion(`¡Has comprado ${producto.nombre} exitosamente!`, true);
  } else {
    mostrarNotificacion(`No tienes suficiente oro para comprar ${producto.nombre}.`, false);
  }
    */

producto.aplicarCompra(jugador);
  
}

function aplicarFiltrosCombos() {
  const texto = inputBuscar.value;
  const rareza = selectRareza.value;

  let resultado = buscarPorNombre(catalogoMercado, texto);
  resultado = filtrarPorRareza(resultado, rareza);

  renderizarCatalogo(resultado);
}

// Eventos
inputBuscar.addEventListener('input', aplicarFiltrosCombos);
selectRareza.addEventListener('change', aplicarFiltrosCombos);
btnNuevaOferta.addEventListener('click', generarOfertaAleatoria);

// Inicialización
renderizarJugador();
generarOfertaAleatoria();



/*2. Conectar tus funciones a los botones del HTML
Te dan los IDs de los elementos del HTML (#input-buscar, #select-rareza, etc.). Tienes que crear los "escuchadores de eventos" (addEventListener) para que:

Cuando el usuario escriba en el buscador, se ejecute tu función buscarPorNombre.

Cuando cambie el desplegable de rareza, se ejecute tu función filtrarPorRareza.

Cuando pulse el botón de oferta, se ejecute la función aleatoria.

3. Pasar el control de calidad (La tabla de comprobación)
La tabla "Comprueba tu actividad" no es código que tengas que escribir, es tu checklist de pruebas. Antes de dar por terminado el ejercicio, tienes que abrir la página y probar a hacer exactamente lo que dice ahí. Si buscas "Escudo" y salen escudos, bien. Si das 20 veces a "Cambiar oferta" y el precio no baja de cero, bien. */