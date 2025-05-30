import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// CONFIGURACIÓN FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyARM2n0Z_RMw5N2twPQTpXGKcoS66NxGWM",
  authDomain: "contratalisto-89564.firebaseapp.com",
  projectId: "contratalisto-89564",
  storageBucket: "contratalisto-89564.appspot.com",
  messagingSenderId: "583988141271",
  appId: "1:583988141271:web:2a91412bffdf152aebe492"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("registroForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmarPassword = document.getElementById("confirmarPassword").value;
  const descripcion = document.getElementById("descripcion").value;
  const telefono = document.getElementById("telefono").value;
  const ciudad = document.getElementById("ciudad").value;

  if (password !== confirmarPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "usuarios", uid), {
      nombre,
      email,
      descripcion,
      telefono,
      ciudad,
      tipo_cuenta: "trabajador",
      createdAt: serverTimestamp()
    });

    alert("Registro exitoso. ¡Bienvenido a ContrataListo!");
    window.location.href = "index.html"; // Redirige si quieres
  } catch (error) {
    console.error("Error al registrar:", error);
    alert("Error: " + error.message);
  }
});