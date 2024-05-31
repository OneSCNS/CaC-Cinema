const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8';
const API_URL = 'https://api.themoviedb.org/3';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWViYmUzMGY3YzBlZmZhNTQxYjhhMjRmN2EwMzJhOSIsInN1YiI6IjY2NWEzMjFmM2MzMmNiMWFiZmFlZjAyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GIUyRWElqgZLRD5egxWSQdACh_vzmBM-VmsQqvoKwnM'
    }
  };

let currentPage = 1;

function llamarAPI(page) {
    fetch(`${API_URL}/movie/popular?language=en-US&page=1${page}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    }, options)
        .then(response => response.json())
        .then(data => dibujarDatos(data));


}

function dibujarDatos(json) {
    const filas = json.results.map(obj => Pelicula(obj));
    document.querySelector('.peliculasTendencia .peliculas').innerHTML = filas.join('');

}

function Pelicula(obj) {
    return `
      <a href="./pages/detalle.html">
        <div class="pelicula">
          <img class="imgTendencia" src="https://image.tmdb.org/t/p/w500/${obj.poster_path}" alt="${obj.title}" loading="lazy">
          <div class="tituloPelicula">
            <h4>${obj.title}</h4>
          </div>
        </div>
      </a>
    `;
}

function cargarPaginaSiguiente() {
    currentPage++;
    llamarAPI(currentPage);
}

function cargarPaginaAnterior() {
    if (currentPage > 1) {
      currentPage--;
      llamarAPI(currentPage);
    }
  }
document.querySelector('.anterior').addEventListener('click', cargarPaginaAnterior);
document.querySelector('.siguiente').addEventListener('click', cargarPaginaSiguiente);

llamarAPI(currentPage);