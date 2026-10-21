/*
  GROWTHORA — RIGHT-SIDE ENDLESS OPPORTUNITIES — 449.2 × 528.4
  Replace ONLY src/pages/PopupPage.jsx with this complete file.
  React + react-simple-maps. All styles are included below.
  Leave existing header, routes and other pages unchanged.
*/
import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const INDIA_GEOJSON =
  "https://raw.githubusercontent.com/AbhinavSwami28/india-official-geojson/main/india-states-simplified.geojson";

// Coordinates are real [longitude, latitude], not arbitrary pixel positions.
// Replace the photo URLs with licensed /images/cities/*.webp assets when ready.
// Jaipur: Jal Mahal by Ritesh Salian; Pune: Aga Khan Palace by Mrigank Das.
// Wikimedia Commons: Jaipur CC BY-SA 3.0; Pune CC BY-SA 4.0. Attribution + share-alike apply.
// Jaipur: https://commons.wikimedia.org/wiki/File:Jal_Mahal_@Jaipur.JPG
// Pune:   https://commons.wikimedia.org/wiki/File:Aga_Khan_Palace,_Pune.jpg
const CITIES = [
  {
    name: "Jaipur", coords: [75.7873, 26.9124],
    photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Jal_Mahal_%40Jaipur.JPG?width=960",
  },
  {
    name: "Lucknow", coords: [80.9462, 26.8467],
    photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Sunset_view_of_Rumi_Darwaza_and_Asafi_Imambara%2C_Lucknow.jpg?width=1200",
  },
  {
    name: "Ahmedabad", coords: [72.5714, 23.0225],
    photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Sabarmati_riverfront_and_Atal_Pedestrian_Bridge_06.jpg?width=1200",
  },
  {
    name: "Pune", coords: [73.8567, 18.5204],
    photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Aga_Khan_Palace%2C_Pune.jpg?width=960",
  },
  {
    name: "Bengaluru", coords: [77.5946, 12.9716],
    photo: "https://commons.wikimedia.org/wiki/Special:FilePath/UB_City_Skyline.jpg?width=1200",
  },
  {
    name: "Chennai", coords: [80.2707, 13.0827],
    photo: "https://commons.wikimedia.org/wiki/Special:FilePath/Chennai_central_view.jpg?width=1200",
  },
];

// Map is shown only once after mounting. Then only photographs rotate.
const MAP_INTRO_MS = 4000;
const PHOTO_INTERVAL_MS = 4000;

const CSS = `
.gp7-page { display:flex; justify-content:center; padding:18px 12px; min-height:100vh;
  box-sizing:border-box; background:#f7f6f2; font-family:Arial,sans-serif; }
.gp7-card { isolation:isolate; position:relative; width:449.2px; max-width:100%;
  height:528.4px; max-height:528.4px; min-height:0; flex-shrink:0; overflow:hidden; box-sizing:border-box;
  border:1px solid #dae6df; border-radius:18px; padding:12px 13px;
  background:#fffefa; color:#0f4d3f; box-shadow:0 12px 34px rgba(15,77,63,.1); }
.gp7-bg { position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden;
  background:#e7e9e4; }
.gp7-photo { position:absolute; left:0; top:22%; width:100%; height:78%;
  display:block; object-fit:cover; object-position:center 50%; }
.gp7-shade { position:absolute; inset:0; background:linear-gradient(to bottom,
  #fffefa 0%, rgba(255,254,250,.98) 16%, rgba(255,254,250,.90) 27%,
  rgba(255,254,250,.38) 43%, rgba(255,254,250,.05) 60%, transparent 72%); }
.gp7-photo-fade { animation:gp7Fade .5s ease both; }
@keyframes gp7Fade { from {opacity:.4} to {opacity:1} }
.gp7-inner { height:100%; position:relative; z-index:1; display:grid; min-height:0;
  grid-template-rows:32px 94px 34px minmax(0,1fr) 47px; gap:4px; }
.gp7-header { display:flex; align-items:center; justify-content:space-between;
  gap:6px; min-width:0; }
.gp7-logo { display:block; width:175px; max-width:49%; height:36px;
  object-fit:contain; object-position:left center; background:transparent;
  filter:url(#gp7-white-key); }
.gp7-hindi { max-width:49%; color:#0f4d3f; font-size:12px; font-weight:800;
  text-decoration:none; text-align:right; line-height:1.2; }
.gp7-hindi:hover { color:#f97316; }
.gp7-title { min-width:0; }
/* Two-column headline: left = ONE VISION / ONE INDIA,
   right = ENDLESS / OPPORTUNITIES. No extra row below. */
.gp7-title h1.gp7-headline { display:grid; grid-template-columns:minmax(0, 43fr) minmax(0, 57fr);
  align-items:start; gap:7px; width:100%; margin:0; font-size:21px;
  letter-spacing:-.4px; line-height:1.03; font-weight:900; color:#111b40; }
.gp7-headline-left,.gp7-headline-right { display:block; min-width:0; white-space:nowrap; }
.gp7-headline-right { text-align:right; }
.gp7-title h1 .gp7-orange { color:#f97316; font-size:inherit; }
.gp7-title p { margin:6px 0 0; font-size:9.5px; font-weight:700;
  line-height:1.2; color:#234786; }
.gp7-title p .gp7-promise { color:#f97316; }
.gp7-presence { display:flex; flex-direction:column; align-items:center;
  justify-content:center; gap:4px; min-width:0; padding:3px 6px;
  background:rgba(255,254,250,.76); border-radius:12px; }
.gp7-presence strong { font-size:10px; letter-spacing:.35px; text-align:center; }
.gp7-names { display:flex; flex-wrap:wrap; justify-content:center; align-items:center;
  gap:2px 8px; font-size:9px; font-weight:700; line-height:1.1; }
.gp7-names span + span::before { content:'•'; color:#f97316; margin-right:7px; }
.gp7-map-stage { width:100%; height:100%; min-height:0; min-width:0; }
.gp7-map { width:100%; height:100%; min-height:0; min-width:0; animation:gp7MapAppear .45s ease both; }
@keyframes gp7MapAppear { from{opacity:0;transform:scale(.985)} to{opacity:1;transform:scale(1)} }
.gp7-intro-prompt { display:flex; align-items:center; justify-content:center; width:100%; height:100%; }
.gp7-intro-prompt .gp7-map { flex:1; }
.gp7-intro-background { position:absolute; inset:0; z-index:0; pointer-events:none;
  background:linear-gradient(180deg,#fffefa 0%,#fffefa 34%,#eef3ef 85%,#e6eee7 100%); }
.gp7-intro-city { opacity:.75; }

.gp7-map svg { width:100%; height:100%; display:block; }
.gp7-marker { cursor:pointer; outline:none; }
.gp7-marker:focus-visible .gp7-hit { stroke:#f97316; stroke-width:2; }
.gp7-pulse { transform-box:fill-box; transform-origin:center; animation:gp7Pulse 2.2s ease-out infinite; }
@keyframes gp7Pulse { 0% {opacity:.48;transform:scale(.75)} 75%,100% {opacity:0;transform:scale(1.8)} }
.gp7-city-caption {
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  position:relative; align-self:stretch; box-sizing:border-box;
  width:200px; max-width:95%; min-width:0; min-height:0;
  height:100%; margin:0 auto; padding:6px 12px;
  border-radius:12px; text-align:center; overflow:visible;
  background:rgba(255,227,200,.94); color:#79370c;
  border:1px solid rgba(245,149,72,.4);
  box-shadow:0 2px 9px rgba(80,45,12,.08);
}
.gp7-city-caption strong {
  display:block; font-size:14px; letter-spacing:.35px;
  line-height:1.25; white-space:nowrap; margin:0;
}
.gp7-city-caption small {
  display:block; font-size:9.5px; line-height:1.25;
  margin-top:3px; white-space:nowrap; color:#713c1e;
}
@media(max-width:480px) {
 .gp7-card { width:calc(100vw - 24px); height:calc((100vw - 24px) * 1.17631345);
   max-height:none; padding:9px 10px; border-radius:14px; }
 .gp7-inner { grid-template-rows:26px 78px 35px minmax(0,1fr) 42px; gap:3px; }
 .gp7-logo { height:26px; width:140px; }
 .gp7-hindi { font-size:10px; }
 .gp7-title h1.gp7-headline { font-size:16.5px; gap:5px; }
 .gp7-title p { margin-top:4px; font-size:8px; line-height:1.17; }
 .gp7-presence strong { font-size:8px; }
 .gp7-names { font-size:7px; gap:1px 4px; }
 .gp7-names span + span::before { margin-right:5px; }
 .gp7-city-caption { width:180px; max-width:95%; padding:5px 8px; }
 .gp7-city-caption strong { font-size:12px; }
 .gp7-city-caption small { font-size:8px; }
}
@media(prefers-reduced-motion:reduce) {
 .gp7-photo-fade,.gp7-pulse,.gp7-map { animation:none; }
}
`;

const LEFT_LABELS = new Set(["Jaipur", "Ahmedabad", "Pune", "Bengaluru"]);

function IndiaCityMap({ activeName, onHover, onSelect }) {
  return (
    <div className="gp7-map">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [82.8, 21.8], scale: 480 }}
        width={360}
        height={300}
        aria-label="India map highlighting one of six Growthora cities"
      >
        <Geographies geography={INDIA_GEOJSON}>
          {({ geographies }) => geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#d6e3da"
              fillOpacity={0.79}
              stroke="#ffffff"
              strokeWidth={0.8}
              style={{
                default: { outline: "none" },
                hover: { outline: "none" },
                pressed: { outline: "none" },
              }}
            />
          ))}
        </Geographies>
        {CITIES.map((city) => {
          const active = city.name === activeName;
          const left = LEFT_LABELS.has(city.name);
          const southern = city.name === "Bengaluru" || city.name === "Chennai";
          return (
            <Marker
              key={city.name}
              coordinates={city.coords}
              className="gp7-marker"
              tabIndex={0}
              role="button"
              aria-label={`Show ${city.name} city background`}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse" || event.pointerType === "pen") {
                  onHover(city.name);
                }
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse" || event.pointerType === "pen") {
                  onHover(null);
                }
              }}
              onFocus={() => onHover(city.name)}
              onBlur={() => onHover(null)}
              onClick={() => onSelect(city.name)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(city.name);
                }
              }}
            >
              {/* Larger transparent hit target, visible green/orange marker. */}
              <circle className="gp7-hit" r={14} fill="transparent" stroke="transparent" />
              {active && <circle className="gp7-pulse" r={12} fill="#f97316" />}
              <circle
                r={active ? 7 : 5.5}
                fill={active ? "#f97316" : "#0f4d3f"}
                stroke="#ffffff"
                strokeWidth={2}
              />
              <text
                dx={left ? -10 : 10}
                dy={southern ? 15 : -9}
                textAnchor={left ? "end" : "start"}
                fontSize={active ? 11 : 9.5}
                fontWeight={active ? 800 : 700}
                fill={active ? "#f97316" : "#0f4d3f"}
                style={{
                  pointerEvents: "none",
                  paintOrder: "stroke",
                  stroke: "#ffffff",
                  strokeWidth: 3.4,
                  strokeLinejoin: "round",
                }}
              >
                {city.name}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}

function GrowthoraBanner() {
  const [index, setIndex] = useState(0);
  const [showIntroMap, setShowIntroMap] = useState(true);

  // 1) A one-time India map introduction. The map does NOT return every cycle.
  useEffect(() => {
    const timeout = window.setTimeout(() => setShowIntroMap(false), MAP_INTRO_MS);
    return () => window.clearTimeout(timeout);
  }, []);

  // 2) Start the photo slideshow only AFTER the introduction is finished.
  useEffect(() => {
    if (showIntroMap) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % CITIES.length);
    }, PHOTO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [showIntroMap]);

  // Preload city photographs so the transitions are smoother.
  useEffect(() => {
    CITIES.forEach(({ photo }) => {
      const preload = new Image();
      preload.src = photo;
    });
  }, []);

  // A visitor can skip the introduction by clicking one of the map markers.
  const openSelectedCity = (name) => {
    const target = CITIES.findIndex((city) => city.name === name);
    if (target === -1) return;
    setIndex(target);
    setShowIntroMap(false);
  };

  const activeCity = CITIES[index];

  return (
    <section className="gp7-card" aria-label="Growthora presence in six Indian cities">
      {/* Transparent appearance for the existing Growthora logo. */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{position:"absolute"}}>
        <filter id="gp7-white-key" colorInterpolationFilters="sRGB">
          <feColorMatrix
            in="SourceGraphic" type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 0 3"
            result="keyed"
          />
          <feComposite in="keyed" in2="SourceAlpha" operator="in" />
        </filter>
      </svg>

      {/* Show a clean map first; then show the full-height city photo background. */}
      {showIntroMap ? (
        <div className="gp7-intro-background" aria-hidden="true" />
      ) : (
        <div className="gp7-bg" aria-hidden="true">
          <img
            key={activeCity.name}
            src={activeCity.photo}
            alt=""
            className="gp7-photo gp7-photo-fade"
            loading="eager"
          />
          <div className="gp7-shade" />
        </div>
      )}

      <div className="gp7-inner">
        <header className="gp7-header">
          {/* Keep this original Growthora asset path as in your project. */}
          <img src="/growthora-logo.webp" className="gp7-logo" alt="Growthora" />
          <a href="https://growthora.co.in/" className="gp7-hindi" lang="hi">
            हम बढ़ाएँ आपका बिज़नेस
          </a>
        </header>

        <div className="gp7-title">
          <h1 className="gp7-headline">
            <span className="gp7-headline-left">
              ONE VISION.<br />
              <span className="gp7-orange">ONE INDIA.</span>
            </span>
            <span className="gp7-headline-right">
              ENDLESS<br />
              <span className="gp7-orange">OPPORTUNITIES.</span>
            </span>
          </h1>
          <p>
            Your Ambition. Our Expertise. Your Growth.<br />
            From Startup Dreams to Business Success —<br />
            <span className="gp7-promise">We Make Growth Possible.</span>
          </p>
        </div>

        <div className="gp7-presence">
          <strong>OUR PRESENCE ACROSS 6 INDIAN CITIES</strong>
          <div className="gp7-names">
            {CITIES.map((city) => <span key={city.name}>{city.name}</span>)}
          </div>
        </div>

        {/* First four seconds: large interactive map. Later: only city photos. */}
        <div className="gp7-map-stage">
          {showIntroMap && (
            <IndiaCityMap
              activeName={null}
              onHover={() => {}}
              onSelect={openSelectedCity}
            />
          )}
        </div>

        <div className="gp7-city-caption" aria-live="polite">
          <div>
            {showIntroMap ? (
              <>
                <strong>📍 SIX INDIAN CITIES</strong>
                <small>Growthora Across India</small>
              </>
            ) : (
              <>
                <strong>📍 {activeCity.name.toUpperCase()}</strong>
                <small>Growthora Presence</small>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PopupPage() {
  return (
    <main className="gp7-page">
      <style>{CSS}</style>
      <GrowthoraBanner />
    </main>
  );
}
