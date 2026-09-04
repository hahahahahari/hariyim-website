function escapeHTML(str='') {
  return str.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function actionLabel(p) {
  if (/youtube|youtu\.be|arte\.tv|mezzo\.tv|digitalconcerthall/i.test(p.link || '')) return 'Watch ↗';
  if (/CD|Album/i.test(p.format) || /spotify|music\.apple|classical\.music\.apple|ladolcevolta|navonarecords|nami-records/i.test(p.link || '')) return 'Listen ↗';
  if (/TV|Video|Live/i.test(p.format)) return 'Watch ↗';
  return 'Open ↗';
}

const PROJECT_IMAGES = {
  'Bach: The Six Cello Suites':'https://www.ladolcevolta.com/wp-content/uploads/2022/09/LDV115.6_COVER-300x300-1.webp',
  'WDR Sinfonieorchester Köln':'images/wdr.jpg',
  'Beyond Romanticism':'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e026f03680bc2047c4ff8eb6bc4',
  'Espresso Concert — Konzerthaus Berlin':'https://i.ytimg.com/vi/8n2k9EZZH5M/maxresdefault.jpg',
  'Wings of Renaissance':'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/4a/db/ad/4adbad8f-ffae-9095-8042-23b191cc7004/4260330917478.png/600x600bb.jpg',
  'Once Heard, Long Forgotten':'images/once_heard.jpg',
  'Beethoven Violin Sonata Complete Series I':'images/beethoven_violin_sonata.gif',
  'Suwon Philharmonic Orchestra — The 303rd Concert':'https://i.ytimg.com/vi/G98u_myt0Oc/maxresdefault.jpg',
  'Michiaki Ueno: Origin':'https://www.ladolcevolta.com/wp-content/uploads/2025/10/LDV140_COVER-ITUNES-scaled.jpg',
  'My Beloved — Kinoshita Makiko':'images/kinoshita.jpg',
  'Waldensemble: Festive Wald 10th Anniversary':'images/festive_wald.jpg',
  'Violist Sejune Kim Recital “Hommage”':'images/sejune_kim.gif',
  'Norwegian Chamber Orchestra String Sextet — 36th Eagonconcert':'images/norwegian_sextet.jpg',
  'Spielende Insel — Chambermusic Project Berlin':'images/spielende_insel.png',
  'Waldensemble: SLAVIC':'images/slavic.jpg',
  'Beethoven Variations for Violoncello and Piano':'images/beethoven_variations.jpg',
  'Respighi: Gli Uccelli — Stolen Childhoods':'https://i.ytimg.com/vi/IdDQEQwfD84/hqdefault.jpg',
  'V. Vakulenko / E. Orkin “Daddy’s Book”':'https://i.ytimg.com/vi/txO4_DrWMYM/hqdefault.jpg',
  'Tafelmusik x Rachel Podger — 35th Eagonconcert':'images/tafelmusik.jpg',
  'Goldberg Variationen':'https://imusic.b-cdn.net/images/item/original/128/4260052385128.jpg',
  'Beethoven: Complete Sonatas for Piano and Cello':'images/beethoven_complete_sonatas.jpg',
  'REMINISCENCE: Schubert works for violin and piano':'images/reminiscence.jpg',
  'Hubarenko: Chamber Symphony No. 1':'https://i.ytimg.com/vi/-_I9JycHfq0/hqdefault.jpg',
  'Verklärte Nacht Op. 4 — Schoenberg':'images/verklarte_nacht.jpg',
  'Mussorgsky: Pictures at an Exhibition':'images/mussorgsky.jpg',
  'Beethoven: Symphony No. 2':'images/kammersymphonie_berlin.jpg',
  'SCHUBERT & BRAHMS':'images/schubert_brahms.jpg',
  'Ton für Ton':'images/ton_fuer_ton.jpg',
  'Tchaikovsky: Souvenir de Florence':'images/tchaikovsky_souvenir.jpg',
  'Hollywood Romance':'images/hollywood_romance.jpg',
  'Galakonzert aus Salzburg — Musik der Romantik':'images/galakonzert_salzburg.jpg',
  'Salzburg Wind Philharmonic: Happy Birthday, Johann Strauss!':'images/salzburg_wind.jpg',
  'Bruckner: Symphony No. 9':'https://cdn-p.smehost.net/sites/374be6422f2b494ab9128079a4bd7dfd/logos/bruckner09_digital.jpg',
  'Berliner Philharmoniker New Year’s Eve Concert 2025':'images/berliner_nye_2025.jpg',
  'Berliner Philharmoniker New Year’s Eve Concert 2024':'images/berliner_nye_2024.jpg',
  'Salzburger Festspiele: Christian Thielemann / Wiener Philharmoniker / Wiener Singverein':'images/brahms_requiem.jpg',
  'Evgeny Kissin: Bach, Mozart, Chopin, Rachmaninoff':'images/kissin_bach.png',
  'Nurejew':'images/nurejew.webp',
  'R. Strauss: Die Schweigsame Frau':'images/schweigsame_frau.jpg',
  'Leipziger Ballett: Tchaikovsky':'images/leipziger_ballett.jpg',
  'Salzburger Festspiele: Daniil Trifonov':'images/salzburger_festspiele.png',
  'Salzburger Festspiele: Hadelich / Nelsons / Wiener Philharmoniker':'images/salzburger_festspiele.png',
  'Salzburger Festspiele: Lang Lang / Barenboim / West-Eastern Divan':'images/salzburger_festspiele.png',
  'Evgeny Kissin in Wuppertal':'images/kissin_wuppertal.png'
};

function renderFeatured() {
  const host = document.querySelector('[data-featured-projects]');
  if (!host || !window.HARI_PROJECTS) return;
  const featured = HARI_PROJECTS.filter(p => p.featured).slice(0,9);
  host.innerHTML = featured.map(p => `
    <a class="project-card" href="${p.link || 'work.html'}" ${p.link ? 'target="_blank" rel="noopener"' : ''}>
      <div>
        <div class="project-meta"><span>${escapeHTML(p.year)}</span><span>${escapeHTML(p.format)}</span></div>
        ${p.note ? `<div class="project-note">${escapeHTML(p.note)}</div>` : ''}
        <h3>${escapeHTML(p.title)}</h3>
        <div class="project-artist">${escapeHTML(p.artist.split('\n').slice(0,3).join('\n'))}</div>
      </div>
      <div class="project-foot"><span class="project-label">${p.label === '—' ? p.roleLabel : escapeHTML(p.label)}</span><span class="project-action">${p.link ? actionLabel(p) : 'Details ↗'}</span></div>
    </a>
  `).join('');
}

function renderWork() {
  const host = document.querySelector('[data-work-list]');
  if (!host || !window.HARI_PROJECTS) return;
  const empty = document.querySelector('[data-empty]');
  const search = document.querySelector('[data-project-search]');
  const buttons = [...document.querySelectorAll('[data-role-filter]')];
  let role = 'all';
  let q = '';

  const draw = () => {
    const items = HARI_PROJECTS.filter(p => {
      const matchRole = role === 'all' || p.role === role;
      const hay = `${p.title} ${p.artist} ${p.label} ${p.format} ${p.year}`.toLowerCase();
      return matchRole && hay.includes(q);
    });
    host.innerHTML = items.map(p => `
      <article class="work-entry">
      <button class="work-row" type="button" aria-expanded="false">
        <div class="work-year">${escapeHTML(p.year)}</div>
        <div class="work-title">${p.note ? `<small class="work-note">${escapeHTML(p.note)}</small>` : ''}${escapeHTML(p.title)} <span class="open-link">＋</span></div>
        <div class="work-artist">${escapeHTML(p.artist.split('\n').slice(0,3).join('\n'))}</div>
        <div class="work-label">${p.label === '—' ? escapeHTML(p.roleLabel) : escapeHTML(p.label)}</div>
        <div class="work-format">${escapeHTML(p.format)}</div>
      </button>
      <div class="work-detail" hidden>${PROJECT_IMAGES[p.title] ? `<div class="work-detail-image"><img src="${PROJECT_IMAGES[p.title]}" alt="${escapeHTML(p.title)}" loading="lazy"></div>` : ''}<div><span>Role</span><strong>${escapeHTML(p.roleLabel)}</strong></div><div><span>Artist</span><strong>${escapeHTML(p.artist)}</strong></div><div class="work-detail-actions">${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">${actionLabel(p)}</a>` : ''}</div></div>
      </article>
    `).join('');
    host.querySelectorAll('.work-row').forEach(row => row.addEventListener('click', () => {
      const detail = row.nextElementSibling;
      const open = row.getAttribute('aria-expanded') === 'true';
      row.setAttribute('aria-expanded', String(!open));
      detail.hidden = open;
      row.querySelector('.open-link').textContent = open ? '＋' : '−';
    }));
    empty.style.display = items.length ? 'none' : 'block';
  };

  buttons.forEach(btn => btn.addEventListener('click', () => {
    role = btn.dataset.roleFilter;
    buttons.forEach(b => b.classList.toggle('active', b === btn));
    draw();
  }));
  search?.addEventListener('input', e => { q = e.target.value.trim().toLowerCase(); draw(); });
  draw();
}

document.addEventListener('DOMContentLoaded', () => { renderFeatured(); renderWork(); });
