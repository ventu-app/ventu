// Uso:  node fix-encoding.js caminho\do\arquivo.js [outro.html ...]
// Desfaz "mojibake" (NarraÃ§Ã£o -> Narração, ðŸ'© -> 👩). Faz backup .bak e salva em UTF-8 sem BOM.
const fs = require('fs');

const cp = new TextDecoder('windows-1252');
const rev = new Map();
for (let b = 0; b < 256; b++) rev.set(cp.decode(Uint8Array.of(b)), b);
// bytes indefinidos no cp1252 (0x81,0x8D,0x8F,0x90,0x9D) viram o controle C1 equivalente
const strict = new TextDecoder('utf-8', { fatal: true });
const RUN = /[\u0080-\u00FF\u0152\u0153\u0160\u0161\u0178\u017D\u017E\u0192\u02C6\u02DC\u2013\u2014\u2018-\u201E\u2020-\u2022\u2026\u2030\u2039\u203A\u20AC\u2122]+/g;

function fixRun(run) {
  const bytes = [];
  for (const ch of run) {
    if (rev.has(ch)) bytes.push(rev.get(ch));
    else if (ch.charCodeAt(0) < 256) bytes.push(ch.charCodeAt(0));
    else return run;
  }
  try { return strict.decode(Uint8Array.from(bytes)); } catch { return run; }
}
function fix(text) {
  let prev, cur = text, n = 0;
  do { prev = cur; cur = prev.replace(RUN, fixRun); n++; } while (cur !== prev && n < 3);
  return cur;
}

for (const f of process.argv.slice(2)) {
  const raw = fs.readFileSync(f, 'utf8').replace(/^\uFEFF/, '');
  const out = fix(raw);
  if (out === raw) { console.log('Sem alterações (já limpo):', f); continue; }
  fs.copyFileSync(f, f + '.bak');
  fs.writeFileSync(f, out, 'utf8');
  console.log('Corrigido:', f, '(backup em .bak)');
}