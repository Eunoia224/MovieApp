const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=db6717b3356609fa789034a02df7d684&page=1";
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=db6717b3356609fa789034a02df7d684&query="';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

getMovies(API_URL);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
  console.log(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview, release_date } = movie;
    const movieElement = document.createElement("div");
    // movieElement.classList.add(movie)
    movieElement.innerHTML = `
        <div class="movie">
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <small class="small">Released on ${release_date}</small>
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRating(vote_average)}">${vote_average}</span>
        </div> 
        <div class="overview">
        <h3>overview</h3>
        ${overview}
        </div>
        </div>
        
        `;
    main.appendChild(movieElement);
  });
}
function getClassByRating(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
