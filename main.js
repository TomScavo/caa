const starts = document.getElementsByClassName('star-item');
const inputs = document.getElementsByClassName('form-control');
const lastImgBottom = document.querySelector('.sectione-img-bottom');
const randomID = document.querySelector('.random-id');
const lastTexts = [
  '别光想着别人怎么看你，大家都挺忙的。',
  '上帝，如果没办法把我变瘦，请把我身边的朋友变胖',
  '黑夜从来不会亏待晚睡的人，它会赐予你黑眼圈。',
  '长江后浪推前浪，前浪死在沙滩上，为什么不浪一浪。',
  '你之所以觉得累，因为你可以像猪一样懒，却没办法像猪一样心安理得。',
  '没有平坦的肚子，就没有平坦的人生。',
  '冰冻三尺非一日之寒，长胖三斤却一点不难。',
  '生活不仅有眼前的苟且，还有杯中的枸杞。'
];
const lastArea = document.querySelector('.last-page-text');
lastArea.innerHTML = `<span>${lastTexts[Math.floor(Math.random() * 8)]}</span>`;

randomID.innerHTML = `<span>${Math.floor(Math.random() * 990099) +
  10001}</span>`;

let intervals = [];
blink(starts);
let current = 0;
function blink(starsElement, maxHeight = 80) {
  for (let i = 0; i < starsElement.length; i++) {
    let interID = setInterval(() => {
      const left = Math.floor(Math.random() * 80) + 'vw';
      const top = Math.floor(Math.random() * maxHeight) + 'vh';
      const size = (Math.random() * 0.5 + 1) * 10 + 'vw';
      delay = Math.random() * 2;
      starsElement[i].style.left = left;
      starsElement[i].style.top = top;
      starsElement[i].style.width = size;
      starsElement[i].style.animationDelay = delay + 's';
    }, Math.random() * 1000 + 2000);
    intervals.push(interID);
  }
}

class TypeWriter {
  constructor(txtElement, next, words, current, wait = 3000) {
    this.txtElement = txtElement;
    this.next = next;
    this.words = words;
    this.current = current;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    if (this.txt.length / this.words[this.current].length === 1) {
      if (current === 3) {
        if (
          inputs[0].value.trim() &&
          inputs[1].value.trim() &&
          inputs[2].value.trim()
        ) {
          this.next.classList.add('next-blink');
          this.txt = '';
          return false;
        } else {
          this.next.classList.remove('next-blink');
        }
      }
      if (current !== 3) {
        this.next.classList.add('next-blink');
        this.txt = '';
        return false;
      }
    }
    const fullTxt = this.words[this.current];
    // Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    if (this.current === 5) {
      if (fullTxt.length - this.txt.length < 6) {
        this.txtElement.innerHTML = `<span class="txt">${fullTxt.slice(
          0,
          fullTxt.length - 6
        )}<span class="txt-red">${this.txt.slice(
          fullTxt.length - 6,
          this.txt.length
        )}</span></span>`;
      } else {
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
      }
    } else {
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    }

    // Initial Type Speed
    let typeSpeed = 50;

    setTimeout(() => this.type(), typeSpeed);
  }
}

// var imgs = document.images,
//   len = imgs.length,
//   counter = 0;

// [].forEach.call(imgs, function(img) {
//   img.addEventListener('load', incrementCounter, false);
// });

// function incrementCounter() {
//   counter++;
//   if (counter === len) {
//     alert(123);
//   }
// }

// Init On DOM Load

// Init App
const next = document.querySelector('.text-area-next');
const textArea = document.querySelector('.text-area');
const txtElement = document.querySelector('.text');
const words = JSON.parse(txtElement.getAttribute('data-words'));
const nextButton = document.querySelector('.next-button');
const sectionDOverlay = document.querySelector('.sectiond-overlay');
const pageSection = document.getElementsByTagName('section');
const sectionDStars = document.getElementsByClassName('star-item-d');

function init() {
  // Init TypeWriter
  new TypeWriter(txtElement, next, words, current);
}

next.addEventListener('click', onNextclick);

//next button click clear txt and show next;
function onNextclick() {
  if (!intervals.length) {
    for (let i = 0; i < intervals.length; i++) {
      clearInterval(intervals[i]);
    }
    intervals = [];
  }
  if (current === 3) {
    for (let i = 0; i < intervals.length; i++) {
      clearInterval(intervals[i]);
    }
    const ufo = document.querySelector('.sectiond-ufo');
    const shine = document.querySelector('.ufo-shine');
    ufo.classList.add('ufo-anime');
    shine.classList.add('ufo-shine-anime');
    for (let i = 1; i < sectionDStars.length; i++) {
      sectionDStars[i].classList.remove('star-item-d-anime');
    }
    sectionDOverlay.style.display = 'block';
  } else {
    pageSection[current].classList.remove('show');
  }
  if (current === 4) {
    pageSection[3].classList.remove('show');
    pageSection[4].classList.add('show');
  }
  if (current === 5) {
  }

  current++;
  if (current < 4) {
    pageSection[current].classList.add('show');
  }

  next.classList.remove('next-blink');
  if (current === 1) {
    const bottomImg = document.querySelector('.img-bottom');
    bottomImg.style.bottom = `-${bottomImg.clientHeight + 5}px`;
  }
  if (current === 2) {
    const sectionCStars = document.getElementsByClassName('star-item-c');
    nextButton.src = './img/next-translate.png';
    blink(sectionCStars, 35);
  }
  if (current === 3) {
    nextButton.src = './img/next-submit.png';
    blink(sectionDStars, 80);
  }
  if (current === 4) {
    nextButton.src = './img/next-get.png';
  }

  if (current === 5) {
    nextButton.src = './img/next.png';
  }
  if (current === 6) {
    textArea.style.display = 'none';
    lastImgBottom.style.display = 'block';
    lastArea.style.display = 'block';
  }
  txtElement.innerHTML = '';
  new TypeWriter(txtElement, next, words, current);
}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('change', function() {
    if (this.value) {
      this.previousSibling.previousSibling.src = './img/p4-input-empty.png';
    } else {
      if (this.getAttribute('data-count') === '1') {
        this.previousSibling.previousSibling.src = './img/p4-input-1.png';
      }
      if (this.getAttribute('data-count') === '2') {
        this.previousSibling.previousSibling.src = './img/p4-input-2.png';
      }
      if (this.getAttribute('data-count') === '3') {
        this.previousSibling.previousSibling.src = './img/p4-input-3.png';
      }
    }
  });
}

document.addEventListener('load', init());
