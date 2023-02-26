window.addEventListener('DOMContentLoaded', () => {
  const btnNav = document.querySelector('.btn__nav');
  const nav = document.querySelector('.nav__wrapper');
  const snackbarBtnClose = document.querySelectorAll('.snackbar__list .snackbar__close > img');
  const snackbarItem = document.querySelectorAll('.snackbar__list >  .snackbar__item');
  const snackbarContainer = document.querySelector('.snackbar__origin > .snackbar__item');
  const animateElements = document.querySelectorAll('.fade')


  let disable = false;
  const animateSnackbar = () => {
    if (!window.matchMedia('(min-width: 1020px)').matches) {
      return window.removeEventListener('scroll', animateSnackbar)
    }
    // Here's the mess
    if (window.scrollY > 400 && !disable) {
      disable = true;
      const { y } = snackbarContainer.getBoundingClientRect();
      snackbarItem.forEach(snackbar => {
        snackbar.style.transform = `translate3d(0, ${y - 280}px, 0)`;
        snackbar.classList.add('fade-up-down')
        setTimeout(() => {
          snackbar.style.top = '0'
        }, 500)
      })
      return;
    }

    if (window.scrollY <= 200 && disable) {
      disable = false;
      snackbarItem.forEach((item, index) => {
        const rotateAngle = (index + 1) % 2 === 0 ? 4 : -2;
        item.classList.remove('fade-up-down')
        item.style.transform = `translate3d(0, 0, 0) rotate(${rotateAngle}deg)`;
        item.style.removeProperty('top')
        item.style.transition = "all 1000ms"
      })
    }

  }
  window.addEventListener('scroll', animateSnackbar);
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: '0.2'
  }

  const observerCB = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animationDelay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('fade--init')
        }, Number(animationDelay))
        observer.unobserve(entry.target)
      }
    })
  }

  const observer = new IntersectionObserver(observerCB, options);
  animateElements.forEach(ele => {
    observer.observe(ele)
  })

  btnNav.addEventListener('click', function () {
    this.classList.toggle('close--active')
    nav.classList.toggle('nav__wrapper--open')
  })

  snackbarBtnClose.forEach(btn => {
    btn.addEventListener('click', function () {
      this.parentElement.parentElement.classList.add('snackbar__item-close')
    })
  })
})

const brandListContainer = document.querySelector('.brand__list');

for (let i = 1; i <= 16; i++) {
  const item = createElement(`./images/brand${i}.png`, i);
  brandListContainer.appendChild(item);
}

function createElement(imgPath, index) {
  const item = document.createElement('div');
  item.className = "brand__item fade"
  item.setAttribute('data-delay', `${50 * index}`)
  const img = document.createElement('img')
  img.alt = `brand logo`
  img.src = imgPath;
  item.append(img);
  return item;
}