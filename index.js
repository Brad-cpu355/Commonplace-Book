<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<title>Commonplace Book</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Courier+Prime:wght@400;700&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --parchment: #1E2732;
    --parchment-dark: #16202A;
    --ink: #E3E8ED;
    --ink-soft: #8996A5;
    --oxblood: #3E6591;
    --oxblood-deep: #2A4868;
    --gold: #7FA0BE;
    --charcoal: #2A313A;
    --bg: #0E141B;
    --bg-deep: #090D12;
  }
  *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
  html,body{margin:0;padding:0;}
  body{
    background:
      radial-gradient(circle at 20% 0%, rgba(169,130,70,0.06), transparent 55%),
      linear-gradient(160deg, var(--bg), var(--bg-deep));
    min-height:100vh;
    font-family:'Source Sans 3',sans-serif;
    color:var(--ink);
    padding:20px 16px 100px;
  }
  .eyebrow{
    font-family:'Courier Prime',monospace;
    font-size:11px;
    letter-spacing:0.18em;
    text-transform:uppercase;
    color:var(--gold);
    margin:0 0 4px;
  }
  h1{
    font-family:'Lora',serif;
    font-weight:600;
    font-size:30px;
    margin:0 0 4px;
    color:var(--ink);
    letter-spacing:-0.01em;
  }
  .tagline{
    font-size:13px;
    color:rgba(227,232,238,0.55);
    margin:0 0 20px;
    font-style:italic;
    font-family:'Lora',serif;
  }

  /* Capture box */
  .capture{
    background:var(--parchment);
    border-radius:2px;
    padding:16px;
    box-shadow:0 8px 24px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06);
  }
  .cat-row{
    display:flex;
    gap:6px;
    overflow-x:auto;
    padding-bottom:10px;
    margin-bottom:10px;
    border-bottom:1px dashed rgba(255,255,255,0.15);
  }
  .cat-row::-webkit-scrollbar{display:none;}
  .cat-chip{
    font-family:'Courier Prime',monospace;
    font-size:10.5px;
    letter-spacing:0.05em;
    text-transform:uppercase;
    white-space:nowrap;
    padding:6px 10px;
    border-radius:20px;
    border:1.5px solid rgba(255,255,255,0.15);
    background:transparent;
    color:var(--ink-soft);
    cursor:pointer;
  }
  .cat-chip.selected{
    color:#fff;
    border-color:transparent;
  }
  textarea, input[type=text]{
    width:100%;
    border:none;
    background:transparent;
    resize:none;
    font-family:'Lora',serif;
    color:var(--ink);
    outline:none;
  }
  #captureContent{
    font-size:16.5px;
    min-height:70px;
    line-height:1.45;
  }
  #captureContent::placeholder{color:var(--ink-soft); font-style:italic;}
  .source-row{
    margin-top:8px;
    padding-top:10px;
    border-top:1px dashed rgba(255,255,255,0.12);
  }
  #captureSource{
    font-family:'Source Sans 3',sans-serif;
    font-size:13px;
    font-style:italic;
    color:var(--ink-soft);
  }
  #captureSource::placeholder{color:#9c9280;}
  .capture-row{
    display:flex;
    justify-content:flex-end;
    margin-top:10px;
  }
  .stamp-btn{
    font-family:'Courier Prime',monospace;
    font-size:12px;
    letter-spacing:0.1em;
    text-transform:uppercase;
    background:var(--oxblood);
    color:var(--ink);
    border:none;
    padding:10px 18px;
    border-radius:2px;
    font-weight:700;
    cursor:pointer;
  }
  .stamp-btn:active{transform:scale(0.96);}
  .stamp-btn:disabled{opacity:0.5;}

  /* Toolbar: search + resurface */
  .toolbar{
    display:flex;
    gap:8px;
    margin:18px 0 12px;
  }
  .search-box{
    flex:1;
    background:rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.12);
    border-radius:20px;
    padding:9px 14px;
    font-family:'Source Sans 3',sans-serif;
    font-size:13px;
    color:var(--ink);
  }
  .search-box::placeholder{ color:rgba(227,232,238,0.4); }
  .resurface-btn{
    font-family:'Courier Prime',monospace;
    font-size:11px;
    letter-spacing:0.05em;
    text-transform:uppercase;
    white-space:nowrap;
    background:var(--gold);
    color:var(--bg-deep);
    border:none;
    padding:9px 14px;
    border-radius:20px;
    font-weight:700;
    cursor:pointer;
  }

  /* Filters */
  .filters{
    display:flex;
    gap:8px;
    margin-bottom:16px;
    overflow-x:auto;
    padding-bottom:4px;
  }
  .filters::-webkit-scrollbar{display:none;}
  .chip{
    font-family:'Courier Prime',monospace;
    font-size:10.5px;
    letter-spacing:0.05em;
    text-transform:uppercase;
    white-space:nowrap;
    padding:6px 11px;
    border-radius:20px;
    border:1px solid rgba(227,232,238,0.25);
    color:rgba(227,232,238,0.7);
    background:transparent;
    cursor:pointer;
  }
  .chip.active{
    background:var(--gold);
    color:var(--bg-deep);
    border-color:var(--gold);
    font-weight:700;
  }

  /* Cards */
  .empty-state{
    text-align:center;
    padding:40px 20px;
    color:rgba(227,232,238,0.4);
    font-family:'Lora',serif;
    font-style:italic;
    font-size:15px;
  }
  .card{
    background:var(--parchment);
    border-radius:2px;
    padding:15px 16px 13px;
    margin-bottom:14px;
    position:relative;
    box-shadow:0 6px 16px rgba(0,0,0,0.45);
    cursor:pointer;
    border-left:4px solid var(--oxblood);
  }
  .card-top{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:8px;
  }
  .catalog-no{
    font-family:'Courier Prime',monospace;
    font-size:10.5px;
    letter-spacing:0.05em;
    color:#fff;
    padding:2px 7px;
    border-radius:2px;
  }
  .card-date{
    font-family:'Courier Prime',monospace;
    font-size:10px;
    color:var(--ink-soft);
  }
  .card-content{
    font-family:'Lora',serif;
    font-size:15.5px;
    color:var(--ink);
    line-height:1.5;
    margin:0 0 6px;
    display:-webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient:vertical;
    overflow:hidden;
  }
  .card-source{
    font-size:12.5px;
    font-style:italic;
    color:var(--ink-soft);
    margin:0 0 6px;
  }
  .card-tags{
    display:flex;
    gap:5px;
    flex-wrap:wrap;
  }
  .tag-pill{
    font-family:'Courier Prime',monospace;
    font-size:9.5px;
    background:rgba(255,255,255,0.08);
    color:var(--ink-soft);
    padding:2px 7px;
    border-radius:10px;
  }

  /* Modal */
  .modal-overlay{
    display:none;
    position:fixed; inset:0;
    background:rgba(23,19,16,0.8);
    z-index:50;
    padding:16px;
    overflow-y:auto;
  }
  .modal-overlay.open{ display:block; }
  .modal{
    background:var(--parchment);
    max-width:520px;
    margin:20px auto 40px;
    border-radius:2px;
    padding:20px 18px 24px;
    position:relative;
    box-shadow:0 20px 50px rgba(0,0,0,0.6);
  }
  .modal-close{
    position:absolute; top:12px; right:14px;
    background:none; border:none;
    font-size:22px; color:var(--ink-soft);
    cursor:pointer; line-height:1;
    font-family:'Courier Prime',monospace;
  }
  .modal-cat-row{
    display:flex; gap:6px; flex-wrap:wrap;
    margin:6px 0 14px;
  }
  .modal-content-input{
    width:100%;
    font-family:'Lora',serif;
    font-size:16px;
    color:var(--ink);
    line-height:1.5;
    border:none; background:transparent;
    outline:none; resize:none;
    min-height:70px;
    margin-bottom:12px;
    padding-bottom:12px;
    border-bottom:1px dashed rgba(255,255,255,0.15);
  }
  .field-label{
    font-family:'Courier Prime',monospace;
    font-size:10px;
    letter-spacing:0.1em;
    text-transform:uppercase;
    color:var(--oxblood);
    margin:14px 0 5px;
    display:block;
    border-bottom:1px solid rgba(255,255,255,0.12);
    padding-bottom:4px;
  }
  .field-input{
    width:100%;
    font-family:'Source Sans 3',sans-serif;
    font-size:14px;
    color:var(--ink);
    border:none;
    border-bottom:1px solid rgba(255,255,255,0.15);
    background:transparent;
    outline:none;
    padding:6px 0;
    resize:none;
    line-height:1.4;
    min-height:20px;
  }
  .field-input::placeholder{ color:#9c9280; }

  .modal-footer{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:20px;
  }
  .delete-link{
    font-family:'Courier Prime',monospace;
    font-size:11px;
    color:var(--oxblood);
    background:none;
    border:none;
    letter-spacing:0.05em;
    text-transform:uppercase;
    cursor:pointer;
  }
  .save-note{
    font-family:'Courier Prime',monospace;
    font-size:10.5px;
    color:var(--ink-soft);
  }
  .resurface-tag{
    font-family:'Courier Prime',monospace;
    font-size:10px;
    letter-spacing:0.08em;
    text-transform:uppercase;
    color:var(--gold);
    margin-bottom:8px;
    display:block;
  }
  .loading-line{
    text-align:center;
    color:rgba(227,232,238,0.4);
    font-family:'Courier Prime',monospace;
    font-size:11px;
    letter-spacing:0.08em;
    padding:20px 0;
  }

  /* Manage categories */
  .manage-link{
    font-family:'Courier Prime',monospace;
    font-size:10.5px;
    letter-spacing:0.05em;
    text-transform:uppercase;
    color:rgba(227,232,238,0.5);
    background:none;
    border:none;
    cursor:pointer;
    text-decoration:underline;
    margin-bottom:14px;
    display:inline-block;
  }
  .cat-manage-row{
    display:flex;
    align-items:center;
    gap:10px;
    padding:8px 0;
    border-bottom:1px solid rgba(255,255,255,0.1);
  }
  .swatch{
    width:22px; height:22px;
    border-radius:50%;
    flex-shrink:0;
    border:1px solid rgba(255,255,255,0.18);
    cursor:pointer;
  }
  .cat-manage-label{
    flex:1;
    font-family:'Source Sans 3',sans-serif;
    font-size:14px;
    color:var(--ink);
    border:none;
    background:transparent;
    outline:none;
    border-bottom:1px solid transparent;
    padding:4px 0;
  }
  .cat-manage-label:focus{ border-bottom-color: rgba(255,255,255,0.25); }
  .swatch-palette{
    display:flex;
    gap:6px;
    flex-wrap:wrap;
    margin:8px 0 14px;
  }
  .swatch-option{
    width:24px; height:24px;
    border-radius:50%;
    cursor:pointer;
    border:2px solid transparent;
  }
  .swatch-option.selected{ border-color: var(--ink); }
  .add-cat-row{
    margin-top:16px;
    padding-top:14px;
    border-top:1px dashed rgba(255,255,255,0.15);
  }
</style>
</head>
<body>

<p class="eyebrow">A commonplace book — est. today</p>
<h1>Commonplace Book</h1>
<p class="tagline">A running conversation with everything you read.</p>

<div class="capture">
  <div class="cat-row" id="captureCatRow"></div>
  <textarea id="captureContent" placeholder="What struck you? A quote, a fact, an idea worth keeping..."></textarea>
  <div class="source-row">
    <input type="text" id="captureSource" placeholder="Source — book, article, author (optional)">
  </div>
  <div class="capture-row">
    <button class="stamp-btn" id="captureBtn">File this entry</button>
  </div>
</div>

<div class="toolbar">
  <input type="text" class="search-box" id="searchBox" placeholder="Search your entries...">
  <button class="resurface-btn" id="resurfaceBtn">Turn a page</button>
</div>

<div class="filters" id="filters"></div>
<button class="manage-link" id="manageTopicsBtn">Manage topics</button>

<div id="list">
  <div class="loading-line">OPENING THE BOOK…</div>
</div>

<div class="modal-overlay" id="modalOverlay">
  <div class="modal" id="modalContent"></div>
</div>

<div class="modal-overlay" id="manageOverlay">
  <div class="modal" id="manageContent"></div>
</div>

<script>
const PALETTE = [
  '#3E6591', '#556270', '#2E5C6E', '#4A4E69', '#6B7A8F', '#324A5F',
  '#7A8891', '#2C3E50', '#64748B', '#46647A', '#5E718A', '#8D99AE'
];

let categories = []; // [{key, label, color, prefix, sortOrder}]
let entries = [];
let currentFilter = 'all';
let searchQuery = '';
let openEntryId = null;
let captureCategory = 'other';

function catByKey(key){
  return categories.find(c => c.key === key) || { key, label: key, color: '#5B5347' };
}

// ---------- storage (API-backed, same pattern as Idea Vault) ----------
async function loadEntries(){
  try{
    const res = await fetch('/api/entries');
    if(!res.ok) throw new Error('Fetch failed: ' + res.status);
    return await res.json();
  }catch(e){
    console.error('Load failed', e);
    document.getElementById('list').innerHTML =
      '<div class="empty-state">Could not reach the book. Check your connection and reload.</div>';
    return [];
  }
}
async function createEntryRemote(payload){
  const res = await fetch('/api/entries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if(!res.ok) throw new Error('Create failed: ' + res.status);
  return await res.json();
}
async function updateEntryRemote(entry){
  const res = await fetch('/api/entries/' + entry.id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  });
  if(!res.ok) throw new Error('Update failed: ' + res.status);
}
async function deleteEntryRemote(id){
  const res = await fetch('/api/entries/' + id, { method: 'DELETE' });
  if(!res.ok) throw new Error('Delete failed: ' + res.status);
}
async function fetchRandomEntry(){
  const res = await fetch('/api/entries/random');
  if(!res.ok) throw new Error('Random fetch failed: ' + res.status);
  return await res.json();
}
async function loadCategories(){
  try{
    const res = await fetch('/api/categories');
    if(!res.ok) throw new Error('Fetch failed: ' + res.status);
    return await res.json();
  }catch(e){
    console.error('Load categories failed', e);
    return [];
  }
}
async function createCategoryRemote(label, color){
  const res = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ label, color })
  });
  if(!res.ok) throw new Error('Create category failed: ' + res.status);
  return await res.json();
}
async function updateCategoryRemote(key, label, color){
  const res = await fetch('/api/categories/' + key, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ label, color })
  });
  if(!res.ok) throw new Error('Update category failed: ' + res.status);
}

// ---------- helpers ----------
function formatDate(ts){
  const d = new Date(ts);
  return d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }).toUpperCase();
}
function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}
function parseTags(str){
  return (str || '').split(',').map(t => t.trim()).filter(Boolean);
}

// ---------- capture category chips ----------
function renderCaptureCats(){
  const row = document.getElementById('captureCatRow');
  row.innerHTML = categories.map(c => `
    <button class="cat-chip ${captureCategory===c.key?'selected':''}"
            data-cat="${c.key}"
            style="${captureCategory===c.key ? 'background:'+c.color+';' : ''}">
      ${escapeHtml(c.label)}
    </button>
  `).join('');
  row.querySelectorAll('.cat-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      captureCategory = btn.dataset.cat;
      renderCaptureCats();
    });
  });
}

// ---------- filter chips ----------
function renderFilters(){
  const row = document.getElementById('filters');
  const all = [{ key: 'all', label: 'All' }, ...categories];
  row.innerHTML = all.map(c => `
    <button class="chip ${currentFilter===c.key?'active':''}" data-filter="${c.key}">${escapeHtml(c.label)}</button>
  `).join('');
  row.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      renderFilters();
      renderList();
    });
  });
}

// ---------- capture ----------
document.getElementById('captureBtn').addEventListener('click', async () => {
  const contentEl = document.getElementById('captureContent');
  const sourceEl = document.getElementById('captureSource');
  const content = contentEl.value.trim();
  if(!content) return;

  const btn = document.getElementById('captureBtn');
  btn.disabled = true;

  try{
    const entry = await createEntryRemote({
      content,
      source: sourceEl.value.trim(),
      category: captureCategory
    });
    entries.unshift(entry);
    contentEl.value = '';
    sourceEl.value = '';
    renderList();
  }catch(e){
    console.error(e);
    alert('Could not save that entry — check your connection and try again.');
  }
  btn.disabled = false;
});

// ---------- search ----------
document.getElementById('searchBox').addEventListener('input', (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  renderList();
});

// ---------- resurface ----------
document.getElementById('resurfaceBtn').addEventListener('click', async () => {
  if(entries.length === 0){
    alert('Nothing filed yet — add a few entries first.');
    return;
  }
  try{
    const entry = await fetchRandomEntry();
    openEntryId = entry.id;
    if(!entries.find(e => e.id === entry.id)){
      entries.unshift(entry);
    }
    renderModal(true);
    document.getElementById('modalOverlay').classList.add('open');
  }catch(e){
    console.error(e);
    alert('Could not fetch a page — check your connection.');
  }
});

// ---------- list rendering ----------
function renderList(){
  const list = document.getElementById('list');
  let filtered = currentFilter === 'all' ? entries : entries.filter(e => e.category === currentFilter);
  if(searchQuery){
    filtered = filtered.filter(e =>
      (e.content || '').toLowerCase().includes(searchQuery) ||
      (e.source || '').toLowerCase().includes(searchQuery) ||
      (e.tags || []).some(t => t.toLowerCase().includes(searchQuery))
    );
  }

  if(filtered.length === 0){
    list.innerHTML = `<div class="empty-state">${entries.length === 0 ? "The book is empty. Your next entry is one page away." : "Nothing matches here yet."}</div>`;
    return;
  }

  list.innerHTML = filtered.map(entry => {
    const cat = catByKey(entry.category);
    return `
    <div class="card" data-id="${entry.id}" style="border-left-color:${cat.color}">
      <div class="card-top">
        <span class="catalog-no" style="background:${cat.color}">${entry.catalogNo}</span>
        <span class="card-date">${formatDate(entry.createdAt)}</span>
      </div>
      <p class="card-content">${escapeHtml(entry.content)}</p>
      ${entry.source ? `<p class="card-source">— ${escapeHtml(entry.source)}</p>` : ''}
      ${entry.tags && entry.tags.length ? `<div class="card-tags">${entry.tags.map(t => `<span class="tag-pill">${escapeHtml(t)}</span>`).join('')}</div>` : ''}
    </div>
  `;
  }).join('');

  list.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id));
  });
}

// ---------- modal ----------
function openModal(id){
  openEntryId = id;
  renderModal(false);
  document.getElementById('modalOverlay').classList.add('open');
}
async function closeModal(){
  document.getElementById('modalOverlay').classList.remove('open');
  openEntryId = null;
  entries = await loadEntries();
  renderList();
}

function renderModal(isResurfaced){
  const entry = entries.find(e => e.id === openEntryId);
  if(!entry) return;
  const m = document.getElementById('modalContent');

  m.innerHTML = `
    <button class="modal-close" id="closeBtn">&times;</button>
    ${isResurfaced ? '<span class="resurface-tag">Resurfaced from the book</span>' : ''}
    <div class="card-date" style="margin-bottom:8px;">${entry.catalogNo} — FILED ${formatDate(entry.createdAt)}</div>
    <textarea class="modal-content-input" id="contentInput">${escapeHtml(entry.content)}</textarea>

    <div class="modal-cat-row" id="modalCatRow"></div>

    <span class="field-label">Source</span>
    <input type="text" class="field-input" id="sourceInput" placeholder="Book, article, author" value="${escapeHtml(entry.source)}">

    <span class="field-label">Tags</span>
    <input type="text" class="field-input" id="tagsInput" placeholder="comma, separated, tags" value="${escapeHtml((entry.tags || []).join(', '))}">

    <span class="field-label">Notes &amp; connections</span>
    <textarea class="field-input" id="notesInput" placeholder="Why this stuck, or what it connects to...">${escapeHtml(entry.notes)}</textarea>

    <div class="modal-footer">
      <button class="delete-link" id="deleteBtn">Delete entry</button>
      <span class="save-note" id="saveNote">Saved automatically</span>
    </div>
  `;

  // category chips inside modal
  const catRow = document.getElementById('modalCatRow');
  catRow.innerHTML = categories.map(c => `
    <button class="cat-chip ${entry.category===c.key?'selected':''}"
            data-cat="${c.key}"
            style="${entry.category===c.key ? 'background:'+c.color+';' : ''}">
      ${escapeHtml(c.label)}
    </button>
  `).join('');

  document.getElementById('closeBtn').addEventListener('click', closeModal);
  document.getElementById('deleteBtn').addEventListener('click', () => deleteEntry(entry.id));

  const debouncedSave = debounce(async () => {
    entry.content = document.getElementById('contentInput').value;
    entry.source = document.getElementById('sourceInput').value;
    entry.tags = parseTags(document.getElementById('tagsInput').value);
    entry.notes = document.getElementById('notesInput').value;
    document.getElementById('saveNote').textContent = 'Saving...';
    try{
      await updateEntryRemote(entry);
      document.getElementById('saveNote').textContent = 'Saved automatically';
    }catch(e){
      console.error(e);
      document.getElementById('saveNote').textContent = 'Could not save — check connection';
    }
    renderList();
  }, 500);

  ['contentInput','sourceInput','tagsInput','notesInput'].forEach(id => {
    document.getElementById(id).addEventListener('input', debouncedSave);
  });

  catRow.addEventListener('click', async (e) => {
    const btn = e.target.closest('.cat-chip');
    if(!btn) return;
    entry.category = btn.dataset.cat;
    try{
      await updateEntryRemote(entry);
    }catch(err){
      console.error(err);
      alert('Could not update category — check your connection.');
    }
    renderModal(false);
    renderList();
  });
}

function debounce(fn, wait){
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

async function deleteEntry(id){
  if(!confirm('Delete this entry for good?')) return;
  try{
    await deleteEntryRemote(id);
    entries = entries.filter(e => e.id !== id);
  }catch(e){
    console.error(e);
    alert('Could not delete — check your connection.');
  }
  closeModal();
  renderList();
}

// ---------- manage topics ----------
let pendingNewColor = PALETTE[0];

function renderManageModal(){
  const m = document.getElementById('manageContent');
  m.innerHTML = `
    <button class="modal-close" id="manageCloseBtn">&times;</button>
    <div class="idea-id" style="font-family:'Courier Prime',monospace; font-size:10px; color:var(--ink-soft); margin-bottom:10px;">MANAGE TOPICS</div>
    <div id="catManageList"></div>
    <div class="add-cat-row">
      <span class="field-label">Add a new topic</span>
      <input type="text" class="field-input" id="newCatLabel" placeholder="e.g. Health">
      <div class="swatch-palette" id="newCatPalette"></div>
      <button class="stamp-btn" id="addCatBtn" style="margin-top:8px;">Add topic</button>
    </div>
  `;

  const listEl = document.getElementById('catManageList');
  listEl.innerHTML = categories.map(c => `
    <div class="cat-manage-row" data-key="${c.key}">
      <div class="swatch" style="background:${c.color}" data-key="${c.key}"></div>
      <input type="text" class="cat-manage-label" value="${escapeHtml(c.label)}" data-key="${c.key}">
    </div>
  `).join('');

  // rename on blur/enter
  listEl.querySelectorAll('.cat-manage-label').forEach(input => {
    const save = debounce(async () => {
      const key = input.dataset.key;
      const cat = catByKey(key);
      try{
        await updateCategoryRemote(key, input.value.trim() || cat.label, cat.color);
        cat.label = input.value.trim() || cat.label;
        renderFilters();
        renderList();
      }catch(e){
        console.error(e);
        alert('Could not rename that topic — check your connection.');
      }
    }, 600);
    input.addEventListener('input', save);
  });

  // recolor: clicking the swatch cycles to a small picker inline
  listEl.querySelectorAll('.swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      const key = sw.dataset.key;
      const existing = document.querySelector(`.cat-manage-row[data-key="${key}"] .swatch-palette`);
      if(existing){ existing.remove(); return; }
      const palette = document.createElement('div');
      palette.className = 'swatch-palette';
      palette.innerHTML = PALETTE.map(color => `
        <div class="swatch-option ${catByKey(key).color===color?'selected':''}" style="background:${color}" data-color="${color}"></div>
      `).join('');
      sw.closest('.cat-manage-row').appendChild(palette);
      palette.querySelectorAll('.swatch-option').forEach(opt => {
        opt.addEventListener('click', async () => {
          const cat = catByKey(key);
          try{
            await updateCategoryRemote(key, cat.label, opt.dataset.color);
            cat.color = opt.dataset.color;
            renderManageModal();
            renderFilters();
            renderList();
          }catch(e){
            console.error(e);
            alert('Could not update color — check your connection.');
          }
        });
      });
    });
  });

  // new category palette picker
  const newPalette = document.getElementById('newCatPalette');
  newPalette.innerHTML = PALETTE.map(color => `
    <div class="swatch-option ${pendingNewColor===color?'selected':''}" style="background:${color}" data-color="${color}"></div>
  `).join('');
  newPalette.querySelectorAll('.swatch-option').forEach(opt => {
    opt.addEventListener('click', () => {
      pendingNewColor = opt.dataset.color;
      renderManageModal();
    });
  });

  document.getElementById('manageCloseBtn').addEventListener('click', closeManageModal);
  document.getElementById('addCatBtn').addEventListener('click', async () => {
    const labelInput = document.getElementById('newCatLabel');
    const label = labelInput.value.trim();
    if(!label) return;
    try{
      const cat = await createCategoryRemote(label, pendingNewColor);
      categories.push(cat);
      renderManageModal();
      renderCaptureCats();
      renderFilters();
    }catch(e){
      console.error(e);
      alert('Could not add that topic — check your connection.');
    }
  });
}

function openManageModal(){
  renderManageModal();
  document.getElementById('manageOverlay').classList.add('open');
}
function closeManageModal(){
  document.getElementById('manageOverlay').classList.remove('open');
}
document.getElementById('manageTopicsBtn').addEventListener('click', openManageModal);

// ---------- init ----------
(async function init(){
  categories = await loadCategories();
  if(categories.length === 0){
    categories = [{ key: 'other', label: 'Other', color: '#5B5347' }];
  }
  renderCaptureCats();
  renderFilters();
  entries = await loadEntries();
  renderList();
})();
</script>

</body>
</html>
