'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
// btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(ele => ele.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const message = document.createElement('div');
message.classList.add('cookie-message');
// console.log(message);
const header = document.querySelector('.header');
message.innerHTML =
  'We use cookied to improve functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>';
// console.log(message);
// message.parentElement.removeChild(message);
// header.prepend(message);

// insert coockie message
header.prepend(message);
// header.append(message);

// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height =
  parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

//first scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
btnScrollTo.addEventListener('click', function (e) {
  // console.log(e.target.getBoundingClientRect());
  const s1coords = section1.getBoundingClientRect();
  // console.log(section1.getBoundingClientRect());
  console.log(window.pageYOffset);
  // console.log(s1coords.left);
  console.log(s1coords.top);
  // console.log(window.pageYOffset);

  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// rgb(255, 255, 255);
const randomColor = () =>
  `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
//   e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }
});
const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// console.log(h1.closest('.header'));
// console.log(h1.querySelector('.header'));
// console.log(h1);

// console.log(h1.closest('h1'));
[...h1.parentElement.children].forEach(ele => {
  if (ele !== 'hi') {
    ele.style.transform = 'scale(0.5)';
  }
});
document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    const id = e.target.closest('.operations__tab');
    document
      .querySelectorAll('.operations__content')
      .forEach(c => c.classList.remove('operations__content--active'));
    document
      .querySelectorAll('.operations__tab')
      .forEach(t => t.classList.remove('operations__tab--active'));

    document
      .querySelector(`.operations__tab--${id.dataset.tab}`)
      .classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--${id.dataset.tab}`)
      .classList.add('operations__content--active');
    // if(e.target==='<></>')
    // if(e.target ===s)
  });

const nav = document.querySelector('.nav');
const eventhandler = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const navLink = e.target.closest('.nav').querySelectorAll('.nav__link');
    // console.log(navLink);
    navLink.forEach(ele => {
      if (ele !== link) ele.style.opacity = this;
    });
    document.querySelector('.nav__logo').style.opacity = this;
  }
};
nav.addEventListener('mouseover', eventhandler.bind(0.5));
nav.addEventListener('mouseout', eventhandler.bind(1));

// window.addEventListener('scroll', function () {
//   if (section1.getBoundingClientRect().top <= 0)
//     document.querySelector('.nav').classList.add('sticky');
//   else document.querySelector('.nav').classList.remove('sticky');
// });
const navCoord = nav.getBoundingClientRect().height;

const callBack = function (entries) {
  // console.log(entries);
  if (!entries[0].isIntersecting)
    document.querySelector('.nav').classList.add('sticky');
  else document.querySelector('.nav').classList.remove('sticky');
};
const objec = {
  root: null,
  threshold: 0,
  rootMargin: `-${navCoord}px`,
};
const observer = new IntersectionObserver(callBack, objec).observe(
  document.querySelector('.header__title')
);
document.querySelectorAll('.section').forEach(ele => {
  new IntersectionObserver(
    (entries, observer) => {
      const [entry] = entries;

      if (!entry.isIntersecting) return;
      // console.log(entry.isIntersecting);
      entry.target.classList.remove('section--hidden');

      observer.unobserve(entry.target);
    },
    {
      root: null,
      threshold: 0.15,
    }
  ).observe(ele);
  ele.classList.add('section--hidden');
});
const img = document.querySelectorAll('img[data-src]');
// console.log(img);

const lazyImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );

  observer.unobserve(entry.target);
};
// img.forEach(img =>
//   new IntersectionObserver(lazyImg, { root: null, threshold: 0 }).observe(img)
// );
img.forEach(ele => {
  new IntersectionObserver(
    lazyImg,

    { root: null, threshold: 0, rootMargin: '200px' }
  ).observe(ele);
});

const slider = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    const slide = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');

    // document
    //   .querySelectorAll('.dots')
    //   .forEach.insertAdjacentElement(
    //     '<button class="dots__dot dots__dot--active" data-slide="0"></button>'
    //   );
    slide.forEach((_, i) => {
      document
        .querySelector('.dots')
        .insertAdjacentHTML(
          'beforeend',
          `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });

    const selectDot = document.querySelectorAll('.dots__dot');
    let currentPos = 0;

    //functions
    const currentSlide = function (currentPos) {
      slide.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - currentPos)}%)`;
      });
    };
    const moveDot = function () {
      selectDot.forEach(ele => {
        ele.classList.remove('dots__dot--active');
      });

      selectDot[currentPos].classList.add('dots__dot--active');
    };

    const moveSlidePos = function () {
      currentSlide(currentPos);
      moveDot();
    };

    const init = () => {
      currentSlide(0);
      moveDot();
    };
    init();
    btnRight.addEventListener('click', () => {
      currentPos++;
      if (currentPos === slide.length) currentPos = 0;
      moveSlidePos();
    });

    //events
    btnLeft.addEventListener('click', () => {
      currentPos--;
      if (currentPos < 0) currentPos = slide.length - 1;
      moveSlidePos();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') {
        currentPos++;
        if (currentPos === slide.length) currentPos = 0;
        moveSlidePos();
      } else if (e.key === 'ArrowLeft') {
        currentPos--;
        if (currentPos < 0) currentPos = slide.length - 1;
        moveSlidePos();
      }
    });
    // selectDot.forEach(ele => {
    //   ele.addEventListener('click', e => {
    //     currentPos = e.target.getAttribute('data-slide');
    //     moveSlidePos();
    //   });
    // });
    document.querySelector('.dots').addEventListener('click', e => {
      if (e.target.classList.contains('dots__dot')) {
        currentPos = e.target.getAttribute('data-slide');
        moveSlidePos();
      }
    });
    observer.unobserve(document.querySelector('#section--3'));
  }
};
// slider();

const slideob = new IntersectionObserver(slider, {
  root: null,
  threshold: 0.5,
}).observe(document.querySelector('#section--3'));
