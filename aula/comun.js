// EnglishAngel Aula — helpers compartidos (requiere config.js + SDKs compat cargados antes)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const FV = firebase.firestore.FieldValue;

let CATALOGO = [];
async function cargarCatalogo(){
  try{
    const r = await fetch(SITE_BASE + '/datos/temas-completos.json', {cache:'no-cache'});
    if(!r.ok) throw new Error(r.status);
    const d = await r.json();
    CATALOGO = d.map(t => ({id:t.id, nivel:t.nivel, area:t.area||'', tema:t.tema}));
  }catch(e){
    const r = await fetch('catalogo.json');
    CATALOGO = await r.json();
  }
  return CATALOGO;
}
function temaPorId(id){ return CATALOGO.find(t => t.id === id); }
function urlTema(id, tipo){
  const carpeta = {practica:'preview', leccion:'leccion', examen:'evaluacion'}[tipo] || 'preview';
  return SITE_BASE + '/' + carpeta + '/' + id + '.html';
}
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function fmtFecha(ts){
  if(!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('es-CO',{day:'numeric',month:'short',year:'numeric'}) + ' ' +
         d.toLocaleTimeString('es-CO',{hour:'numeric',minute:'2-digit'});
}
function scoreClass(n){ return n >= 80 ? 'good' : n >= 60 ? 'mid' : 'low'; }
function toast(msg){
  let t = document.getElementById('toast');
  if(!t){ t = document.createElement('div'); t.id='toast'; t.className='toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove('show'), 2600);
}
function nuevoToken(){
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  const a = new Uint8Array(22); crypto.getRandomValues(a);
  return Array.from(a, b => abc[b % abc.length]).join('');
}
const TIPO_LBL = {practica:'Práctica', leccion:'Lección', examen:'Examen', custom:'Clase custom'};
