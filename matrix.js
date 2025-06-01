// matrix.js
(function() {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const hindiChars = [
    'अ','आ','इ','ई','उ','ऊ',
    'ए','ऐ','ओ','औ','क','ख',
    'ग','घ','ङ','च','छ','ज',
    'झ','ञ','ट','ठ','ड','ढ',
    'ण','त','थ','द','ध','न',
    'प','फ','ब','भ','म','य',
    'र','ल','व','श','ष','स','ह'
  ];

  const fontSize = 18;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = new Array(columns).fill(0);

  // Introduce speed variation per column for rhythm
  const speeds = new Array(columns).fill(0).map(() => Math.random() * 1.5 + 0.5);

  function draw() {
    // Use lighter black to fade older letters faster
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px "Noto Sans Devanagari", sans-serif';
    ctx.fillStyle = '#b3e5fc'; // light cyan for a subtle, ethereal glow

    for (let i = 0; i < columns; i++) {
      const text = hindiChars[Math.floor(Math.random() * hindiChars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Draw text with glow
      ctx.shadowColor = '#b3e5fc';
      ctx.shadowBlur = 4;
      ctx.fillText(text, x, y);
      ctx.shadowBlur = 0; // reset

      // Reset drop to top randomly
      if (y > canvas.height || Math.random() > 0.98) {
        drops[i] = 0;
      } else {
        drops[i] += speeds[i]; // apply speed variation
      }
    }
  }

  setInterval(draw, 50);
})();
