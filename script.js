// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); }
});

// Theme toggle (remembers choice)
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
function setTheme(t) {
  root.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? 'Light' : 'Dark';
  try { localStorage.setItem('theme', t); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
setTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeBtn.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

// Typing effect - edit these phrases
const phrases = ['cloud infrastructure', 'CI/CD pipelines', 'AI-ready platforms'];
const typed = document.getElementById('typed');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let p = 0, c = 0, deleting = false;
function type() {
  const word = phrases[p];
  typed.textContent = word.slice(0, c);
  if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1400); }
  if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; }
  c += deleting ? -1 : 1;
  setTimeout(type, deleting ? 40 : 90);
}
if (reduce) typed.textContent = phrases[0]; else type();

// Skill bars fill when visible
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.querySelector('i').style.width = en.target.dataset.level + '%';
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.skill').forEach(s => io.observe(s));

// Contact form validation (opens the visitor's email app)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', e => {
  e.preventDefault();
  const { name, email, message } = form.elements;
  if (!name.value.trim() || !message.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
    status.textContent = 'Enter your name, a valid email, and a message.';
    return;
  }
  const subject = encodeURIComponent('Portfolio message from ' + name.value.trim());
  const body = encodeURIComponent(message.value.trim() + '\n\n' + name.value.trim() + ' (' + email.value.trim() + ')');
  window.location.href = 'mailto:akthar2706@gmail.com?subject=' + subject + '&body=' + body;
  status.textContent = 'Opening your email app...';
});
