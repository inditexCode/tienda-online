   
   const pintarCarrito = () => {
   modalContainer.innerHTML = ''
    modalContainer.style.display = 'block'
    let modalHeader = document.createElement('div')
    modalHeader.className = 'modal-header'
    modalHeader.innerHTML = `
    <h2 class = 'modal-close'> X </h2>
    `
    modalHeader.addEventListener('click',() =>{
        modalContainer.style.display = 'none'
    })
    modalContainer.append(modalHeader)

    carrito.forEach((product) => {
        let carritoContenido = document.createElement('div')
        carritoContenido.className = 'carrito-contenido'
        carritoContenido.innerHTML = `
        <img src="${product.Img}"">
        <div class = 'contenedor-carrito'>
        <h3 class = 'carrito-titulo'>${product.nombre}</h3>
        <p class = 'carrito-parrafo'>  (${product.parrafo})</p>
        <div class = 'precio-eliminar'>
        <p class = 'carrito-precio'> € ${product.precio} </p>
        <span class = 'restar'> - </span>
        <p class = 'carrito-cantidad'>Cant: ${product.cantidad}</p>
        <span class = 'sumar'> + </span>
        <p class= 'carrito-total'>Total: € ${product.cantidad * product.precio} </p>
        <span class='delete-product' data-id='${product.id}'>Eliminar</span>
        </div>
        </div>
        `
        modalContainer.append(carritoContenido)

        let restar = carritoContenido.querySelector('.restar')
           restar.addEventListener('click', () => {
            if(product.cantidad !==1){
                product.cantidad--;
            }
            saveLocal()
           pintarCarrito()
        })
        let sumar = carritoContenido.querySelector('.sumar')
        sumar.addEventListener('click', () => {
            product.cantidad++;
            saveLocal()
        pintarCarrito()
     })


        let eliminar = carritoContenido.querySelector('.delete-product');
        eliminar.addEventListener('click',() => {
            eliminarProducto(product.id)
        })
       //carritoContenido.append(eliminar)
    })


    const total = carrito.reduce((acc, ele) => acc + ele.precio * ele.cantidad, 0);
    const footerCarrito = document.createElement('button')
    footerCarrito.className ='boton';
    footerCarrito.innerHTML = `Pagar: € ${total} `
    modalContainer.append(footerCarrito)
}

verCarrito.addEventListener('click', pintarCarrito)

const eliminarProducto = (id) => {
    carrito = carrito.filter((product) => product.id !== id);
    
    carritoCounter()
    saveLocal()
    pintarCarrito()
}

const carritoCounter = () =>{
    const carritoLentgh = carrito.length
    if(carritoLentgh > 0){
        cantidadCarrito.style.display = 'block'
        cantidadCarrito.innerText = carritoLentgh
    }else{
        cantidadCarrito.style.display = 'none'
    }

    //const carritoLentgh = carrito.length
    localStorage.setItem('carritoLength', JSON.stringify(carritoLentgh));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem('carritoLength'))
}
carrito = JSON.parse(localStorage.getItem('carrito')) || [];

carritoCounter();
