const fs = require('fs');
let data = fs.readFileSync('src/data/financeFundingData.js', 'utf8');
data = data.replace(/\/funding\.png/g, '/funding3.png');
fs.writeFileSync('src/data/financeFundingData.js', data);
