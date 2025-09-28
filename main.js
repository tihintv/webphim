document.addEventListener("DOMContentLoaded", () => {
  const movieForm = document.getElementById("movieForm");
  const section = document.getElementById("section-wrapper");

  const movies = JSON.parse(localStorage.getItem("movies")) || [];

  function renderMovies() {
    section.innerHTML = "";
    movies.forEach((movie) => {
      const movieEl = document.createElement("a");
      movieEl.className = "movie-item col-3-5 m-5 s-11 to-top show-on-scroll";
      movieEl.href = "#";
      movieEl.innerHTML = `
        <div>
          <img src="${movie.poster}" alt="">
          <div class="movie-item-content">
            <div class="movie-item-title">${movie.title}</div>
            <div class="movies-infors-card">
              <div class="movies-infor">
                <ion-icon name="bookmark-outline"></ion-icon>
                <span>${movie.rating}</span>
              </div>
              <div class="movies-infor">
                <ion-icon name="time-outline"></ion-icon>
                <span>${movie.duration} mins</span>
              </div>
              <div class="movies-infor">
                <ion-icon name="cube-outline"></ion-icon>
                <span>HD</span>
              </div>
            </div>    
          </div>
        </div>
        <div class="movie-item-overlay"></div>
        <div class="movie-item-act">
          <i class='bx bxs-right-arrow'></i>
          <div>
            <i class='bx bxs-share-alt'></i>
            <i class='bx bxs-heart'></i>
            <i class='bx bx-plus-medical'></i>
          </div>
        </div>
      `;
      section.appendChild(movieEl);
    });
  }

  renderMovies();

  movieForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const rating = document.getElementById("rating").value.trim();
    const duration = document.getElementById("duration").value.trim();
    const poster = document.getElementById("poster").value.trim();

    if (title && rating && duration && poster) {
      const newMovie = { title, rating, duration, poster };
      movies.push(newMovie);
      localStorage.setItem("movies", JSON.stringify(movies));
      renderMovies();
      movieForm.reset();
    }
  });
});