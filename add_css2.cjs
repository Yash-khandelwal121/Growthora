const fs = require('fs');
const path = require('path');

const css = `
/* -------------------------------------------------------------
   REDESIGNED BACK SIDE
------------------------------------------------------------- */
.industry-card-back {
  background: radial-gradient(circle at 12% 18%, rgba(255,126,45,.12), transparent 32%),
              radial-gradient(circle at 88% 74%, rgba(97,57,115,.06), transparent 30%),
              linear-gradient(135deg, #f9eee5 0%, #f7f1e9 52%, #efedef 100%) !important;
  border: 1.5px solid rgba(255, 114, 0, 0.08) !important;
}

.card-back-content {
  gap: 2rem !important;
  padding: 3rem 1.5rem !important;
  justify-content: space-between !important;
  height: 100% !important;
}

.back-logo-large {
  width: clamp(180px, 24%, 310px);
  height: auto;
  object-fit: contain;
  margin-top: 1rem;
}

.card-back-middle-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
}

.center-hindi-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.flip-hindi-title {
  font-size: clamp(44px, 5vw, 78px) !important;
  font-weight: 800 !important;
  line-height: 1.02 !important;
  letter-spacing: -1.5px !important;
  text-align: center !important;
}

.back-accent-line {
  width: 50px !important;
  height: 4px !important;
  background: #FF7200 !important;
  border-radius: 2px !important;
}

.side-text {
  font-size: clamp(0.7rem, 0.9vw, 0.8rem);
  font-weight: 700;
  color: #475569;
  letter-spacing: 0.1em;
  line-height: 1.5;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.right-side-text {
  text-align: right;
  align-items: flex-end;
}

.left-side-text {
  align-items: flex-start;
}

.side-accent {
  width: 24px;
  height: 2px;
  background: #FF7200;
  opacity: 0.6;
}

.back-footer {
  font-size: clamp(0.7rem, 1vw, 0.8rem) !important;
  font-weight: 700 !important;
  color: #475569 !important;
  letter-spacing: 0.15em !important;
  margin-bottom: 1rem !important;
}

/* Background graphics */
.card-back-bg-graphics {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.orbit-lines {
  position: absolute;
  top: -15%;
  right: -15%;
  width: 60%;
  aspect-ratio: 1;
  border: 1px solid rgba(15, 23, 42, 0.03);
  border-radius: 50%;
}

.orbit-lines.small {
  top: 10%;
  right: 10%;
  width: 30%;
  border: 1px solid rgba(255, 114, 0, 0.03);
}

.bg-node {
  position: absolute;
  border-radius: 50%;
}

.node-1 {
  width: 6px;
  height: 6px;
  background: rgba(255, 114, 0, 0.2);
  top: 25%;
  right: 20%;
}

.node-2 {
  width: 4px;
  height: 4px;
  background: rgba(97, 57, 115, 0.2);
  bottom: 30%;
  left: 15%;
}

.bg-arrow-up {
  position: absolute;
  left: 5%;
  top: 40%;
  opacity: 0.5;
}

.bg-skyline-silhouette {
  position: absolute;
  bottom: 0;
  right: 5%;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .card-back-middle-layout {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .side-text {
    text-align: center;
    align-items: center;
  }
  
  .card-back-content {
    gap: 1.5rem !important;
    padding: 2rem 1rem !important;
  }
}
`;

fs.appendFileSync(path.join(__dirname, 'src/styles/industries.css'), css);
