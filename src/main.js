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
  const title = getTitle(components, oldName);
  const ext = getExt(components, oldName);
  const ep = [getSeason(components.season), getEp(components.episode)].filter(c => c).join('');
  const quality = [components.codec, components.resolution, components.source].join(' ');

  const titleHTML = `<span class="title">${title}</span>`;
  const extHTML = (ext) ? `<span class="ext">${ext}</span>` : undefined;
  const epHTML = (ep) ? `<span class="ep">${ep}</span>` : undefined;
  const qualHTML = (quality) ? `<span class="quality">${quality}</span>` : undefined;

  const html = [
    titleHTML,
    epHTML,
    qualHTML,
    extHTML,
  ].filter(h => h).join(' ');

  return html;
}

function getTitle(components, oldName) {
  if (Object.keys(components).length === 1) {
    return oldName;
  }
  return components.title;
}

function getExt(components, oldName) {
  if (components.container) {
    return components.container;
  }

  if (oldName.slice(-1) !== '/') {
    const extension = oldName.split('.').pop();
    if (extension !== oldName) {
      return extension;
    }
  }
}

function getEp(int) {
  if (!int) {
    return;
  }
  if (int < 10) {
    return `E0${int}`;
  }
  return `E${int}`;
}

function getSeason(int) {
  if (!int) {
    return;
  }
  if (int < 10) {
    return `S0${int}`;
  }
  return `S${int}`;
}

run();