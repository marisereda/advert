const frameInfo = [
  'The first time I used the Samsung Bespoke Jet™,I cried. I’m not being sensational; I really did.Of course, this vacuum worked great.But that’s not all.”',
  '“If you’re an over-cleaner, like myself, you’ll nerd out on all of the functions. If you avoid this chore at all costs, you’ll appreciate how simple Samsung makes it.” ',
  '“Both the floor and pet hair attachments are cleverly designed to eliminate the dreaded hair wrap. (In other words, you’ll never have to tackle hair tangles with a pair of scissors again.)” ',
  '“When I learned the Samsung Bespoke Vac cleaned itself with amazing technology, that’s when I cried. No more scraping spider legs and hair out of the crevices with my hands. Its suction power is so strong, the canister is left perfectly clean after every use. It’s like a vacuum for your vacuum.',
  '“Because it’s so nice-looking, it can live right in the kitchen. No more hauling a vacuum up and down the basement stairs on the daily”',
];

const refs = {
  prevButton: document.querySelector('#prev'),
  nextButton: document.querySelector('#next'),
  frameTitle: document.querySelector('.frame__title'),
  frameButton: document.querySelector('.frame__button'),
  paginatorText: document.querySelector('.paginator__text'),
  paginator: document.querySelector('.paginator'),
  frameRight: document.querySelector('.frame__right'),
  frameInfoText: document.querySelector('.frame__info span'),
  frameInfo: document.querySelector('.frame__info'),
  frameBackground: document.querySelector('.frame__background-image'),
  frameLeftBackground: document.querySelector('.frame__left-background '),
  images: gsap.utils.toArray('.frame__image'),
};

let intervalId;
let currentPageIndex = 0;
let paginatorTween;
let buttonTween;

//EventListeners
refs.prevButton.addEventListener('click', () => {
  paginatorTween?.revert();
  paginatorTween = null;
  prevPage();
  startAutoPagination();
});
refs.nextButton.addEventListener('click', () => {
  paginatorTween?.revert();
  paginatorTween = null;
  nextPage();
  startAutoPagination();
});
refs.frameButton.addEventListener('mouseenter', () => {
  buttonTween?.revert();
});
refs.frameButton.addEventListener('mouseleave', () => {
  startButtonTween();
});

startInitialAnimation();
startPaginatorTween();
startButtonTween();
changeImage();

function startInitialAnimation() {
  const tl = gsap.timeline();

  //show logo and title
  tl.fromTo(
    '.frame__brand-logo',
    { x: -100, y: 100, opacity: 0 },
    { x: 0, y: 100, opacity: 1, duration: 0.75 }
  );
  tl.to('.frame__brand-logo', { y: 0, duration: 0.75 });
  tl.from('.title__line1', { x: -100, opacity: 0, duration: 0.5 });
  tl.from('.title__line2', { x: -100, opacity: 0, duration: 1 }, '<+=0.25');
  tl.from('.title__line3', { x: -100, opacity: 0, duration: 1 }, '<+=0.25');

  //scale background image
  tl.to(
    refs.frameBackground,
    {
      width: '80%',
      scale: 1.065,
      x: 510,
      y: 26,
      duration: 1,
    },
    '>1'
  );

  //show left background
  tl.from(
    refs.frameLeftBackground,
    {
      xPercent: -100,
      duration: 1,
      ease: 'power1.inOut',
    },
    '<-0.5'
  );
  tl.from(refs.frameTitle, { y: -20, duration: 1 }, '>-0.5');

  //show frame info
  tl.to(
    [refs.frameInfo, refs.paginator, refs.frameButton],
    { opacity: 1, duration: 1 },
    '>'
  );
  tl.to(refs.frameRight, {
    opacity: 1,
    duration: 1,
  });
  tl.to(refs.frameBackground, { opacity: 0, duration: 1 }, '<=0.5');

  tl.call(startAutoPagination);
}

function startAutoPagination() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (!paginatorTween?.isActive()) {
      startPaginatorTween();
    }
    nextPage();
  }, 3000);
}

function startPaginatorTween() {
  paginatorTween = gsap.to([refs.prevButton, refs.nextButton], {
    scale: 1.4,
    duration: 1,
    repeat: -1,
    ease: 'power1.out',
    yoyo: true,
  });
}

function startButtonTween() {
  buttonTween = gsap.from([refs.frameButton], {
    scale: 0.8,
    duration: 1,
    repeat: -1,
    ease: 'power1.out',
    yoyo: true,
  });
}

function prevPage() {
  currentPageIndex = currentPageIndex === 0 ? 4 : currentPageIndex - 1;
  refs.frameInfoText.innerHTML = frameInfo[currentPageIndex];
  refs.paginatorText.innerHTML = `${currentPageIndex + 1}/5`;
  gsap.from(refs.frameInfo, {
    x: -100,
    duration: 0.5,
    onStart: () => {
      refs.prevButton.setAttribute('disabled', '');
    },
    onComplete: () => {
      refs.prevButton.removeAttribute('disabled');
    },
  });
  changeImage();
}

function nextPage() {
  currentPageIndex = currentPageIndex === 4 ? 0 : currentPageIndex + 1;
  refs.frameInfoText.innerHTML = frameInfo[currentPageIndex];
  refs.paginatorText.innerHTML = `${currentPageIndex + 1}/5`;
  gsap.from(refs.frameInfo, {
    x: 100,
    duration: 0.5,
    onStart: () => {
      refs.nextButton.setAttribute('disabled', '');
    },
    onComplete: () => {
      refs.nextButton.removeAttribute('disabled');
    },
  });
  changeImage();
}

function changeImage() {
  const imagesToDisappear = refs.images.filter(
    (_, i) => i !== currentPageIndex
  );
  gsap.to(imagesToDisappear, { opacity: 0, duration: 2 });
  gsap.to(refs.images[currentPageIndex], { opacity: 1, duration: 2 });
}
