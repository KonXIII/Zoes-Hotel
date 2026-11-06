# Art Direction — {{project_name}}

> The concept layer. Filled during BOOTSTRAP step 9a, after the DNA interview and before build.
> A *concept* is a point of view, not a style menu. This is what separates award-grade work
> from a competent template. Anchor everything to `brief.md`.

---

## 1. The big idea (concept statement)
> One or two sentences. The unifying idea the whole site expresses. If every page is a sentence,
> this is the thesis. Should be defensible against "why not just a clean template?"

{{concept_statement}}

## 2. Reference direction
- **Sites we're pulling energy from (2–3; each one studied through a DESIGN.md: `references/design-md/<brand>/` for the 84 listed brands, otherwise one written into `references/sites/<domain>/`):** {{references}}
- **What specifically to borrow (principles: type-scale ratio, spacing rhythm, depth, radius, colour discipline, composition, motion, tone — NOT the brand's colours, fonts, logo or layouts):** {{borrow}}
- **Anti-references (what to avoid):** {{anti_references}}

## 3. Type system
- **Display / headline face + why:** {{display_type}}
- **Body face + why:** {{body_type}}
- **Scale & rhythm intent:** {{type_scale_intent}}  <!-- editorial, brutal, restrained, oversized -->

## 4. Color system
- **Palette direction (from the client's brand via `brand-identity`, or reference DESIGN.md principles):** {{palette}}
- **Backgrounds / surfaces:** {{surfaces}}
- **Accent + when it's allowed to appear:** {{accent_rule}}

## 5. Layout & composition
- **Grid intent:** {{grid_intent}}  <!-- strict, broken, asymmetric, editorial -->
- **Whitespace temperament:** {{whitespace}}

## 6. Motion temperament
- **Overall feel:** {{motion_feel}}  <!-- physical/Apple, snappy, cinematic, minimal -->
- **Easing / duration defaults:** {{motion_defaults}}
- **Reduced-motion stance:** {{reduced_motion}}

## 7. The signature moment
> Every memorable site has ONE thing people remember. Name it and where it lives.

{{signature_moment}}

## 8. Creative-tech ambition (optional)
- **Does the signature moment need WebGL / 3D / shaders / canvas?** {{needs_creative_tech}}
<!-- If yes: no official Three.js Claude skill exists — vendor a community R3F skill into
     .agents/skills/ first (e.g. Impertio-Studio/Three.js-Claude-Skill-Package), then add
     three / @react-three/fiber / @react-three/drei per TECH-STACK → CREATIVE TECH. -->
