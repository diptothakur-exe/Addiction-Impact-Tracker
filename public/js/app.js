// Optional client-side enhancements
// Main logic lives server-side in NestJS

document.addEventListener('DOMContentLoaded', () => {
  // Animate meter fill on report page
  const meter = document.querySelector('.meter-fill');
  if (meter) {
    const target = meter.style.width;
    meter.style.width = '0%';
    requestAnimationFrame(() => {
      setTimeout(() => { meter.style.width = target; }, 100);
    });
  }

  // Animate part bars
  document.querySelectorAll('.part-bar').forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = target; }, 200);
  });
});
