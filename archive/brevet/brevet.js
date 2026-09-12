// ══════════════════════════════════════════
// UNIVERS BREVET — bascule Bac ↔ Brevet
// ══════════════════════════════════════════
const BREVET_TAGLINE = 'Brevet blanc en visio · Français &amp; Maths<br>S\'entraîner en 3<sup>e</sup>, arriver prêt en seconde.';
const BAC_TAGLINE    = 'Bac blanc en visio · Coaching toutes matières<br>La 1ère plateforme de bac blanc avec coaching personnalisé.';

// Applique le thème (logo, liens de nav, interrupteur, footer) sans changer de page
function applyUnivers(estBrevet) {
  document.body.classList.toggle('univers-brevet', !!estBrevet);
  document.querySelectorAll('#univers-switch button').forEach(b => {
    b.classList.toggle('on', (b.dataset.u === 'brevet') === !!estBrevet);
  });
  document.title = estBrevet
    ? 'Les Matinées du Brevet — Brevet blanc en visio · Français & Maths'
    : 'Les Matinées du Bac — Bac blanc en visio · Coaching toutes matières';
  const tag = document.querySelector('.footer-brand p');
  if (tag) tag.innerHTML = estBrevet ? BREVET_TAGLINE : BAC_TAGLINE;
  // Le bouton « S'inscrire » de la navbar mène au bon formulaire
  const insc = document.getElementById('nav-cta-insc');
  if (insc) insc.href = INSCRIPTION_URL + (estBrevet ? '/inscription?examen=brevet' : '/inscription?examen=bac');
}

// Interrupteur de la navbar
function setUnivers(u) {
  if (u === 'brevet') {
    gotoPage('brevet');
    history.replaceState(null, '', '#brevet');
  } else {
    gotoPage('home');
    history.replaceState(null, '', location.pathname + location.search);
  }
  try { localStorage.setItem('mdb_univers', u); } catch (e) {}
}

// Navigation interne à la page brevet (ancres)
function brevetGo(sectionId) {
  if (!document.body.classList.contains('univers-brevet')) gotoPage('brevet');
  const el = document.getElementById(sectionId);
  if (el) {
    const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// ── Sessions brevet (dates de travail : à confirmer avant mise en ligne) ──
// `iso` et `matiere` doivent rester alignés avec SESSIONS_PLATEFORME du CRM
// (src/lib/sessions.ts) : c'est ce couple qui pré-remplit le formulaire d'inscription.
const SESSIONS_BREVET = [
  { matiere:'francais', iso:'2026-11-07', date:'07', mois:'Nov',  jour:'Samedi', heure:'9h00 — 12h00', type:'Compréhension, dictée & rédaction', niveau:'3ᵉ', places:9,  total:15 },
  { matiere:'maths',    iso:'2026-11-14', date:'14', mois:'Nov',  jour:'Samedi', heure:'9h00 — 11h00', type:'Sujet type brevet complet',        niveau:'3ᵉ', places:6,  total:15 },
  { matiere:'francais', iso:'2026-11-28', date:'28', mois:'Nov',  jour:'Samedi', heure:'9h00 — 12h00', type:'Atelier rédaction & dictée',        niveau:'3ᵉ', places:12, total:15 },
  { matiere:'maths',    iso:'2026-12-12', date:'12', mois:'Déc',  jour:'Samedi', heure:'9h00 — 11h00', type:'Problèmes & algorithmique',         niveau:'3ᵉ', places:4,  total:15 },
  { matiere:'francais', iso:'2027-01-16', date:'16', mois:'Janv', jour:'Samedi', heure:'9h00 — 12h00', type:'Brevet blanc complet',              niveau:'3ᵉ', places:15, total:15 },
  { matiere:'maths',    iso:'2027-01-30', date:'30', mois:'Janv', jour:'Samedi', heure:'9h00 — 11h00', type:'Géométrie, stats & probabilités',   niveau:'3ᵉ', places:15, total:15 }
];

const BREVET_INFO = {
  francais: { label:'Français',      crm:'Français (brevet)',      icon:'✍️', grad:'linear-gradient(135deg,#FB923C,#EA580C)' },
  maths:    { label:'Mathématiques', crm:'Mathématiques (brevet)', icon:'📐', grad:'linear-gradient(135deg,#10B981,#047857)' }
};

// Lien d'inscription brevet (pré-remplit examen / matière / date dans le CRM)
const INSCRIPTION_BREVET = INSCRIPTION_URL + '/inscription?examen=brevet';
function lienInscriptionBrevet(s) {
  if (!s) return INSCRIPTION_BREVET;
  return `${INSCRIPTION_BREVET}&matiere=${encodeURIComponent(BREVET_INFO[s.matiere].crm)}&date=${s.iso}`;
}

function renderBrevetCalendar(filter) {
  const grid = document.getElementById('brevet-calendar-grid');
  if (!grid) return;
  const list = (!filter || filter === 'all') ? SESSIONS_BREVET : SESSIONS_BREVET.filter(s => s.matiere === filter);
  grid.innerHTML = list.map(s => {
    const m = BREVET_INFO[s.matiere];
    const pct = Math.round((1 - s.places / s.total) * 100);
    const full = s.places === 0;
    const almost = s.places <= 5 && s.places > 0;
    const spotColor = full ? '#DC2626' : almost ? '#D97706' : '#059669';
    const spotLabel = full ? 'Complet' : `${s.places} places restantes`;
    return `
    <div class="session-card">
      <div class="session-top" style="background:${m.grad}">
        <div style="font-size:1.6rem;margin-bottom:6px">${m.icon}</div>
        <div style="font-family:var(--display);font-size:1.3rem;line-height:1">${m.label}</div>
        <div style="font-size:.78rem;opacity:.9;margin-top:2px">Classe de ${s.niveau}</div>
        <div class="session-date-badge"><div class="d">${s.date}</div><div class="mo">${s.mois}</div></div>
      </div>
      <div class="session-body">
        <div class="session-meta-row">📅 ${s.jour} ${s.date} ${s.mois}</div>
        <div class="session-meta-row">🕘 ${sanitizeDashes(s.heure)}</div>
        <div class="session-meta-row">📝 ${s.type}</div>
        <div class="session-spots"><div class="session-spots-fill" style="width:${pct}%;background:${spotColor}"></div></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
          <span style="font-size:.78rem;font-weight:600;color:${spotColor}">${spotLabel}</span>
          <a href="${full ? 'javascript:void(0)' : lienInscriptionBrevet(s)}" ${full ? '' : 'target="_blank"'} class="btn btn-sm ${full ? 'btn-outline' : ''}" style="${full ? 'opacity:.5;pointer-events:none' : 'background:linear-gradient(135deg,#3B82F6,#1D4ED8);color:white'}">${full ? 'Complet' : 'Réserver →'}</a>
        </div>
      </div>
    </div>`;
  }).join('');
}

function filterBrevet(filter, btn) {
  document.querySelectorAll('.br-filter').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderBrevetCalendar(filter);
}

// Ouverture directe sur l'univers brevet : #brevet dans l'URL, sinon dernier choix mémorisé
document.addEventListener('DOMContentLoaded', () => {
  let univers = 'bac';
  if (location.hash === '#brevet') univers = 'brevet';
  else { try { if (localStorage.getItem('mdb_univers') === 'brevet') univers = 'brevet'; } catch (e) {} }
  if (univers === 'brevet') gotoPage('brevet');
  else applyUnivers(false);
});

