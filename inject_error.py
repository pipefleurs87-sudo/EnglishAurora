with open('prototipo-b1-adverbs-rpg.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<script>', '<script>\ntry {\n')
content = content.replace('</script>', '\n} catch (e) { document.getElementById("app").innerHTML = "<h1 style=\\"color:red\\">" + e.message + "</h1><pre style=\\"color:red;white-space:pre-wrap\\">" + e.stack + "</pre>"; console.error(e); }\n</script>')

with open('prototipo-b1-adverbs-rpg.html', 'w', encoding='utf-8') as f:
    f.write(content)
