(() => {
  'use strict';
  const filters = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('.project')];
  const status = document.querySelector('#filter-status');
  const names = { all:'전체', web:'웹', app:'앱', upcoming:'개발 예정' };
  filters.forEach(button => button.addEventListener('click', () => {
    const kind = button.dataset.filter;
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    let shown = 0;
    projects.forEach(project => {
      const visible = kind === 'all' || project.dataset.kind === kind || (kind === 'upcoming' && project.dataset.status === 'upcoming');
      project.hidden = !visible;
      if (visible) shown++;
    });
    status.textContent = `${names[kind]} 서비스 ${shown}개를 표시합니다.`;
  }));
  let lastOpener = null;
  const dialogs = [...document.querySelectorAll('dialog')];
  document.querySelectorAll('[data-dialog]').forEach(opener => opener.addEventListener('click', () => {
    const dialog = document.getElementById(opener.dataset.dialog);
    if (!dialog) return;
    lastOpener = opener;
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
  }));
  dialogs.forEach(dialog => {
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.documentElement.style.overflow = '';
      lastOpener?.focus({ preventScroll: true });
    });
  });
})();
