const fs = require('fs');
const https = require('https');

const options = {
  hostname: 'api.github.com',
  path: '/users/Arintakdas',
  headers: { 'User-Agent': 'Node.js-Galaxy-Generator' }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const user = JSON.parse(data);
    const repos = user.public_repos || 16;
    
    // 1. Setup SVG Canvas
    let svg = `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
      <rect width="100%" height="100%" fill="#0D1117"/>
      
      <!-- Core Glow -->
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#00FFCC" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#0D1117" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="400" cy="200" r="250" fill="url(#glow)"/>
    `;
    
    // 2. Draw Orbital Rings
    for(let i=1; i<=4; i++) {
      svg += `<ellipse cx="400" cy="200" rx="${i*90}" ry="${i*35}" fill="none" stroke="#30363d" stroke-width="1"/>`;
    }
    
    // 3. Generate Twinkling Stars
    for(let i=0; i<250; i++) {
      const x = Math.random() * 800;
      const y = Math.random() * 400;
      const r = Math.random() * 1.5;
      const dur = 2 + Math.random() * 4;
      svg += `
      <circle cx="${x}" cy="${y}" r="${r}" fill="#FFFFFF" opacity="0.6">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="${dur}s" repeatCount="indefinite"/>
      </circle>`;
    }

    // 4. Inject Typography & Live Data
    svg += `<text x="400" y="195" font-family="'Courier New', monospace" font-size="28" font-weight="bold" fill="#00FFCC" text-anchor="middle" letter-spacing="2">ARINTAK DAS</text>`;
    svg += `<text x="400" y="225" font-family="'Courier New', monospace" font-size="14" fill="#8B949E" text-anchor="middle">Systems & ML Engineer | ${repos} Repositories</text>`;

    svg += `</svg>`;
    
    // 5. Save the Output
    fs.writeFileSync('galaxy-dark.svg', svg);
    fs.writeFileSync('galaxy-light.svg', svg);
    console.log("Galaxy successfully generated!");
  });
}).on('error', (err) => {
  console.error("Error fetching data: ", err.message);
});
