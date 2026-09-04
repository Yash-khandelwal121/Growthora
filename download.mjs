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

const images = [
  // Logo Design — brand identity / creative design workspace
  { url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1000&q=85&fit=crop', file: 'branding_logo.jpg' },
  // Website Development — modern laptop/web interface
  { url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1000&q=85&fit=crop', file: 'branding_website.jpg' },
  // SEO — analytics charts / data growth
  { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=85&fit=crop', file: 'branding_seo.jpg' },
  // Social Media Marketing — social / content creation
  { url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1000&q=85&fit=crop', file: 'branding_social.jpg' },
  // Ads & Lead Generation — digital advertising
  { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=85&fit=crop', file: 'branding_ads.jpg' },
  // Branding Solutions — full brand identity system
  { url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1000&q=85&fit=crop', file: 'branding_brand.jpg' },
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
