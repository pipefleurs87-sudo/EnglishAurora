#!/usr/bin/env python3
# English Aurora — build de olas B y C.
# Estampa waves/*.json con los MOTORES REALES de Dummy_alfa/motor/
# (misma estructura que la ola A: Lesson + Practice + Test),
# reutilizando inyectar() de build/build.py — no se reinventa nada.
# Salida: englishaurora/{preview,leccion,evaluacion}/{id}.html
import json, pathlib, sys

EA = pathlib.Path(__file__).resolve().parent          # englishaurora/
ROOT = EA.parent                                       # Dummy_alfa/
sys.path.insert(0, str(ROOT / "build"))
import build as B                                      # build.py real (solo se lee, no se ejecuta main)

WAVES = EA / "waves"
MOTORES = {
    "preview":    (ROOT / "motor" / "motor-generico.html",      "ejercicios"),
    "leccion":    (ROOT / "motor" / "lecciones-generico.html",  "leccion"),
    "evaluacion": (ROOT / "motor" / "evaluacion-generico.html", "examen"),
}
TITULO = {
    "preview":    (" — {n} Exercises | English Aurora",  "exercise"),
    "leccion":    (" — {n} Video Lesson | English Aurora", "lesson"),
    "evaluacion": (" — {n} Test | English Aurora",       "quiz"),
}

def main():
    jsons = sorted(WAVES.glob("*.json"))
    assert jsons, "no hay olas en waves/"
    for carpeta, (motor_path, modo) in MOTORES.items():
        (EA / carpeta).mkdir(exist_ok=True)
        motor_txt = motor_path.read_text(encoding="utf-8")
        assert motor_txt.rstrip().endswith("</html>"), "motor truncado: " + motor_path.name
        for jf in jsons:
            data = json.loads(jf.read_text(encoding="utf-8"))   # json.load valida: truncado = explota aqui
            B.revisar_formas(data)
            B.revisar_etapas(data)
            tema, niv = data["tema"], data["nivel"]
            area = B.area_de(data)
            th = B.titulo_hibrido(tema, area)
            es = B.AREA_ES.get(area, "")
            kw = tema + " exercises, English grammar, " + area + ", " + niv + " English, ESL"
            suf, rtype = TITULO[carpeta]
            t = th + suf.format(n=niv)
            de = tema + " — " + niv + " English Aurora wave " + data["id"][-2:] + ": new vocabulary, same structure."
            page = B.inyectar(motor_txt, data, t, de, kw, B.jsonld_for(data, area, rtype), modo)
            out = EA / carpeta / (data["id"] + ".html")
            out.write_text(page, encoding="utf-8")
            # verificacion anti-truncado inmediata
            back = out.read_text(encoding="utf-8")
            assert back.rstrip().endswith("</html>"), "pagina truncada: " + out.name
            assert "window.SEQUENCE_DATA" in back, "sin SEQUENCE_DATA: " + out.name
        print("  OK  " + carpeta + "/  (" + str(len(jsons)) + " paginas)")
    print("Listo: " + str(len(jsons)) + " olas x 3 vistas = " + str(len(jsons)*3) + " paginas verificadas.")

if __name__ == "__main__":
    main()
