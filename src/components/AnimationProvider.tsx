import { useEffect, useRef } from 'react';

// Floating particle config
const PARTICLE_COUNT = 22;

const AnimationProvider = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // ── Cursor glow ──
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top  = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // ── Scroll progress bar ──
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Floating particles ──
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const hue  = Math.random() > 0.5 ? '210' : '270'; // blue or purple
      p.className = 'particle';
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}vw;
        bottom: -10px;
        background: hsl(${hue}, 80%, 65%);
        animation-duration: ${Math.random() * 18 + 12}s;
        animation-delay: ${Math.random() * 12}s;
      `;
      container.appendChild(p);
      particles.push(p);
    }

    return () => particles.forEach((p) => p.remove());
  }, []);

  // ── Section heading underline grow ──
  useEffect(() => {
    const headings = document.querySelectorAll('.section-heading');
    headings.forEach((h) => h.classList.add('section-heading-animated'));

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('active');
      }),
      { threshold: 0.3 }
    );
    headings.forEach((h) => obs.observe(h));
    return () => headings.forEach((h) => obs.unobserve(h));
  }, []);

  // ── Stagger children observer ──
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('active');
      }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.stagger-children').forEach((el) => obs.observe(el));
    return () => document.querySelectorAll('.stagger-children').forEach((el) => obs.unobserve(el));
  }, []);

  // ── Skill bar fill on scroll ──
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('animate');
      }),
      { threshold: 0.4 }
    );
    document.querySelectorAll('.skill-bar-fill').forEach((el) => obs.observe(el));
    return () => document.querySelectorAll('.skill-bar-fill').forEach((el) => obs.unobserve(el));
  }, []);

  // ── Counter animation ──
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>('[data-count]');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el     = e.target as HTMLElement;
        const target = parseInt(el.dataset.count || '0', 10);
        const suffix = el.dataset.suffix || '';
        let current  = 0;
        const step   = Math.ceil(target / 40);
        const timer  = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, 40);
        obs.unobserve(el);
      }),
      { threshold: 0.5 }
    );
    counters.forEach((el) => obs.observe(el));
    return () => counters.forEach((el) => obs.unobserve(el));
  }, []);

  // ── Magnetic button effect ──
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLElement>('.magnetic-btn');
    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    buttons.forEach((btn) => {
      const move = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width  / 2;
        const y = e.clientY - rect.top  - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      };
      const leave = () => { btn.style.transform = ''; };
      btn.addEventListener('mousemove', move);
      btn.addEventListener('mouseleave', leave);
      handlers.push({ el: btn, move, leave });
    });

    return () => handlers.forEach(({ el, move, leave }) => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
    });
  }, []);

  // ── Page load fade-in ──
  useEffect(() => {
    document.body.classList.add('page-enter');
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div ref={progressRef} className="scroll-progress" style={{ width: '0%' }} />

      {/* Cursor glow */}
      <div ref={cursorRef} className="cursor-glow hidden md:block" />

      {/* Floating particles container */}
      <div
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />
    </>
  );
};

export default AnimationProvider;
