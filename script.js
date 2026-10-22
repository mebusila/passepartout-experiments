"use strict";

// Display only. All source numbers are retained in the table even when JS is unavailable.
const runs = [
  {name:"Luna High + Muse",minutes:277.2,cost:3.80,tests:230},
  {name:"DeepSeek Max + Qwen",minutes:507.683,cost:19.97,tests:160},
  {name:"Luna Max + Muse",minutes:415.3,cost:5.68,tests:254},
  {name:"DeepSeek High + Muse",minutes:435,cost:3.95,tests:164,highlight:true},
  {name:"DeepSeek High + MiniMax",minutes:230,cost:2.19,tests:197},
  {name:"Luna High + MiniMax",minutes:484.483,cost:1.19,tests:286},
  {name:"MiniMax-only",minutes:214,cost:null,tests:192}
];

const chart = document.getElementById("bar-chart");
const chartCaveat = document.getElementById("chart-caveat");
const switches = Array.from(document.querySelectorAll("[data-metric]"));
const descriptions = {
  time: "Times include agent coordination and environmental effects—not just model inference speed. The MiniMax-only run used a Debian VM.",
  cost: "Shown: observed OpenRouter balance changes, not audited invoices. MiniMax-only reported $0 in OpenCode, but has no balance measurement, so it is marked N/A.",
  tests: "Reported passing automated tests. Test counts aren't standardized for coverage, skipped tests, or native verification."
};
function renderChart(metric) {
  if (!chart) return;
  const field = metric === "time" ? "minutes" : metric === "cost" ? "cost" : "tests";
  const max = Math.max(...runs.map(r=>r[field] ?? 0));
  chart.replaceChildren();
  for (const run of runs) {
    const row = document.createElement("div");
    row.className = "bar-row" + (run.highlight ? " is-highlight" : "");
    const name = document.createElement("span"); name.className="bar-name";name.textContent=run.name;
    const track = document.createElement("div");track.className="bar-track";
    const fill = document.createElement("div");fill.className="bar-fill";
    fill.style.width = (run[field]===null ? 0 : Math.max(1.5,100*run[field]/max))+"%";
    track.appendChild(fill);
    const value = document.createElement("span");value.className="bar-value";
    value.textContent = metric === "time" ? `${Math.floor(run.minutes/60)}h ${Math.round(run.minutes%60)}m` : metric==="cost" ? (run.cost===null ? "N/A" : "$"+run.cost.toFixed(2)) : String(run.tests);
    row.append(name,track,value);chart.appendChild(row);
  }
  if(chartCaveat) chartCaveat.textContent = descriptions[metric];
  for(const b of switches){let active=b.dataset.metric===metric;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active));}
}
switches.forEach(b=>b.addEventListener("click",()=>renderChart(b.dataset.metric)));
renderChart("time");

const dialog=document.getElementById("lightbox");
const lightboxImg=document.getElementById("lightbox-img");
const lightboxCaption=document.getElementById("lightbox-caption");
if(dialog){
  document.querySelectorAll(".shot-button[data-full]").forEach(button=>button.addEventListener("click",()=>{
    lightboxImg.src=button.dataset.full;
    lightboxImg.alt=button.querySelector("img")?.alt||"Experiment screenshot";
    lightboxCaption.textContent=button.dataset.caption||"Screenshot";
    if(typeof dialog.showModal==="function")dialog.showModal();
    else window.open(button.dataset.full,"_blank","noopener");
  }));
  dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener("close",()=>{lightboxImg.removeAttribute("src");});
}

// GIFs are intentionally not copied from third-party meme sites. If user-owned/licensed GIFs
// are placed at the paths below, they replace the local fallback cards automatically.
for(const figure of document.querySelectorAll("[data-local-media]")){
  const image=new Image();
  image.className="reaction-image";image.loading="lazy";
  image.alt=figure.dataset.localMedia.includes("ryan")?"Ryan Reynolds, But why? reaction":"Ali G, Respek! reaction";
  image.addEventListener("load",()=>{figure.querySelector(".reaction-placeholder")?.replaceWith(image);});
  image.src=figure.dataset.localMedia;
}
