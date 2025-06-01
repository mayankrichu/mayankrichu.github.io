// matrix.js
(function() {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(0);
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
  let columns = Math.floor(canvas.width / fontSize);
  let drops = new Array(columns).fill(0);

  function draw() {
    // Slightly opaque black to fade old letters
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px "Noto Sans Devanagari", sans-serif';
    ctx.fillStyle = '#FFF';

    for (let i = 0; i < columns; i++) {
      const text = hindiChars[Math.floor(Math.random() * hindiChars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(text, x, y);

      if (y > canvas.height || Math.random() > 0.975) {
        drops[i] = 0;
      } else {
        drops[i]++;
      }
    }
  }

  setInterval(draw, 50);
})();
