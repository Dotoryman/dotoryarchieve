(() => {
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.app-item,.hero-copy').forEach(surface => {
    surface.addEventListener('pointermove', event => {
      if (!hover.matches || reduced.matches) return;
      const rect = surface.getBoundingClientRect();
      surface.style.setProperty('--shine-x', ((event.clientX - rect.left) / rect.width * 100).toFixed(1) + '%');
      surface.style.setProperty('--shine-y', ((event.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
    });
  });
  document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('pointermove', event => {
      if (!hover.matches || reduced.matches) return;
      const bounds = item.querySelector('.app-icon').getBoundingClientRect();
      const x = Math.max(-.5, Math.min(.5, (event.clientX - bounds.left) / bounds.width - .5));
      const y = Math.max(-.5, Math.min(.5, (event.clientY - bounds.top) / bounds.height - .5));
      item.style.setProperty('--tilt-x', (-y * 9).toFixed(2) + 'deg');
      item.style.setProperty('--tilt-y', (x * 9).toFixed(2) + 'deg');
    });
    item.addEventListener('pointerleave', () => {
      item.style.removeProperty('--tilt-x');
      item.style.removeProperty('--tilt-y');
    });
  });
})();
