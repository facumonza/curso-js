const adivinarNumero = Math.floor(Math.random() * 100) + 1;
let adivinanza;
let intentos = 0;
debugger
while (adivinanza !== adivinarNumero) {
  adivinanza = parseInt(prompt("Adivina el número (entre 1 y 100):"));
  intentos++;
  if (adivinanza < adivinarNumero) {
    alert("Proba con un numero mas alto");
  } else if (adivinanza > adivinarNumero) {
    alert("Proba con un numero mas bajo");
  } else if (adivinanza === adivinarNumero) {
    alert(`¡Felicidades! Adivinaste el número en ${intentos} intentos.`);
  } else {
    alert("Por favor, introduce un número válido.");
  }
}
