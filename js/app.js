const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load', () => {
    formulario.addEventListener('submit', budcarClima)
})

function budcarClima(e){
    e.preventDefault()

    //validar
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    if (ciudad === '' || pais === '' ){
        //hubo un error
        mostrarError('Ambos campos son obligatorios')

        return
    }
    //consultar la API
    consultarAPI(ciudad, pais)
}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100')

    if (!alerta){
        //crear una alerta
        const alerta = document.createElement('div')

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
            'max-w-md', 'mx-auto', 'mt-6', 'text-center')

            alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
            `;

            container.appendChild(alerta)

            //se elimina la alerta despues de 5 segundos
            setTimeout(() => {
                alerta.remove()
            }, 5000)
    }
}

function consultarAPI(ciudad, pais){
    const appid = `ba0b3c5120791f91c0f14d992b0f7379`

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos)
            limpiarHTML() 
            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada')
                return
            }

            //imprime la respuesta en el HTML
            mostrarClima(datos)
        })
}

function mostrarClima(datos){
    const {name, main:{temp, temp_min, temp_max}} = datos

    grados = temp - 273.15
    gradosTrunc = Math.trunc(grados)
    
    grados_min = temp_min - 273.15
    gradosMinTrunc = Math.trunc(grados_min)
    
    grados_max = temp_max - 273.15
    gradosMaxTrunc = Math.trunc(grados_max)

    const nombreCiudad = document.createElement('p')
    nombreCiudad.innerHTML = `${name}`
    nombreCiudad.classList.add('font-bold', 'text-2xl')
    
    const actual = document.createElement('p')
    actual.innerHTML = `${gradosTrunc} &#8451`
    actual.classList.add('font-bold', 'text-6xl')

    const min = document.createElement('p')
    min.innerText = `Min: ${gradosMinTrunc} ℃`
    min.classList.add('text-xl')

    const max = document.createElement('p')
    max.innerText = `Max: ${gradosMaxTrunc} ℃`
    max.classList.add('text-xl')

    const resultadoDiv = document.createElement('div')
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(min)
    resultadoDiv.appendChild(max)
    

    resultado.appendChild(resultadoDiv)
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}