import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const itemObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-section').forEach(s => sectionObs.observe(s));
    document.querySelectorAll('.reveal-item').forEach(el => itemObs.observe(el));

    return () => {
      sectionObs.disconnect();
      itemObs.disconnect();
    };
  }, []);
}
