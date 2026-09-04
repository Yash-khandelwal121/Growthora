import https from 'https';
import fs from 'fs';

const download = (url, path) => {
  return new Promise((resolve, reject) => {
    const doRequest = (u) => {
      https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) { doRequest(res.headers.location); return; }
        if (res.statusCode !== 200) { reject(new Error(`Status ${res.statusCode} for ${u}`)); return; }
        const file = fs.createWriteStream(path);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(path); });
      }).on('error', reject);
    };
    doRequest(url);
  });
};

(async () => {
  try {
    // Professional business person / handshake — for DUNS
    await download('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=85&fit=crop', 'public/services/cert_duns.jpg');
    const size = fs.statSync('public/services/cert_duns.jpg').size;
    console.log(`✅ cert_duns.jpg (${Math.round(size/1024)}KB)`);
  } catch (e) {
    console.error(`❌ cert_duns.jpg: ${e.message}`);
  }
})();
