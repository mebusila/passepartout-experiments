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

## Reaction GIFs

The article shows attractive text cards for the two jokes by default. The original GIFs are *not included* in this package because they feature copyrighted film/TV footage. Source links in the article point to the intended reactions.

If you have the rights to publish local copies, save them as:

```
assets/ryan-but-why.gif
assets/ali-g-respek.gif
```

They will automatically replace the corresponding fallback cards without any HTML edits.

Before publication, verify media reuse/embedding permissions and whether you prefer animated GIFs or static images.

## GitHub Pages — later

Nothing has been published to GitHub yet.

1. Create a repository (for example, `passepartout-field-notes`).
2. Push these files to the repository root.
3. Under **Settings → Pages**, choose **Deploy from a branch**, `main`, and `/(root)`.
4. After GitHub assigns the Pages URL, change `<meta property="og:image">` in `index.html` from `assets/og-cover.png` to the **full HTTPS URL**, e.g. `https://YOUR-USERNAME.github.io/passepartout-field-notes/assets/og-cover.png`. Also add `og:url` and optionally canonical URL.
5. After deployment, test the mobile page and LinkedIn's link preview before sharing.

All asset references are relative, so the site works at repository project URLs or at the root of a user Pages site.

## Editorial & evidence notes

Benchmark numbers are transcribed from the user's `passepartout_benchmark_notes_2026-10-21_updated.md` and screenshots from `passepartout_experiment_screenshots.zip`. They are experiment reports, not independently audited provider invoices or scientifically controlled comparisons.

- For six runs, `OpenRouter Δ` means observed balance differences, not definitive billing per run.
- MiniMax-only reported `$0.00` in OpenCode, but no closing OpenRouter balance was supplied; **do not turn this into a verified zero-dollar claim**.
- Team-reported passing test counts are not directly comparable across run implementations.
- Requested reasoning settings are not cross-provider equivalents, and may not reflect actual runtime routing.
- MiniMax-only was tested on a Debian VM, changing the environment relative to earlier runs.
- An independent local QA run was not completed for DeepSeek Max + Qwen High.
- The author judged DeepSeek High + Muse the strongest visually; this is subjective.
- The QA/XFCE tray anecdote comes from the author's firsthand observation.

If you change numbers, update both the HTML table **and** the data array at the top of `script.js`.

## Assets

Screenshots supplied by the project author. Other than explicitly optional local GIFs, the site contains no copied third-party media. No analytics or network calls are required for the local preview.
