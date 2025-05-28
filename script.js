// Importar módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyARM2n0Z_RMw5NZtwPQtPXGkcoS66NxGWM",
  authDomain: "contratalisto-89564.firebaseapp.com",
  projectId: "contratalisto-89564",
  storageBucket: "contratalisto-89564.appspot.com",
  messagingSenderId: "583988141271",
  appId: "1:583988141271:web:2a91412bffdf152aebe492"
};

// Inicializar la app (verifica si ya está inicializada)
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  console.log("Firebase ya inicializado");
}

// Obtener Firestore
const db = getFirestore();

// Función para mostrar usuarios en el div con id="usuarios"
async function mostrarUsuarios() {
  const usuariosRef = collection(db, "usuarios");
  const snapshot = await getDocs(usuariosRef);

  const contenedor = document.getElementById("usuarios");
  contenedor.innerHTML = "<h2>Usuarios registrados:</h2>";

  snapshot.forEach(doc => {
    const datos = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>Nombre:</strong> ${datos.nombre}</p>
      <p><strong>Email:</strong> ${datos.email}</p>
      <hr>
    `;
    contenedor.appendChild(div);
  });
}

// Función de prueba para botones
window.mostrarAlerta = function () {
  alert("Esta función se implementará pronto.");
};

// Ejecutar la función al cargar la página
mostrarUsuarios();