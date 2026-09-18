const fs = require('fs');

let ipo = fs.readFileSync('src/data/ipoData.js', 'utf8');
ipo = ipo.replace(/heroImage: "\/services\/ipo_[a-z_]+\.jpg"/g, 'heroImage: "/ipo.png"');
ipo = ipo.replace(/cardImage: "\/services\/ipo_[a-z_]+\.jpg"/g, 'cardImage: "/ipo.png"');
fs.writeFileSync('src/data/ipoData.js', ipo);

let branding = fs.readFileSync('src/data/brandingData.js', 'utf8');
branding = branding.replace(/image: '\/services\/branding_[a-z_]+\.jpg'/g, "image: '/branding.png'");
fs.writeFileSync('src/data/brandingData.js', branding);
