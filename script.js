const simbolos = ["🐶", "🐱", "🐸", "🦊", "🐼", "🐵", "🦁", "🐧"];

let primeraCarta = null;
let bloqueado = false;
let intentos = 0;
let parejas = 0;

// Mezcla un arreglo (algoritmo Fisher-Yates)
function mezclar(arreglo) {
  for (let i = arreglo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]];
  }
  return arreglo;
}

function iniciarJuego() {
  const tablero = document.getElementById("tablero");
  tablero.innerHTML = "";
  primeraCarta = null;
  bloqueado = false;
  intentos = 0;
  parejas = 0;
  actualizarMarcador();
  document.getElementById("mensaje").textContent = "";

  const cartas = mezclar([...simbolos, ...simbolos]);

  cartas.forEach(simbolo => {
    const div = document.createElement("div");
    div.className = "carta";
    div.textContent = simbolo;
    div.addEventListener("click", () => voltear(div));
    tablero.appendChild(div);
  });
}

function voltear(carta) {
  if (bloqueado || carta.classList.contains("volteada") ||
      carta.classList.contains("encontrada")) return;

  carta.classList.add("volteada");

  if (primeraCarta === null) {
    primeraCarta = carta;
    return;
  }

  intentos++;
  actualizarMarcador();

  if (primeraCarta.textContent === carta.textContent) {
    primeraCarta.classList.replace("volteada", "encontrada");
    carta.classList.replace("volteada", "encontrada");
    parejas++;
    actualizarMarcador();
    primeraCarta = null;
    if (parejas === simbolos.length) {
      document.getElementById("mensaje").textContent =
        "¡Ganaste en " + intentos + " intentos! 🎉";
    }
  } else {
    bloqueado = true;
    setTimeout(() => {
      primeraCarta.classList.remove("volteada");
      carta.classList.remove("volteada");
      primeraCarta = null;
      bloqueado = false;
    }, 1000);
  }
}

function actualizarMarcador() {
  document.getElementById("intentos").textContent = intentos;
  document.getElementById("parejas").textContent = parejas;
}

iniciarJuego();