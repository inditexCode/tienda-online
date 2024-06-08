
const shopContent = document.getElementById('shopContent')
const verCarrito = document.getElementById('verCarrito')
const modalContainer = document.getElementById('modalContainer')
const cantidadCarrito = document.getElementById('cantidadCarrito')

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// funcion para crear estrellas dinámicas

function crearEstrellas(estrellas){
    const estrellasContainer = document.createElement('div')
    estrellasContainer.className = 'estrellas-container'
   
     for (let i = 0; i <=5; i++) {
         const crearSpan = document.createElement('span');
         crearSpan.className = 'crear-span';
         crearSpan.innerHTML = i <= estrellas ? '&#9733;' : '&#9734';
         estrellasContainer.appendChild(crearSpan)        
     }
     return estrellasContainer;
}
// cards ------------------

productos.forEach((producto) =>{
    
    let content = document.createElement('div')
    content.className = 'card'
    content.innerHTML = `
    <img src="${producto.Img}" alt="${producto.nombre}">
    <p class = 'price'> € ${producto.precio} </p>
    <h2 class = 'nombre-producto'>${producto.nombre}</h2>
    <p class = 'parrafo'>  (${producto.parrafo})</p>
    <div class="estrellas-y-vendidas">
    <div class="estrellas-container"></div>
    <p class = 'unidad-vendida'>  (${producto.unidadVendida})</p>
</div>
    `;

    const estrellas = crearEstrellas(producto.estrellas);
    content.querySelector('.estrellas-container').appendChild(estrellas);

  let comprar = document.createElement('button')
  comprar.className = 'comprar'
  comprar.innerText = 'Comprar'

  content.append(comprar)
  shopContent.append(content)

// eventos -------------------------------

    comprar.addEventListener('click', () => {

        const repeat = carrito.some((repeatProduct) => repeatProduct.id === producto.id)
        if(repeat){
            carrito.map((prod)=>{
                if(prod.id === producto.id){
                    prod.cantidad++;
                }
            })
        }else{

            carrito.push({
                id: producto.id,
                Img: producto.Img,
                nombre: producto.nombre,
                precio: producto.precio,
                parrafo: producto.parrafo,
                cantidad: producto.cantidad,
    
            })
        }
        carritoCounter();
        saveLocal();
    })
})
//set item
const saveLocal = () =>{
    localStorage.setItem('carrito', JSON.stringify(carrito));
};
//get item
