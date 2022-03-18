// Variables
const marca = document.querySelector("#marca");
const yearSelect = document.querySelector("#year");
const maximo = document.querySelector("#maximo");
const minimo = document.querySelector("#minimo");
const puertas = document.querySelector("#puertas");
const trasmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

// contenedor para los resultados
const resultado = document.querySelector("#resultado");
const max = new Date().getFullYear();

const min = max - 10;

// generar un objeto con la busqueda

const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

// eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); //muestra los automoviles al cargar

  // llena las opciones de años con un select
  llenarSelect();
});

// event liseners para los select de busqueda
marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});

yearSelect.addEventListener("change", (e) => {
  datosBusqueda.year = parseInt(e.target.value);
  filtrarAuto();
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = parseInt(e.target.value);
  filtrarAuto();
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = parseInt(e.target.value);
  filtrarAuto();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);
  filtrarAuto();
});

trasmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});
color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  console.log(datosBusqueda);
  filtrarAuto();
});

// funciones
function mostrarAutos(autos) {
  limpiarHTML();
  autos.forEach((auto) => {
    const autoHTML = document.createElement("P");
    const { marca, modelo, precio, year, transmision, puertas, color } = auto;
    autoHTML.textContent = `
    ${marca}
    ${modelo}-
    Año: ${year}-
    Precio: ${precio}-
    Trasmisión: ${transmision}-
    Puertas: ${puertas}-
    Color: ${color}
    `;

    resultado.appendChild(autoHTML);
  });
}

// genera ñlos años del select
function llenarSelect() {
  // autos.forEach((auto) => {
  //   const yearHTML = document.createElement("option");
  //   const { year } = auto;
  //   yearHTML.textContent = `${year}`;
  //   yearSelect.appendChild(yearHTML);
  //   console.log(year);
  // });

  for (let i = max; i >= min; i--) {
    const opt = document.createElement("option");
    opt.textContent = i;
    yearSelect.appendChild(opt);
  }
}

// funcion que elimina todos los registos previos, appendchild no lo hace

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// funcion que filtra en base a la busqueda
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMin)
    .filter(filtrarMax)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {
    // console.log(resultado);
    mostrarAutos(resultado);
  } else {
    validar();
  }
}

function filtrarMarca(auto) {
  if (datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca;
  }
  return auto;
}

function filtrarYear(auto) {
  if (datosBusqueda.year) {
    return auto.year === datosBusqueda.year;
  }
  return auto;
}

function filtrarMin(auto) {
  if (datosBusqueda.minimo) {
    return auto.precio >= datosBusqueda.minimo;
  }
  return auto;
}

function filtrarMax(auto) {
  if (datosBusqueda.maximo) {
    return auto.precio <= datosBusqueda.maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  if (datosBusqueda.puertas) {
    return auto.puertas === datosBusqueda.puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  if (datosBusqueda.transmision) {
    return auto.transmision === datosBusqueda.transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  if (datosBusqueda.color) {
    return auto.color === datosBusqueda.color;
  }
  return auto;
}

function validar() {
  limpiarHTML();
  const parrafo = document.createElement("DIV");
  parrafo.classList.add("alerta", "error");
  parrafo.textContent = "No hay resultados";

  resultado.appendChild(parrafo);
  setTimeout(() => {
    parrafo.textContent = "";
    parrafo.classList.remove("alerta", "error");
  }, 3000);
}
