# passepartout · seven AI-agent experiments

A standalone, responsive article for GitHub Pages. No framework, package manager, external fonts, tracking scripts, or build step.

The site includes the results of **seven nine-agent runs** of the Passepartout Lite benchmark and real screenshots exported from the author's experiment archive.

## Run locally

From this directory:

```bash
python3 -m http.server 8000
```

Open **http://localhost:8000** in your browser. You can also open `index.html` directly, but a local web server more closely matches GitHub Pages.

## Files

- `index.html`: article, scorecard, screenshots, links and metadata.
- `styles.css`: responsive design and layout.
- `script.js`: chart switcher, screenshot viewer and optional reaction GIFs.
- `prompts/passepartout-lite-initial-prompt.md`: unchanged original benchmark build brief (also embedded in a collapsed `<details>` element in the article).
- `assets/*.webp`: 7 original experiment screenshots, one per experiment run.
- `assets/og-cover.png`: LinkedIn/social sharing image made from an experiment screenshot.
- `assets/favicon.svg`: small local icon.

## Layout notes

The **Meet the nine agents** panel groups roles by responsibility and model assignment rather than implying a formal reporting hierarchy. All screenshots are displayed without synthetic window title bars or rotated mockup frames, preserving the original XFCE decorations already in the image. The social preview also uses an unrotated, unframed screenshot.

## Original benchmark prompt

In **The setup**, expand **“What did I actually ask them to build?”** to read the complete original prompt. This is a native HTML `<details>` element (collapsed by default, works without JavaScript). The raw Markdown is linked inside the expanded section. The original prompt is not the entire OpenCode configuration: agent roles, routing, reasoning effort, and tools were configured separately.
