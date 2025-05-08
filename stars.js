const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 1200;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const hero = document.querySelector('.hero'); // Adjust selector if needed

  const width = window.innerWidth;
  const height = hero.scrollHeight; // Get full height of the hero section

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  createGalaxy(); // Refresh star positions
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Generate stars across the entire canvas
function createGalaxy() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    stars.push({
      x: x,
      y: y,
      radius: Math.random() * 1.5,
      color: ['#ffffff', '#ffccff', '#ccffff', '#ffe6cc', '#e5ccff'][Math.floor(Math.random() * 5)],
      speed: 0.005 + Math.random() * 0.02,
      opacity: Math.random() * 0.7 + 0.3,
      opacitySpeed: Math.random() * 0.02 + 0.005
    });
  }
}

function animate() {
  ctx.fillStyle = 'rgba(10, 10, 35, 0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.opacity += star.opacitySpeed;
    if (star.opacity <= 0.2 || star.opacity >= 0.8) {
      star.opacitySpeed = -star.opacitySpeed;
    }

    if (Math.random() < 0.005) {
      star.radius = Math.random() * 1.5;
    }

    ctx.beginPath();
    ctx.fillStyle = star.color;
    ctx.shadowBlur = 5;
    ctx.shadowColor = star.color;
    ctx.globalAlpha = star.opacity;
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1.0;
  });

  requestAnimationFrame(animate);
}

animate();
