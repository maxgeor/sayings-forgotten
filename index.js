function reveal(revealables) {
  revealables.forEach(revealable => {
    fadeUp(revealable);
    let words = Array.from(revealable.querySelectorAll('span'));
    revealWords(words, true);
  });
}

function revealWords(words, starting = false) {
  const delay = starting ? 0 : words.length === 1 ? 220 : 120;

  if (words.length > 0) {
    setTimeout(() => {
      const word = words.shift();
      word.style.position = 'static'
      fadeUp(word);
      revealWords(words);
    }, delay);
  }
}

function fadeUp(el) {
  el.style.opacity = '100%';
  el.style.transform = 'translateY(0)';
}

function isInViewport(element) {
  var bounding = element.getBoundingClientRect();
  if (bounding.top <= ((window.innerHeight || document.documentElement.clientHeight) / 2) + 50) {
    return true;
  } else {
    return false;
  }
}

window.addEventListener('load', () => {
  setTimeout(() => {
    const revealableTitle = document.querySelector('#revealable-title');
    fadeUp(revealableTitle);
  }, 300);
  setTimeout(() => {
    const description = document.querySelector('#hero-description');
    reveal([description]);
  }, 400);
  setTimeout(() => {
    const sayingsSection = document.querySelector('#sayings');
    fadeUp(sayingsSection);
  }, 1200);
});

const sayings = document.querySelectorAll('.saying');

window.addEventListener('scroll', () => {
  sayings.forEach(saying => {
    if (isInViewport(saying)) {
      const revealables = Array.from(saying.querySelectorAll('.revealable'));
      reveal(revealables);
    }
  });
}, false);