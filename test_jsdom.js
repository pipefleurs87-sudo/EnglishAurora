const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('prototipo-b1-adverbs-rpg.html', 'utf-8');
const dom = new JSDOM(html, { runScripts: "dangerously" });

setTimeout(() => {
  console.log("App div content length:", dom.window.document.getElementById('app').innerHTML.length);
  const h1 = dom.window.document.querySelector('h1');
  if (h1 && h1.style.color === 'red') {
    console.error("ERROR CAUGHT:");
    console.error(h1.textContent);
    const pre = dom.window.document.querySelector('pre');
    if (pre) console.error(pre.textContent);
  } else {
    console.log("No error block found, rendering successful.");
  }
}, 500);
