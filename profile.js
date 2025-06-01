
// profile.js
(function() {
  const canvas = document.getElementById('profile-canvas');
  const ctx = canvas.getContext('2d');

  const img = new Image();
  img.src = '773a9346c38b9dd3b1566774b7748dc08bc7605ab94982fc19d8745d04671867.jpg';  // your uploaded image

  img.onload = function() {
    const size = 120;  // match your CSS width/height
    canvas.width = size;
    canvas.height = size;

    // Draw original image
    ctx.drawImage(img, 0, 0, size, size);

    // Get image data
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    ctx.font = "8px 'Noto Sans Devanagari', sans-serif";
    ctx.fillStyle = "#fff";

    // Loop through pixels
    for (let y = 0; y < size; y += 8) {
      for (let x = 0; x < size; x += 8) {
        const index = (y * size + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const brightness = (r + g + b) / 3;

        // Map brightness to characters
        const chars = ['१', '२', '३', '४', '५', '६', '७', '८', '९', '०'];
        const char = chars[Math.floor((255 - brightness) / 25)];

        ctx.fillText(char, x, y + 8);  // Adjust Y for baseline
      }
    }
  };
})();
