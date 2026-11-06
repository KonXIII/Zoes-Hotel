# Rhodes sketch backgrounds

Faint pen-and-ink line etchings of real Rhodes landmarks, meant to sit behind cream sections
with `mix-blend-mode: multiply` at about 10–18% opacity. The paper is pure `#FFFFFF`, so it disappears under multiply.
Every drawing keeps its subject in the bottom third and along the left/right edges. The top ~45% and the centre are empty.

| File | Subject | Size |
|---|---|---|
| `lindos.webp` | Lindos acropolis (Knights' castle walls, stoa columns, Temple of Athena Lindia) above the whitewashed village with the Panagia bell tower, and the bay with two boats on the left | 87 KB |
| `old-town.webp` | Rhodes Old Town: the Palace of the Grand Master gate with twin round towers on the right; the medieval walls, dry moat and a d'Amboise-style twin-tower gate with an arched bridge on the left | 110 KB |
| `mandraki.webp` | Mandraki harbour: the stag column (left) and doe column (right), the three windmills on the mole, and Agios Nikolaos fort with its lighthouse | 67 KB |
| `anthony-quinn-bay.webp` | Anthony Quinn Bay: limestone cliffs with Aleppo pines leaning over the cove, a small islet and a pebble shore | 131 KB |
| `ladiko-hills.webp` | Low Ladiko hills: olive trees, cypresses, a dry-stone terrace, and tiny sun loungers and a parasol at the distant sea (sparsest of the set) | 41 KB |

All files are 2400×1200 greyscale WebP, quality 70.

## Generation

- **Model:** Higgsfield `gpt_image_2_6` (GPT Image 2.6), `size: 2560x1280`, `resolution: 2k`, `quality: high`, PNG.
- **Credits:** 2.75 per image × 5 = **13.75 credits** (Lindos test first, then the other 4 in one batch, with no rejects or retries).
- **Post-processing** (sharp): greyscale → levels with white point 247 (raw paper was 253–254, so it becomes pure 255) → resize to 2400 px wide → WebP q70, effort 6.

### Shared style block (identical in all 5 prompts)

> STYLE: thin, fine, warm-grey ink hairlines only, sparse light contour hatching at most; no tonal shading, no solid black areas, no fills, no washes, no colour at all. Background is pure flat white paper (#FFFFFF), no paper texture, no vignette, no border, no frame. COMPOSITION: very wide panoramic layout; the drawing sits in the bottom third and climbs only up the far left and far right edges; the top 45% of the image and the centre are almost completely empty white paper; lines thin out and fade softly toward the centre and top as if the sketch were left unfinished. No people, no text, no lettering, no signature, no watermark.

Each prompt starts with *"Delicate hand-drawn architectural pen-and-ink line etching, like a page from a travel sketchbook."* (the Ladiko prompt adds *"very sparse and soft"*), then gives a SUBJECT section and then the style block above.

### Subject sections

- **lindos:** Lindos, Rhodes, Greece, drawn accurately as the real place. On the right side, the steep bare rocky headland of the Lindos acropolis, crowned by the crenellated medieval Knights' castle walls along the cliff edge and, on the summit, the few standing Doric columns of the Hellenistic stoa and the small Temple of Athena Lindia. Below it, along the bottom of the picture, the village of Lindos: dense clusters of small cubic whitewashed houses with flat roofs stepping down the hillside, narrow lanes, and the stone bell tower of the Church of the Panagia. On the far left, the gentle curve of Lindos bay with a calm sea horizon line, a sandy beach and two small boats.
- **old-town:** The medieval Old Town of Rhodes, Greece, drawn accurately as the real place. On the right side, the Palace of the Grand Master of the Knights of Rhodes: a massive rectangular stone palace with crenellated battlements, its main entrance flanked by two tall round towers with machicolations, small arched windows. From it, running low along the bottom of the picture toward the left, the thick medieval city walls with square and round towers, merlons and a broad dry moat in front, and on the left side a fortified arched gateway (like the d'Amboise Gate) with a pointed stone arch, round flanking towers and a stone bridge crossing the moat. A few palm trees and a cypress near the walls.
- **mandraki:** Mandraki harbour, Rhodes town, Greece, drawn accurately as the real place. At the harbour entrance, on the far left, a tall slender stone column on the quay topped by a bronze statue of a stag (male deer with antlers); on the far right, a matching column topped by a bronze doe (female deer). Between them, low along the bottom of the picture, the long stone harbour mole with the three old round stone windmills of Mandraki in a row (conical roofs, no sails or bare sail spars), and at the end of the mole the round stone fort of Agios Nikolaos with a small lighthouse. Calm harbour water drawn with a few horizontal ripple lines, two or three small traditional wooden caiques moored at the quay.
- **anthony-quinn-bay:** Anthony Quinn Bay near Faliraki, Rhodes, Greece, drawn accurately as the real place: a small, narrow rocky cove enclosed by steep, rugged pale limestone cliffs on both sides. On the far left and far right, Aleppo pine trees growing on the rocks and leaning out over the water, their branches reaching toward the cove. A small rocky islet near the mouth of the cove, clear calm water drawn with a few fine horizontal ripple lines and faint outlines of submerged rocks, a tiny pebble beach at the bottom edge. *(The "No people" line also adds "no boats".)*
- **ladiko-hills:** The low rolling hills of Ladiko near Faliraki, Rhodes, Greece: gentle hill contours drawn with a few long flowing lines, scattered gnarled olive trees on the slopes, a few tall slender Mediterranean cypresses standing on the far left and far right, a dry-stone terrace wall. Far away in the lower middle distance, a thin calm sea line and a tiny row of three or four sun loungers with one folded parasol on a small beach, drawn very small. Minimal detail, fewest lines possible. *(The "No people" line also adds "no buildings".)*

## Accuracy notes

These are AI interpretations, not survey drawings. They are recognisable, but:
- **Old Town:** the Grand Master's Palace gate (twin round towers, pointed arch) is close. The facade has more windows than the real one, and the left gate is a generic twin-tower gate in the spirit of the d'Amboise Gate, not an exact copy.
- **Mandraki:** the stag and doe columns, three windmills and Agios Nikolaos fort are all correct elements. The fort and windmills are compressed into one frontal view that you can't see from a single real vantage point.
- **Lindos:** the acropolis silhouette is somewhat idealised (more columns standing and a fuller castle wall than today).
