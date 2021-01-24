const d = document;

const lang_req = new XMLHttpRequest();
const yamlfile = "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml"
lang_req.open("GET", yamlfile, false);
lang_req.send(null);

if (lang_req.status !== 200) {
   throw request.status;
}

class LangInfo extends HTMLElement {
   constructor(name, hex) {
      super();
      if (hex == null) {
         this.style.display = "none";
         return;
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

customElements.define("lang-info", LangInfo);

const languages = jsyaml.load(lang_req.responseText);
const lang_names = Object.keys(languages);
const lang_colors = Object.fromEntries(
   Object.entries(languages)
      .map(([name, {color}]) => [name, color])
);

lang_names.sort();

lang_names.forEach(
   name => d.body.appendChild(new LangInfo(name, lang_colors[name]))
);
