import https from 'https';
import fs from 'fs';

const download = (url, path) => {
  return new Promise((resolve, reject) => {
    const doRequest = (u) => {
      https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          doRequest(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Status ${res.statusCode} for ${u}`));
          return;
        }
        const file = fs.createWriteStream(path);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(path); });
      }).on('error', reject);
    };
    doRequest(url);
  });
};

// Replacement images - proper finance/business themed
const images = [
  // ff_industry: Professional business handshake / corporate deal
  { url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=85&fit=crop', file: 'ff_industry.jpg' },
  // ff_textile: Indian currency / rupees / money stacks — great for grants
  { url: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=900&q=85&fit=crop', file: 'ff_textile.jpg' },
];

(async () => {
  for (const img of images) {
    try {
      await download(img.url, `public/services/${img.file}`);
      const size = fs.statSync(`public/services/${img.file}`).size;
      console.log(`✅ ${img.file} (${Math.round(size/1024)}KB)`);
    } catch (e) {
      console.error(`❌ ${img.file}: ${e.message}`);
    }
  }
  console.log('Done!');
})();
