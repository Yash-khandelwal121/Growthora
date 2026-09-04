const https = require('https');
const fs = require('fs');

https.get('https://unsplash.com/s/photos/finance', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let html = '';
  res.on('data', d => html += d);
  res.on('end', () => {
    // Extract Unsplash image IDs
    const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+(\?ixlib=rb-4\.0\.3&amp;[^\"]+)/g;
    const matches = html.match(regex);
    if (!matches) {
      console.log('No matches found');
      return;
    }
    
    // Clean up URLs
    const uniqueUrls = [...new Set(matches.map(url => url.replace(/&amp;/g, '&').split('&w=')[0] + '&w=800&q=80'))];
    
    // We want 6 URLs
    const targetUrls = uniqueUrls.slice(0, 6);
    console.log('Found URLs:', targetUrls);
    
    // Download them
    const files = ['ff_chart.jpg', 'ff_meeting.jpg', 'ff_laptop.jpg', 'ff_team.jpg', 'ff_industry.jpg', 'ff_textile.jpg'];
    
    targetUrls.forEach((url, i) => {
      https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (imgRes) => {
        if(imgRes.statusCode === 200) {
          const file = fs.createWriteStream('public/services/' + files[i]);
          imgRes.pipe(file);
          file.on('finish', () => console.log('Downloaded', files[i]));
        } else {
          console.log('Failed to download', url, 'Status:', imgRes.statusCode);
        }
      });
    });
  });
});
