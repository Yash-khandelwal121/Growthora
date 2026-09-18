const fs = require('fs');

const css = \
/* -------------------------------------------------------------
   3D FLIP HERO IMAGE CARD
------------------------------------------------------------- */
.industry-flip-scene {
  perspective: 1400px;
  width: 100%;
  margin-bottom: 2rem;
}

.industry-flip-hint {
  display: none;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748B;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

@media (min-width: 1024px) {
  .industry-flip-hint {
    display: block;
  }
}

.industry-flip-card {
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.8s ease;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08), 0 0 35px rgba(255, 107, 0, 0.1);
  outline: none;
  cursor: pointer;
}

.industry-flip-card.is-flipped {
  transform: rotateY(180deg) scale(1.01);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.15), 0 0 55px rgba(255, 107, 0, 0.2);
}

.industry-card-front {
  position: relative;
  width: 100%;
  height: auto;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 24px;
  overflow: hidden;
  /* Retain exact front image look */
  border: 1.5px solid rgba(15, 23, 42, 0.12);
  background: transparent;
}

.industry-card-front img {
  display: block;
  width: 100%;
  height: auto;
}

.industry-card-back {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 24px;
  overflow: hidden;
  transform: rotateY(180deg);
  background: radial-gradient(circle at 15% 30%, rgba(255,126,45,.10), transparent 35%),
              radial-gradient(circle at 88% 72%, rgba(105,84,145,.05), transparent 32%),
              linear-gradient(135deg, #f9eee5 0%, #f5efe7 55%, #efedef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 1.5px solid rgba(255, 114, 0, 0.1);
}

.card-back-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  position: relative;
  z-index: 2;
  text-align: center;
  width: 100%;
}

.back-logo {
  height: 44px;
  width: auto;
  object-fit: contain;
  margin-bottom: 1rem;
}

.flip-hindi-title {
  font-size: clamp(40px, 4.5vw, 72px);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -1.5px;
  text-align: center;
}

.hindi-dark {
  color: #0F172A;
}

.hindi-orange {
  color: #FF7200;
}

.back-accent-line {
  width: 60px;
  height: 4px;
  background: #FF7200;
  border-radius: 2px;
  margin: 0.5rem 0;
}

.back-footer {
  font-size: clamp(0.7rem, 1.2vw, 0.85rem);
  font-weight: 700;
  color: #64748B;
  letter-spacing: 0.15em;
  margin-top: 1rem;
}

.back-orbit-deco {
  position: absolute;
  border: 1px solid rgba(15, 23, 42, 0.04);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

.back-orbit-deco:not(.deco-2) {
  width: 300px;
  height: 300px;
  top: -50px;
  right: -50px;
}

.back-orbit-deco.deco-2 {
  width: 500px;
  height: 500px;
  bottom: -100px;
  left: -100px;
  border: 1px solid rgba(255, 114, 0, 0.05);
}

@media (prefers-reduced-motion: reduce) {
  .industry-flip-card {
    transition: none;
  }
}

@media (max-width: 768px) {
  .back-logo {
    height: 32px;
  }
  .card-back-content {
    gap: 1rem;
  }
}
\;

fs.appendFileSync('src/styles/industries.css', css);

