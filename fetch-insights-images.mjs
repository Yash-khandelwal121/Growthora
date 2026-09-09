import https from 'https';
import fs from 'fs';

const replacements = [
  { slug: '80-iac-tax-exemption-startup-india', query: 'startup office modern working' },
  { slug: 'zed-certification-msme-guide', query: 'manufacturing factory quality inspection machine' },
  { slug: 'duns-number-global-business-guide', query: 'global shipping cargo container port' },
  { slug: 'iso-certification-complete-guide-2026', query: 'quality control industrial worker clipboard' },
  { slug: '100-crore-business-roadmap-india', query: 'corporate boardroom strategy meeting' },
  { slug: 'breaking-5-crore-revenue-plateau-india', query: 'business growth chart whiteboard presentation' },
  { slug: 'private-limited-vs-llp-vs-opc-india', query: 'business handshake contract agreement signing' },
  { slug: 'gst-compliance-msme-2026', query: 'accounting tax laptop documents calculator' },
  { slug: 'pmfme-scheme-food-processing-subsidy', query: 'food processing factory production line' },
  { slug: 'gem-registration-msme-2026', query: 'government building office' },
  { slug: 'stand-up-india-scheme-2026', query: 'women entrepreneur business owner' },
  { slug: 'mudra-loan-vs-cgtmse-2026', query: 'small business owner loan money' }
];

(async () => {
  for (const item of replacements) {
    const searchUrl = 'https://unsplash.com/s/photos/' + encodeURIComponent(item.query);
    console.log('Searching for:', item.query);
    
    await new Promise((resolve) => {
      https.get(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        let html = '';
        res.on('data', d => html += d);
        res.on('end', () => {
          const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+(\?ixlib=rb-4\.0\.3&amp;[^\"]+)/g;
          const matches = html.match(regex);
          if (matches && matches.length > 0) {
            const uniqueUrls = [...new Set(matches.map(url => url.replace(/&amp;/g, '&')))];
            const firstUrl = uniqueUrls[0].split('&w=')[0] + '&fm=webp&w=800&q=80';
            
            https.get(firstUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (imgRes) => {
              if (imgRes.statusCode === 200) {
                const path = `public/images/insights/${item.slug}.webp`;
                const file = fs.createWriteStream(path);
                imgRes.pipe(file);
                file.on('finish', () => {
                  console.log(`✅ Updated ${item.slug}.webp with image for '${item.query}'`);
                  resolve();
                });
              } else {
                console.log(`❌ Failed to download for ${item.slug}`);
                resolve();
              }
            }).on('error', () => resolve());
          } else {
            console.log(`❌ No images found for ${item.query}`);
            resolve();
          }
        });
      }).on('error', () => resolve());
    });
  }
  console.log('Done replacing mismatched images!');
})();
