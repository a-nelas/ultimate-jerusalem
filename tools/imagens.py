"""Prepara as imagens das personagens para o site.

Para cada imagem em assets/roles/ (.webp, .png ou .jpg):
  - cria uma miniatura leve em assets/roles/mini/<id>.webp (para a grelha de personagens);
  - regista-a em js/data/imagens.js, para o site só pedir imagens que existem (sem pedidos 404).

A imagem original fica intacta: é a que a Oficina usa para imprimir.
Uso: npm run imagens   (precisa de Python com Pillow: pip install pillow)
"""
from pathlib import Path
from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
PASTA = RAIZ / 'assets' / 'roles'
MINI = PASTA / 'mini'
MANIFESTO = RAIZ / 'js' / 'data' / 'imagens.js'
ORDEM = ['.webp', '.png', '.jpg', '.jpeg']   # a primeira que existir ganha
TAM_MINI = (132, 186)                       # 3 × a miniatura da grelha (44 × 62 px)


def main():
    MINI.mkdir(parents=True, exist_ok=True)
    escolhidas = {}
    for f in sorted(PASTA.iterdir()):
        if f.is_file() and f.suffix.lower() in ORDEM:
            atual = escolhidas.get(f.stem)
            if atual is None or ORDEM.index(f.suffix.lower()) < ORDEM.index(atual.suffix.lower()):
                escolhidas[f.stem] = f

    for id_, f in escolhidas.items():
        destino = MINI / f'{id_}.webp'
        if destino.exists() and destino.stat().st_mtime >= f.stat().st_mtime:
            continue
        with Image.open(f) as im:
            mini = ImageOps.fit(im.convert('RGB'), TAM_MINI, Image.LANCZOS, centering=(0.5, 0.4))
            mini.save(destino, 'WEBP', quality=80, method=6)

    for velha in MINI.glob('*.webp'):
        if velha.stem not in escolhidas:
            velha.unlink()

    linhas = [f"  {id_}: {{ arte: 'assets/roles/{f.name}', mini: 'assets/roles/mini/{id_}.webp' }},"
              for id_, f in sorted(escolhidas.items())]
    MANIFESTO.write_text(
        '// Gerado por tools/imagens.py (npm run imagens). Não editar à mão.\n'
        '// Imagens das personagens que existem em assets/roles/, para o site não pedir ficheiros em falta.\n'
        'export const IMAGENS = {\n' + '\n'.join(linhas) + ('\n' if linhas else '') + '};\n',
        encoding='utf-8', newline='\n')
    print(f'{len(escolhidas)} imagens registadas em js/data/imagens.js; miniaturas em assets/roles/mini/.')


if __name__ == '__main__':
    main()
