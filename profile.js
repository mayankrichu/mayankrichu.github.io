// profile.js
(function() {
  const canvas = document.getElementById('profile-canvas');
  const ctx = canvas.getContext('2d');

  // Load your profile photo (must be in the same directory or adjust the path)
  const img = new Image();
  img.src = '773a9346c38b9dd3b1566774b7748dc08bc7605ab94982fc19d8745d04671867.jpg';
  img.crossOrigin = "Anonymous"; // In case you serve from a CDN or different domain

  img.onload = function() {
    // We want the final canvas to be 120x120 px (to match CSS)
    const finalSize = 120;
    canvas.width = finalSize;
    canvas.height = finalSize;

    // Create an off-screen canvas to draw and sample the original image
    const off = document.createElement('canvas');
    const offCtx = off.getContext('2d');
    off.width = finalSize;
    off.height = finalSize;

    // Draw the image scaled down to 120x120
    offCtx.drawImage(img, 0, 0, finalSize, finalSize);

    // Extract the image data (grayscale conversion will happen per-block)
    const imageData = offCtx.getImageData(0, 0, finalSize, finalSize);
    const data = imageData.data;

    // Define a small grid size for higher detail (e.g., 6 px blocks)
    const blockSize = 6;
    const cols = Math.floor(finalSize / blockSize);
    const rows = Math.floor(finalSize / blockSize);

    // Devanagari palette: from “dense+dark” to “light+airy” to space
    // You can reorder or substitute letters to tweak appearance.
    const chars = [
      'म','न','व','त','स','श','र','ल','द','आ',
      'इ','उ','ए','ओ','अ',' ' // A space for very bright blocks
    ];

    // Before drawing characters, clip to a circle
    ctx.clearRect(0, 0, finalSize, finalSize);
    ctx.save();
    ctx.beginPath();
    ctx.arc(finalSize / 2, finalSize / 2, finalSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Set text properties
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = blockSize + 'px "Noto Sans Devanagari", sans-serif';

    // Loop over each block
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Compute the pixel index in the original image data
        const x = col * blockSize;
        const y = row * blockSize;
        const idx = (y * finalSize + x) * 4;

        // Get the average brightness of this block (RGB → grayscale)
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const brightness = (r + g + b) / 3; // 0 (black) to 255 (white)

        // Map brightness to an index in chars[] (0 = darkest, last = brightest)
        // Invert brightness so dark areas get “dense” chars
        const charIndex = Math.floor((255 - brightness) / 255 * (chars.length - 1));
        const ch = chars[charIndex];

        // Draw the character in light cyan (or white, or any color you prefer)
        ctx.fillStyle = '#b3e5fc'; 
        ctx.shadowColor = '#b3e5fc';
        ctx.shadowBlur = 2; 

        // Center of this block
        const cx = x + blockSize / 2;
        const cy = y + blockSize / 2;

        ctx.fillText(ch, cx, cy);
        ctx.shadowBlur = 0; // reset for next iteration
      }
    }

    // Restore (undo the circular clip path)
    ctx.restore();
  };

  // If image fails to load, show a plain colored circle instead
  img.onerror = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(finalSize / 2, finalSize / 2, finalSize / 2, 0, Math.PI * 2);
    ctx.fill();
  };
})();
