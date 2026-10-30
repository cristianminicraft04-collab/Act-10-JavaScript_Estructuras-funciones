class Actividad {
  constructor() {
    this.votos = { norte: 0, sur: 0, centro: 0 };
    this.inicial = ["México","Argentina","Brasil","Colombia","Perú","España","Francia","Italia","Japón","Canadá"];
    this.paises = [...this.inicial];
  }

  $(id) { return document.getElementById(id); }

  iniciar() {
    document.querySelectorAll("[data-accion]").forEach(el => {
      el.addEventListener("click", () => this[el.dataset.accion](el.dataset.op));
    });
    if (this.$("conteo")) this.mostrarConteo();
    if (this.$("arr")) this.pintar();
  }

  // ---------- 1. Votación ----------
  mensajeSeccion(s) {
    switch (s) {
      case "norte": return "Zona Norte: gracias por participar.";
      case "sur": return "Zona Sur: gracias por participar.";
      case "centro": return "Zona Centro: gracias por participar.";
      default: return "";
    }
  }
  mostrarConteo() {
    this.$("conteo").textContent =
      `Norte: ${this.votos.norte}\nSur: ${this.votos.sur}\nCentro: ${this.votos.centro}`;
  }
  votar() {
    const n = this.$("nombre").value.trim();
    const s = this.$("seccion").value;
    const v = this.$("voto").value;
    const out = this.$("out");
    if (!n || !s || !v) { out.textContent = "Completa todos los campos."; return; }
    this.votos[s]++;
    out.textContent = `${n}, tu voto por "${v}" fue registrado.\n` + this.mensajeSeccion(s);
    this.mostrarConteo();
  }

  // ---------- 2. Suma de positivos ----------
  sumar() {
    let suma = 0, contador = 0, n;
    do {
      const t = prompt("Número positivo (0 o negativo para terminar):");
      if (t === null) break;
      n = parseFloat(t);
      if (isNaN(n)) { alert("Escribe un número válido."); n = 1; continue; }
      if (n > 0) { suma += n; contador++; }
    } while (n > 0);
    this.$("out").textContent = `Números ingresados: ${contador}\nSuma total: ${suma}`;
  }

  // ---------- 3. If-else y case ----------
  ordenar() {
    const a = parseFloat(this.$("a1").value), b = parseFloat(this.$("a2").value), c = parseFloat(this.$("a3").value);
    let m, md, mn;
    if ([a, b, c].some(isNaN)) { this.$("o1").textContent = "Ingresa los 3 números."; return; }
    if (a >= b && a >= c) { m = a; if (b >= c) { md = b; mn = c; } else { md = c; mn = b; } }
    else if (b >= a && b >= c) { m = b; if (a >= c) { md = a; mn = c; } else { md = c; mn = a; } }
    else { m = c; if (a >= b) { md = a; mn = b; } else { md = b; mn = a; } }
    this.$("o1").textContent = `${m} > ${md} > ${mn}`;
  }
  neto() {
    const bruto = parseFloat(this.$("b1").value);
    if (isNaN(bruto)) { this.$("o2").textContent = "Ingresa un importe."; return; }
    let tasa;
    if (bruto > 15000) { tasa = 0.16; } else { tasa = 0.10; }
    const imp = bruto * tasa;
    this.$("o2").textContent = `Impuesto (${tasa * 100}%): ${imp.toFixed(2)}\nImporte neto: ${(bruto - imp).toFixed(2)}`;
  }
  sueldo() {
    const anios = parseFloat(this.$("c1").value), base = 40000;
    if (isNaN(anios) || anios < 0) { this.$("o3").textContent = "Ingresa los años."; return; }
    let aumento;
    switch (true) {
      case anios > 10: aumento = 0.10; break;
      case anios > 5: aumento = 0.07; break;
      case anios > 3: aumento = 0.05; break;
      default: aumento = 0.03;
    }
    this.$("o3").textContent = `Aumento: ${aumento * 100}%\nSueldo final: ${(base * (1 + aumento)).toFixed(2)}`;
  }

  // ---------- 4. While y For ----------
  impares() {
    let i = 1, suma = 0;
    while (i <= 100) { suma += i; i += 2; }
    this.$("o1").textContent = "La suma de los impares del 1 al 100 es: " + suma;
  }
  asteriscos() {
    const n = parseInt(this.$("n").value);
    if (isNaN(n) || n < 0) { this.$("o2").textContent = "Ingresa un número válido."; return; }
    let s = "";
    for (let i = 0; i < n; i++) { s += "*"; }
    this.$("o2").textContent = s || "(ninguno)";
  }
  tablas() {
    let t = "";
    for (let i = 1; i <= 10; i++) {
      t += `Tabla del ${i}\n`;
      for (let j = 1; j <= 10; j++) { t += `${i} x ${j} = ${i * j}\n`; }
      t += "\n";
    }
    this.$("o3").textContent = t;
  }

  // ---------- 5. Arreglos ----------
  pintar() {
    this.$("arr").innerHTML = Array.from({ length: this.paises.length }, (_, i) =>
      i in this.paises ? `<span>${i}: ${this.paises[i]}</span>` : `<span class="vacio">${i}: (vacío)</span>`).join("");
  }
  metodo(op) {
    const p = this.$("pais").value.trim(), pos = parseInt(this.$("pos").value) || 0;
    let msg = "";
    switch (op) {
      case "pop": msg = "pop() eliminó: " + this.paises.pop(); break;
      case "shift": msg = "shift() eliminó: " + this.paises.shift(); break;
      case "push":
        if (!p) { msg = "Escribe un país."; break; }
        this.paises.push(p); msg = `push("${p}") → length ${this.paises.length}`; break;
      case "unshift":
        if (!p) { msg = "Escribe un país."; break; }
        this.paises.unshift(p); msg = `unshift("${p}") → length ${this.paises.length}`; break;
      case "splice": {
        const r = p ? this.paises.splice(pos, 1, p) : this.paises.splice(pos, 1);
        msg = `splice(${pos},1${p ? `,"${p}"` : ""}) quitó: ${r.join(", ") || "nada"}`; break;
      }
      case "delete":
        delete this.paises[pos];
        msg = `delete paises[${pos}] deja la posición vacía (length sigue en ${this.paises.length}).`; break;
      case "reverse": this.paises.reverse(); msg = "reverse() invirtió el orden."; break;
      case "sort": this.paises.sort(); msg = "sort() ordenó alfabéticamente."; break;
      case "concat": {
        const extra = p ? [p] : ["Chile", "Uruguay"];
        this.paises = this.paises.concat(extra); msg = "concat() agregó: " + extra.join(", "); break;
      }
      case "join": msg = "join() → " + this.paises.join(this.$("sep").value); break;
      case "length": msg = "length = " + this.paises.length; break;
    }
    this.$("info").textContent = msg;
    this.pintar();
  }
  reiniciar() {
    this.paises = [...this.inicial];
    this.$("info").textContent = "Arreglo reiniciado.";
    this.pintar();
  }

  // ---------- 6. Menú desplegable ----------
  toggleMenu() {
    const abierto = this.$("drop").classList.toggle("show");
    this.$("toggle").setAttribute("aria-expanded", abierto);
  }
  ingresar() {
    const u = this.$("u").value.trim();
    this.$("msg").textContent = u ? `Bienvenido, ${u}.` : "Escribe tu usuario.";
  }
}

document.addEventListener("DOMContentLoaded", () => new Actividad().iniciar());
