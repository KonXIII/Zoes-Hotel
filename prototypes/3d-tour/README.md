# Room tour prototype: Swim-Up Suite and Superior Room

A standalone, zero-dependency "walk through the room" viewer built **only from the hotel's own photographs**, plus two short AI-animated camera moves (Swim-Up Suite pilot).

**Not a true 3D or 360° tour.** The source material has no panoramas, so you can't look around freely from a fixed point. This is a guided photo walk-through with depth effects.

## How to open

- Quickest: double-click `index.html`. It works from `file://` (fonts load from Google Fonts when online).
- Or serve the folder: `cd prototypes/3d-tour && python3 -m http.server 8765`, then open <http://localhost:8765>.
- Deep links work, e.g. `index.html#suite-dusk` or `index.html#sup-room`.

## What it does

- **Two rooms** (tabs or keys `1` / `2`): Swim-Up Suite (14 views) and Superior Room (9 views).
- **Hotspots** (teal dots) sit on real features visible in each photo, like the bed, sofa corner, veranda door or mirror. Clicking one "walks" into the next view: the camera zooms toward that spot and the next photo settles in.
- **Depth feel:** a slow Ken Burns drift and pointer parallax on desktop. On touch screens, drag to look around the cropped photo.
- **"As the light drops":** a slider steps between three real photos of the same suite view (Vlasis-120/121/122): late afternoon, dusk and night.
- **Guided tour** button (or `Space`) auto-advances through the room.
- **AI walk-in clips** (Swim-Up Suite only): "Watch the walk-in" on view 1 and "Watch the pool glide" on the veranda view. Both are labelled as AI-animated inside the player.
- Keyboard: `←` `→` move, `Space` guided tour, `1` `2` switch rooms, `L` show all hotspot labels, `Esc` close video. There's also a Back button.
- `prefers-reduced-motion`: no drift, parallax, pulse or zoom-through. Views switch with a short fade and the clips never autoplay.
- Mobile: full-bleed stage, drag to pan, flick left/right to move, thumbnail strip, labels always visible on touch.
- Palette: limestone `#F8F4EC`, ink `#2E241B` and teal `#1D6C77`. Type: EB Garamond and Commissioner.

## Source photos used

Exported to `media/photos/*.webp` (re-encoded only: no retouching, crops or edits).

| View | File in viewer | Source photo |
|---|---|---|
| **Swim-Up Suite** | | `Images/Swip Up Suite/` |
| Step inside | suite-room | Vlasis-50 |
| Oak-slat headboard | suite-bed | Vlasis-54 |
| Sofa corner | suite-sofa | Vlasis-52 |
| Looking back to the door | suite-entry | Vlasis-83 |
| Mirror and shelf at dusk | suite-mirror | Vlasis-126 |
| As the light drops | suite-dusk-1/2/3 | Vlasis-120, 121, 122 |
| Bathroom | suite-bath | Vlasis-84 |
| Wave-tile basin | suite-basin | Vlasis-103 |
| Walk-in rain shower | suite-shower | Vlasis-57 |
| Coffee and tea | suite-kettle | Vlasis-118 |
| Your veranda on the pool | suite-veranda-day | Vlasis-108 |
| The swim-up pool | suite-pool-long | Vlasis-6-4 |
| The veranda at dusk | suite-veranda-dusk | Vlasis-76 |
| By night | suite-pool-night | Vlasis-74 |
| **Superior Room** | | `Images/Superior Rooms/` |
| The Superior Room | sup-room | A-1 |
| Oak headboard | sup-bed | L1229827 |
| Desk and balcony | sup-desk | A-2 |
| Mirror and oak desk | sup-vanity | A-5 |
| Coffee corner | sup-kettle | A-3 |
| From the door | sup-entry | A-4 |
| Sofa corner | sup-sofa | L1229825 |
| Shower room | sup-bath | A-7 |
| Reading lamp | sup-lamp | A-11 |

**Deliberately excluded**
- **Vlasis-55**: the photographer's camera is visible in the mirror.
- **A-15, L1229833, L1229834**: these show a *different Superior unit* (white geometric screen instead of the oak slats, a light-grey sofa and red canvas art). Mixing them in would make the "walk" show a room that doesn't exist. They could become a second Superior variant later.
- Near-duplicates (Vlasis-80/81/82/105/53/124/125, 101b, 116, 106, 107, A-6, A-12/14 portrait crops) and hotel exteriors (1b, 63, 68, 69, 71b, 77, 78) were left out to keep the walk short. They're easy to add in the `SCENES` table in `index.html`.

## AI-generated media (Higgsfield)

| File | Made from | Model | Cost | Verdict |
|---|---|---|---|---|
| `media/video/suite-walk-in.mp4` (5 s, 720p) | Vlasis-50, centre-cropped to 16:9 by us (no AI outpainting) | Kling 3.0 std, silent | 6.25 cr | **Accepted.** Steady push from the entrance past the bed to the sofa corner. Everything it reveals (sofa with two teal cushions, round black table with white flowers, grey curtains, pool through the door) matches the real photo Vlasis-52. No added objects. Slightly soft. |
| `media/video/suite-veranda.mp4` (5 s, 720p) | Vlasis-108, cropped to 16:9 | Kling 3.0 std, silent | 6.25 cr | **Accepted.** Glide across the pool toward the veranda. Ladders, loungers, tables, chairs, pillar lamp and stone wall all match in count and position. Minor drift only in the reflections on the right-hand window glass. Natural water ripples. |
| `media/video/suite-tour-combined.mp4` (9 s) | The two clips above with a 0.8 s cross-fade (local ffmpeg) | none | 0 | Teaser cut for sharing. |
| `media/video/_original-*.mp4` | Untouched Kling downloads | | | Kept as the paid originals. The web versions are re-encoded (H.264, faststart). |

**Credits:** balance was 250 before and 237.5 after, so **12.5 credits were spent (5.0%)**. No plans were bought and no preferences changed.

### Why this approach

- **3D Jutsu / new camera angles (Option A): not used.** It rebuilds a rough 3D blockout from one photo and then *generates* views of hidden areas with Seedream. That means inventing parts of the room the photos don't show, which breaks the "no invented content" rule. It would also take several paid generations per view.
- **Image-to-video camera moves (Option B): piloted.** Kling 3.0 std at 6.25 credits per 5 s clip was the best value among the faithful image-to-video models quoted (Grok Lite was 5 credits but 480p; Kling Turbo 7.5; Seedance 2.5 draft 15; MiniMax H3 Max 12.5). The budget covered 2 clips.
- **Photo tour (Option C): built as the main deliverable.** It costs nothing and is 100% faithful.

### Cost to finish Option B properly
A 20–40 s film per room needs about 4–8 clips per room (with retries, budget about 1.5×):
- Swim-Up Suite: 2 done, 4–6 more ≈ **25–55 credits**.
- Superior Room: 4–8 clips ≈ **25–75 credits**.
Good candidates: Vlasis-83 (entry to bed), Vlasis-126 (mirror to veranda at dusk), Vlasis-76 (pool at dusk), Vlasis-84 (bathroom), A-1, A-2, A-4, L1229825. Clips that move far beyond the photo's edges risk inventing space, so each one needs the same check against the other photos.

## Known limits

- **Not a true 360° tour or a 3D model.** You can't stand in one spot and turn around freely. Transitions between photos suggest movement but aren't geometrically exact.
- Source photos are only about 930–1024 px wide (four are 1600 px after export), so they look soft on large or retina screens.
- Hotspot labels near the frame edge can be partly clipped on narrow phones until you drag the view.
- The dusk slider snaps between the three photos because Vlasis-121 sits about 1–2% out of register with 120 and 122. A free blend would show ghosting.
- The AI clips are 720p, 5 s each, and are only on the Swim-Up Suite.
- The bathroom layout relative to the bedroom is unknown from the photos, so the bathroom views are reached from the strip, not from a door hotspot.

## Porting to the Next.js site later

Everything lives in one HTML file: the `SCENES` / `ROOMS` data plus about 250 lines of vanilla JS. It can become a client component (`"use client"`), with `media/` moved under `public/tour/`. Nothing here touches `app/`, `components/`, `public/` or config.

## What a real 3D / 360° tour would need

- **Matterport (or similar) scan:** a Matterport Pro3 or a local Matterport Capture Services pro, roughly 30–60 minutes per room. It produces a true walk-through "dollhouse" with measurements and embeds in the site via iframe. There's an ongoing hosting subscription.
- **360° photo shoot:** a 360 camera (Insta360 X4 / Ricoh Theta Z1 class) on a tripod, with 3–5 spheres per room (entry, bed, sofa, bathroom, veranda) shot at the same light. Shown in a free viewer like Pannellum or Marzipano with hotspots between spheres. This is the cheapest true 360 route, and this prototype's UI could be reused around it.
- **Gaussian-splat capture** (e.g. Polycam / Luma from a slow walk-around video): photoreal free movement. Newer tech, heavier files, and it needs a dedicated shoot.
