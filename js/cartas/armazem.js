// Guarda a arte carregada (e o enquadramento) neste navegador, em IndexedDB.
// Nada é enviado para lado nenhum. Se o armazenamento falhar (janela privada, etc.), funciona só em memória.

const BD = 'ultimate-jerusalem';
const LOJA = 'arte';
const memoria = new Map();
let abrir;

function bd() {
  if (!abrir) {
    abrir = new Promise((res, rej) => {
      try {
        const pedido = indexedDB.open(BD, 1);
        pedido.onupgradeneeded = () => pedido.result.createObjectStore(LOJA);
        pedido.onsuccess = () => res(pedido.result);
        pedido.onerror = () => rej(pedido.error);
      } catch (e) { rej(e); }
    }).catch(() => null);
  }
  return abrir;
}

async function operar(modo, fn) {
  const db = await bd();
  if (!db) return undefined;
  return new Promise((res) => {
    try {
      const tx = db.transaction(LOJA, modo);
      const pedido = fn(tx.objectStore(LOJA));
      tx.oncomplete = () => res(pedido?.result);
      tx.onerror = tx.onabort = () => res(undefined);
    } catch { res(undefined); }
  });
}

/** @returns {Promise<{blob:Blob, nome:string, corte:object}|undefined>} */
export async function lerArte(id) {
  if (memoria.has(id)) return memoria.get(id);
  const v = await operar('readonly', (s) => s.get(id));
  if (v) memoria.set(id, v);
  return v;
}

export async function guardarArte(id, valor) {
  memoria.set(id, valor);
  await operar('readwrite', (s) => s.put(valor, id));
}

export async function apagarArte(id) {
  memoria.delete(id);
  await operar('readwrite', (s) => s.delete(id));
}

export async function listarArte() {
  const chaves = await operar('readonly', (s) => s.getAllKeys());
  return new Set([...(chaves ?? []), ...memoria.keys()]);
}

// Preferências e textos editados: pequenos, em localStorage.
export function lerJSON(chave, omissao) {
  try { return JSON.parse(localStorage.getItem(chave) ?? 'null') ?? omissao; } catch { return omissao; }
}
export function guardarJSON(chave, valor) {
  try { localStorage.setItem(chave, JSON.stringify(valor)); } catch { /* sem armazenamento */ }
}
