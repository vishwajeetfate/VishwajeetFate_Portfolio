const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 1200; // more for richer galaxy

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ctx.setTransform(1, 0, 0, 1, 0, 0); 
  ctx.scale(dpr, dpr);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create random star positions across the entire canvas
function createGalaxy() {
  stars = [];
  
  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * canvas.width; // Random X position across the canvas
    const y = Math.random() * canvas.height; // Random Y position across the canvas

    stars.push({
      x: x,
      y: y,
      radius: Math.random() * 1.5,
      color: ['#ffffff', '#ffccff', '#ccffff', '#ffe6cc', '#e5ccff'][Math.floor(Math.random() * 5)],
      speed: 0.005 + Math.random() * 0.02, // Smoother slow drift outward
      opacity: Math.random() * 0.7 + 0.3, // Initial opacity
      opacitySpeed: Math.random() * 0.02 + 0.005 // Speed of opacity change
    });
  }
}

createGalaxy();

function animate() {
  ctx.fillStyle = 'rgba(10, 10, 35, 0.3)'; // dark blue-black sky
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    // Randomize opacity for twinkling effect
    star.opacity += star.opacitySpeed;
    if (star.opacity <= 0.2 || star.opacity >= 0.8) {
      star.opacitySpeed = -star.opacitySpeed;
    }

    // Randomize star size to add pulsing effect
    if (Math.random() < 0.005) {
      star.radius = Math.random() * 1.5;
    }

    // Draw the star
    ctx.beginPath();
    ctx.fillStyle = star.color;
    ctx.shadowBlur = 5;
    ctx.shadowColor = star.color;
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  requestAnimationFrame(animate);
}

animate();
