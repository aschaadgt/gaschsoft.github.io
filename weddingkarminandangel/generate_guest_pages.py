"""Regenerate the five guest routes after editing the main invitation."""
from pathlib import Path

root = Path(__file__).resolve().parent
source = (root / 'index.html').read_text(encoding='utf-8')
base_url = 'https://gaschsoft.com/weddingkarminandangel/'
for guests in range(1, 6):
    destination = root / str(guests)
    destination.mkdir(exist_ok=True)
    (destination / 'index.html').write_text(
        source.replace(base_url + '"', base_url + str(guests) + '/"'),
        encoding='utf-8',
    )
print('Generated guest routes /1/ through /5/.')
