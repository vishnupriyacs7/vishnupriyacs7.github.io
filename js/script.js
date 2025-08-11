// Init AOS
AOS.init({
  duration: 700,
  once: true,
});

// Typed.js hero text
const typed = new Typed('#typed', {
  strings: [
    'Software Engineer',
    'Full-Stack Developer',
    'Test Automation Specialist',
    'PHP • Laravel • Java • Selenium'
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 1500,
  loop: true
});

// Mobile nav toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger && burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Theme toggle (persist to localStorage)
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const DARK = 'dark';
function applyTheme(t) {
  if (t === DARK) {
    document.body.style.background = '#071023';
  } else {
    document.body.style.background = '';
  }
}
const savedTheme = localStorage.getItem('site-theme') || 'light';
applyTheme(savedTheme);
themeToggle.addEventListener('click', () => {
  const cur = localStorage.getItem('site-theme') || 'light';
  const next = cur === 'light' ? 'dark' : 'light';
  localStorage.setItem('site-theme', next);
  applyTheme(next);
});

// Skill fill animation + count up when visible
const skillFills = document.querySelectorAll('.skill-fill');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const percent = fill.getAttribute('data-percent') || '80%';
      fill.style.width = percent;
      // animate percent number
      const span = fill.querySelector('.skill-percent');
      if (span) {
        let target = parseInt(percent);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 20));
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            span.textContent = percent;
            clearInterval(interval);
          } else {
            span.textContent = current + '%';
          }
        }, 30);
      }
      io.unobserve(fill);
    }
  });
}, {threshold: 0.3});

skillFills.forEach(f => io.observe(f));

// Smooth scroll offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const offset = 70; // header height
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({top, behavior:'smooth'});
      }
    }
  });
});
