"use strict";

/* Interacciones compartidas: alto contraste y ampliación de fotografías. */
document.addEventListener("DOMContentLoaded", () => {
  const CLAVE_CONTRASTE = "vucetich-contraste";
  const botonContraste = document.getElementById("botonContraste");
  const visor = document.getElementById("visorImagen");
  const visorFoto = document.getElementById("visorFoto");
  const visorTitulo = document.getElementById("visorTitulo");
  const cerrarVisorBoton = document.getElementById("cerrarVisor");

  function aplicarContraste(activo) {
    document.body.classList.toggle("contraste-alto", activo);
    botonContraste.setAttribute("aria-pressed", String(activo));
    botonContraste.textContent = activo ? "Contraste normal" : "Alto contraste";
    localStorage.setItem(CLAVE_CONTRASTE, String(activo));
  }

  function abrirVisor(boton) {
    const titulo = boton.dataset.titulo;

    visorFoto.src = boton.dataset.imagen;
    visorFoto.alt = titulo;
    visorFoto.classList.toggle("imagen-rotada", boton.dataset.rotacion === "-90");
    visorFoto.classList.toggle("imagen-rotada-180", boton.dataset.rotacion === "180");
    visorTitulo.textContent = titulo;
    visor.showModal();
  }

  function cerrarVisor() {
    visor.close();
    visorFoto.src = "";
    visorFoto.classList.remove("imagen-rotada", "imagen-rotada-180");
  }

  botonContraste.addEventListener("click", () => {
    aplicarContraste(!document.body.classList.contains("contraste-alto"));
  });

  document.querySelectorAll(".abrir-imagen").forEach((boton) => {
    boton.addEventListener("click", () => abrirVisor(boton));
  });

  if (visor && cerrarVisorBoton) {
    cerrarVisorBoton.addEventListener("click", cerrarVisor);
    visor.addEventListener("click", (evento) => {
      if (evento.target === visor) cerrarVisor();
    });

    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && visor.open) cerrarVisor();
    });
  }

  aplicarContraste(localStorage.getItem(CLAVE_CONTRASTE) === "true");
});
