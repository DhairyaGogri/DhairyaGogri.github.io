
(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  // Theme
  const saved = localStorage.getItem('dg-theme');
  if(saved === 'light') document.body.classList.add('light');

  const themeBtn = $('#themeToggle');
  const setThemeIcon = () => {
    if(!themeBtn) return;
    const light = document.body.classList.contains('light');
    themeBtn.innerHTML = light ? '☾' : '☀';
    themeBtn.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    themeBtn.title = light ? 'Switch to dark mode' : 'Switch to light mode';
  };
  setThemeIcon();
  themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('dg-theme', document.body.classList.contains('light') ? 'light' : 'dark');
    setThemeIcon();
  });

  // Mobile nav
  const menuBtn = $('.menu-btn');
  const nav = $('.nav-links');
  menuBtn?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? '×' : '☰';
  });
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));

  // Scroll reveal
  const reveal = $$('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    }), {threshold:.08});
    reveal.forEach(el => io.observe(el));
  } else reveal.forEach(el => el.classList.add('visible'));

  // Active nav
  const current = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === current || (current === '' && href === 'index.html')) a.classList.add('active');
  });

  // Timeline accordions
  $$('.timeline-summary').forEach(summary => {
    summary.addEventListener('click', () => {
      const card = summary.closest('.timeline-card');
      const open = card.classList.toggle('open');
      summary.setAttribute('aria-expanded', String(open));
    });
  });

  // Project filtering
  const filterButtons = $$('.filter[data-filter]');
  if(filterButtons.length){
    const cards = $$('.project-card[data-category]');
    filterButtons.forEach(btn => btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.dataset.filter;
      cards.forEach(card => card.style.display = (key === 'all' || card.dataset.category.includes(key)) ? '' : 'none');
    }));
  }

  // Contact form -> mailto
  const form = $('#contactForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const subject = $('#subject').value.trim() || 'Website enquiry';
    const message = $('#message').value.trim();
    if(!name || !email || !message){
      showToast('Please complete your name, email and message.');
      return;
    }
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    location.href = `mailto:dhairyagogri@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast('Your email draft has been prepared.');
  });

  // Command palette
  const command = $('#command');
  const cmdInput = $('#commandInput');
  const openCommand = () => { command?.classList.add('show'); setTimeout(()=>cmdInput?.focus(),50); };
  const closeCommand = () => command?.classList.remove('show');
  $('#commandBtn')?.addEventListener('click', openCommand);
  $('#commandClose')?.addEventListener('click', closeCommand);
  command?.addEventListener('click', e => { if(e.target === command) closeCommand(); });
  document.addEventListener('keydown', e => {
    if((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'){ e.preventDefault(); openCommand(); }
    if(e.key === 'Escape') closeCommand();
  });
  cmdInput?.addEventListener('input', () => {
    const q = cmdInput.value.toLowerCase().trim();
    $$('.command-item').forEach(item => item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none');
  });

  function showToast(message){
    const toast = $('#toast');
    if(!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }

  // Small count-up animation
  $$('.count[data-to]').forEach(el => {
    const to = Number(el.dataset.to);
    if(!Number.isFinite(to)) return;
    const run = () => {
      const start = performance.now();
      const dur = 750;
      const tick = now => {
        const p = Math.min((now-start)/dur,1);
        el.textContent = Math.round(to*p);
        if(p<1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if('IntersectionObserver' in window){
      const io = new IntersectionObserver(es => { es.forEach(e => { if(e.isIntersecting){run();io.unobserve(e.target)} }) });
      io.observe(el);
    } else run();
  });
})();
