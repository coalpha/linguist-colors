const d = document;

const lang_div = d.getElementById("languages");

const lang_prom = fetch("https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml").then(r => r.text());

void async function main() {
   const langs = jsyaml.load(await lang_prom);
   console.log(langs);
   debugger;
}();
