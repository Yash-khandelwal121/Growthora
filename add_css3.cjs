const fs = require('fs');
const path = require('path');

const css = `
/* -------------------------------------------------------------
   IMAGE BACK SIDE
------------------------------------------------------------- */
.industry-card-back {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  transform: rotateY(180deg) !important;
  backface-visibility: hidden !important;
  -webkit-backface-visibility: hidden !important;
  overflow: hidden !important;
  border-radius: inherit !important;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  display: block !important;
}

.industry-flip-back-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  border-radius: inherit;
}
`;

fs.appendFileSync(path.join(__dirname, 'src/styles/industries.css'), css);
