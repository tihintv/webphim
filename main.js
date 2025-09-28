let nav = document.querySelectorAll(".nav-item")


console.log("toi là tuan ")

for (let i = 0; i < nav.length; i++) {
    nav[i].onclick = function() {
        let j = 0;
        while (j < nav.length) {
            nav[j++].className = 'nav-item'
        }
        nav[i].className = 'nav-item active'
    }
}

// MOBILE MENU 

let menu_tablet = document.querySelector('.menu-tablet')
let menu_toggle = document.querySelector('.menu-toggle')

menu_toggle.onclick = function() {
    menu_toggle.classList.toggle('active')
    menu_tablet.classList.toggle('active')
}


// SLIDE

let big_slider = document.querySelector("#big-slider")

let big_slide_items = big_slider.querySelectorAll('.big-slide-item')

let big_slide_index = 0

let slide_play = true

let slide_next = big_slider.querySelector(".slide-next")
console.log(slide_next)
let slide_prev = big_slider.querySelector(".slide-prev")

let header = document.querySelector(".nav")

showSlide = (index) => {
    big_slider.querySelector(".big-slide-item.active").classList.remove('active')
    big_slide_items[index].classList.add('active')
}

nextSlide = () => {
    big_slide_index = big_slide_index + 1 === big_slide_items.length ? 0 : big_slide_index + 1
    showSlide(big_slide_index)
}

prevSlide = () => {
    big_slide_index = big_slide_index - 1 < 0 ? big_slide_items.length - 1 : big_slide_index - 1
    showSlide(big_slide_index)

}





slide_next.addEventListener("click", () => nextSlide());

slide_prev.addEventListener("click", () => prevSlide());


big_slider.addEventListener("mouseover", () => slide_play = false);

big_slider.addEventListener("mouseleave", () => slide_play = true);

setTimeout(() => big_slide_items[0].classList.add('active'), 200)

setInterval(() => {
    if (!slide_play) return
    nextSlide()
}, 5000);




window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        header.classList.add("shrink")
    } else {
        header.classList.remove('shrink')
    }
})




let scroll = window.requestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1000 / 60);
}

let el_to_show = document.querySelectorAll('.show-on-scroll');

isElInViewPort = (el) => {
    let rect = el.getBoundingClientRect();

    let distance = 200;

    return rect.top <= (window.innerHeight - distance || document.documentElement.clientHeight - distance);

}

loop = () => {
    el_to_show.forEach(el => {
        if (isElInViewPort(el))
            el.classList.add('show');
    })
    scroll(loop)
}

loop();


// PROGRESS BAR

let scrollPrecentage = () => {
    let scrollProgress = document.getElementById('progress-bar')
    let progressVal = document.getElementById("progress-val")
    let pos = document.documentElement.scrollTop
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    let scrollVal = Math.round(pos * 100 / calcHeight)
    scrollProgress.style.background = `conic-gradient(#e70634 ${scrollVal}%, #2b2f38 ${scrollVal}%)`
}

window.onscroll = scrollPrecentage
window.onload = scrollPrecentage


//   MOBILE NAV

var list = document.querySelectorAll('.item')

function activeLink() {
    list.forEach((item) => item.classList.remove('active'))
    this.classList.add('active')
}

list.forEach((item) => item.addEventListener('click', activeLink))

document.addEventListener("DOMContentLoaded", () => {
  const movieForm = document.getElementById("movieForm");
  const section = document.getElementById("section-wrapper"); // nơi hiển thị phim

  const movies = JSON.parse(localStorage.getItem("movies")) || [];

  function renderMovies() {
    section.innerHTML = ""; // xóa cũ
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
