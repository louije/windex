const ptt = require('parse-torrent-title');

function run() {
  const files = document.querySelectorAll('tr:not(:first-child) td:nth-child(2) a');
  files.forEach(f => processFile(f));
}

function processFile(el) {
  const name = el.innerText.trim();
  const parsed = ptt.parse(name);
  el.innerHTML = formatName(parsed, name);
}

function formatName(components, oldName) {
  const ep = [season(components.season), episode(components.episode)].filter(c => c).join('');
  const quality = [components.codec, components.resolution, components.source].join(' ');

  return `
    <span class="title">${components.title}</span>
    <span class="ep">${ep}</span>
    <span class="quality">${quality}</span>
  `;
}

function episode(int) {
  if (!int) {
    return;
  }
  if (int < 10) {
    return `E0${int}`;
  }
  return `E${int}`;
}

function season(int) {
  if (!int) {
    return;
  }
  if (int < 10) {
    return `S0${int}`;
  }
  return `S${int}`;
}

run();