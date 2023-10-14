// Función para cargar y mostrar los datos de una URL
function cargarYMostrarDatos(url, contenedor) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const categorias = data.categorias;
        categorias.forEach((categoria) => {
          const nombre = categoria.nombre;
          const nombreJunto = nombre.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '');
          const canales = categoria.canales;
          const numeroCanales = categoria.canales.length;
  
          const categoriaElement = document.createElement("div");
          categoriaElement.classList.add("accordion-item");
          categoriaElement.innerHTML = `
                <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${nombreJunto}" aria-expanded="false" aria-controls="collapse-${nombreJunto}">
                    <div class="col-5">${nombre}</div>
                    <div class="col-5 offset-1 d-none d-md-block">
                      <p class="orange-btn mx-4 mt-1 text-center">${numeroCanales} Canales</p>
                    </div>
                  </button>
                </h2>
  
                <div id="collapse-${nombreJunto}" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                  <div class="col-12 d-flex my-1 p-0 d-flex flex-row flex-wrap">
                    ${canales
                        .map(
                        (canal) => `
                        <div class="col-md-12 StrChan p-0">
                            <img class="img-channel" src="${canal.imagenPrincipal}" alt="${canal.nombreCanal}">
                            <img class="stream-modal-logo" src="${canal.imagenCanal}" alt="${canal.nombreCanal}">
                            <div id="ent-${canal.nombreCanal.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '')}" class="collapse channel-description">
                                <h6>${canal.nombreCanal}</h6>
                                <p>${canal.descripcion}</p>
                            </div>
                            <button class="btn btn-sinopsis" type="button" data-bs-toggle="collapse" data-bs-target="#ent-${canal.nombreCanal.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '')}" aria-expanded="false" aria-controls="ent-${canal.nombreCanal.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '')}">
                                Conoce más
                            </button>
  
                        </div>
                    `
                        )
                        .join("")
                    }   
                  </div>
                </div>
                `;
  
          const contenidoJsonElement = document.getElementById(contenedor);
          contenidoJsonElement.appendChild(categoriaElement);
        });
      })
      .catch((error) => {
        console.error("Error al leer el archivo JSON:", error);
      });
  }
  
  // Llamadas a las funciones
  cargarYMostrarDatos("https://d31nz91qboyide.cloudfront.net/mvshub/conexiones/paquetes.json", "contenido-json1");
  cargarYMostrarDatos("https://d31nz91qboyide.cloudfront.net/mvshub/conexiones/paqueteEx.json", "contenido-json2");
  