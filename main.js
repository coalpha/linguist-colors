const d = document;
const root = d.documentElement;

var lights = matchMedia("(prefers-color-scheme: light)").matches;
const btnLights = d.getElementById("lights");
function commitLights() {
   if (lights) {
      btnLights.innerText = "🌙";
      btnLights.title = "Turn off the lights."
      d.documentElement.className = "light";
   } else {
      btnLights.innerText = "☀️";
      btnLights.title = "Turn on the lights."
      d.documentElement.className = "";
   }
}
commitLights();
function toggleLights() {
   lights ^= 1;
   commitLights();
}
btnLights.addEventListener("click", toggleLights);

const reqLanguagesYml = new XMLHttpRequest();
const yamlfile = "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml"
reqLanguagesYml.open("GET", yamlfile, false);
reqLanguagesYml.send(null);

if (reqLanguagesYml.status !== 200) {
   throw request.status;
}

const langData =
   Object
      .entries(jsyaml.load(reqLanguagesYml.responseText))
      .map(([name, {color}]) => ({name, color}));

langData.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase());

class LangInfo extends HTMLElement {
   constructor(name, hex) {
      super();
      this.className = "lang-info";
      if (hex == null) {
         LangInfo.noHex.push(this);
      }

      const title = d.createElement("span");
      title.innerText = name;

      const color = d.createElement("div");
      color.classList.add("color");
      color.style.backgroundColor = hex;

      this.appendChild(title);
      this.appendChild(color);
   }
}
LangInfo.noHex = [];
customElements.define("lang-info", LangInfo);

const langInfos = langData.map(({name, color}) => new LangInfo(name, color));

var hidden = true;
const bnHidden = d.getElementById("hidden")
function commitHidden() {
   if (hidden) {
      bnHidden.innerText = "📃";
      bnHidden.title = "Display colorless languages."
      for (const info of LangInfo.noHex) {
         info.style.display = "none";
      }
   } else {
      bnHidden.innerText = "🎨";
      bnHidden.title = "Only show colored languages."
      for (const info of LangInfo.noHex) {
         info.style.display = "";
      }
   }
}
commitHidden();
function toggleHidden() {
   hidden ^= 1;
   commitHidden();
}
bnHidden.addEventListener("click", toggleHidden);

const divLangs = d.getElementById("langs")
for (const info of langInfos) {
   divLangs.appendChild(info);
}
