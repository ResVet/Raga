# Raga interface design: "stained glass"

## Idea

Anatomy students spend their first year looking at two things: a body and a glass slide stained with
hematoxylin and eosin (H&E). Raga's interface borrows from the second. Every panel is a piece of slide glass
lying over the specimen: frosted, a little thick at the edge, tinted by the two stains. Hematoxylin gives the
deep blue-violet of the base and of nuclei; eosin gives the pink used for whatever is selected, pinned or
asked about. Behind the 3D body sits an out-of-focus micrograph of tissue (pink fields, violet nuclei), so the
glass has something real to refract.

The memorable element is the specimen itself and its tag: a selected structure gets an eosin rim glow and a
glass tag that floats beside it, joined by a thin leader line, the way labels sit on an atlas plate. Everything
else stays quiet.

## Tokens

Colour
- `--hema-0` #0f0c24 deepest base (page, behind the canvas)
- `--hema-1` #171336 glass tint dark
- `--hema-2` #241d52 raised glass, active segment
- `--nucleus` #7b6cff focus rings, secondary accent, landmark dots
- `--eosin` #ff5d8f primary accent: selection, pins, primary buttons, quiz target
- `--eosin-pale` #ffc3d5 text on eosin-tinted glass, hover
- `--ink-0` #f6f3ff primary text; `--ink-1` #d2cbf2 secondary; `--ink-2` #9f97cb muted
- `--right` #6ff0c4, `--wrong` #ff8a3d (orange, so it never reads as the eosin accent)
- Atlas conventions kept as they are: origin #e5484d, insertion #3b82f6

Glass recipe (one place, reused)
- fill: `linear-gradient(160deg, rgba(255,255,255,.14), rgba(255,255,255,.04) 55%, rgba(123,108,255,.06))`
- `backdrop-filter: blur(22px) saturate(165%)`; fallback fill `rgba(23,19,54,.86)` when unsupported
- edge: 1px border `rgba(255,255,255,.16)` plus an inner top highlight `inset 0 1px 0 rgba(255,255,255,.22)`
- depth: `0 24px 60px -20px rgba(4,2,20,.7)`
- a 2% SVG noise overlay on large glass so it reads as frosted, not flat

Type
- UI: Schibsted Grotesk (variable). 15px body, 13px secondary, 12px meta; weights 450/600/750.
- Latin names: Brygada 1918 Italic (variable). Tag title 30px/1.05, search results 17px, quiz answers 22px.
  Italic Latin is how old atlas plates labelled structures, and it separates the name from the interface.
- Numbers (angles, timers, station numbers): Schibsted Grotesk with tabular figures.
- Sentence case everywhere. No all-caps labels, no eyebrow labels above headings, no middle-dot meta strings.

Shape
- Radii follow hierarchy: large glass panels 22px, tags 18px, instrument buttons 14px, chips full pill,
  slide cards 8px (real slides have small corners).
- Thin rules inside glass: `rgba(255,255,255,.10)`.

## Layout (desktop)

```
+---------------------------------------------------------------------------------------+
| Raga  Atlas  Motion  Quiz  Progress      [ / search the body ...................... ]   Ultra  EN  |
|                                                                                       |
|  +--+                                                                 +-------------+ |
|  |  |  dissection depth gauge                                         |  specimen   | |
|  |  |  (glass column, one stop per                 *--------------------  tag        | |
|  |  |   layer, skin at the top,                    (leader line)        |  (glass)    | |
|  |  |   bone at the bottom)                                             |             | |
|  +--+                                                                 +-------------+ |
|  [body map]                                                                           |
|                [ motion bar: play  Flexio cubiti   0 deg ----o---- 140 deg   1x  loop ] |
|                [ instrument tray: explode  cut  x-ray  isolate  views  photo  reset ]   |
+---------------------------------------------------------------------------------------+
```

- Header is a single glass strip floating 12px from the top edge, not a full-width bar.
- Dissection depth gauge (left): a tall, narrow glass column. Layers are stops from superficial to deep
  (Cutis, Fasciae, Musculi, Vasa, Nervi, Viscera, Juncturae, Ossa). Dragging the handle peels everything
  above it; each stop also has its own toggle and opacity on hover/long-press. This replaces a checkbox list.
- Body map (under the gauge): a small line drawing of a standing figure. Tapping the shoulder, elbow, hand,
  hip, knee, foot, thorax, heart or larynx jumps to that region. Replaces the chip list of regions.
- Specimen tag (right side, follows the selection vertically and draws an SVG leader line to the picked
  point): Latin name, English name, kind and side, then the facts as a definition list, then actions.
- Instrument tray (bottom centre): rounded glass bar of tools. Motion bar sits above it only while a clip
  is loaded.

## Layout (phone)

- Header collapses to wordmark, search button and graphics toggle; search opens full width.
- Depth gauge becomes a slim vertical column on the left edge (44px), labels appear while dragging.
- Specimen tag becomes a bottom glass sheet with three heights (peek with the Latin name, half, full).
- Instrument tray becomes a horizontal scroller pinned above the safe area; motion bar above it.

## Motion

Selecting a muscle with a known action shows "Play action" in the tag (for example "Flexio articulationis
cubiti" for m. biceps brachii). The motion bar shows the clip name in Latin, the joint angle live
("118 deg"), a scrubber, play/pause, speed (0.5x, 1x, 2x) and loop. The contracting muscle glows eosin and
thickens; antagonists tint violet while they lengthen. Motion mode lists every joint and its movements.

## Quiz

- Deck picker: decks are glass microscope slides laid on the backdrop, each with a frosted label end carrying
  the practical code (PA2) and the title, and stats on the clear part. No generic card grid.
- Station: a glass placard top centre with the station number set large and a ring timer for OSPE mode; the
  answer field is a glass strip at the bottom; feedback slides up as a glass card with the Latin answer.

## Motion of the interface

One load sequence (the body fades in from the blurred micrograph while the glass settles); after that motion
only answers actions: tags slide from the selection, the gauge handle snaps to stops, the feedback card rises.
`prefers-reduced-motion` turns all of it off.

## Copy

Plain, active, sentence case. Buttons say what happens ("Play action", "Peel to muscles", "Check answer").
No exclamation marks, no filler, no em dashes.

## Review against the generic defaults

- Not a cream or near-black page with one accent: the base is a stained, refracting micrograph and the two
  accents come from the H&E stain.
- No card grid: decks are slides, layers are a depth gauge, regions are a body map.
- No uniform radius or grey drop shadow on everything: radius and depth follow hierarchy.
- No template chrome (eyebrows, all caps, dot-joined meta, arrow suffixes, monospace labels).
