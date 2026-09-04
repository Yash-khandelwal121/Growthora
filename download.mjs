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
  // LLP — business partnership / handshake / corporate
  { url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=85&fit=crop', file: 'reg_llp_hero.jpg' },
  // Proprietorship — solo entrepreneur / small business
  { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85&fit=crop', file: 'reg_prop_hero.jpg' },
  // Private Limited — corporate office / modern company
  { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=85&fit=crop', file: 'reg_pvt_hero.jpg' },
  // Partnership Firm — two business people / agreement
  { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85&fit=crop', file: 'reg_partner_hero.jpg' },
  // Trademark — brand identity / intellectual property
  { url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=85&fit=crop', file: 'reg_tm_hero.jpg' },
  // GST — tax / invoice / financial compliance
  { url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=85&fit=crop', file: 'reg_gst_hero.jpg' },
  // MSME/Udyam — small manufacturing / MSME
  { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=85&fit=crop', file: 'reg_msme_hero.jpg' },
  // GeM Registration — government/digital procurement
  { url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=85&fit=crop', file: 'reg_gem_hero.jpg' },
  // Company Registration — corporate building / incorporation
  { url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=85&fit=crop', file: 'reg_company_hero.jpg' },
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
  console.log('All done!');
})();
