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
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// 🔐 CONFIGURACIÓN FIREBASE
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "contratalisto-89564.firebaseapp.com",
  projectId: "contratalisto-89564",
  storageBucket: "contratalisto-89564.appspot.com",
  messagingSenderId: "583988141271",
  appId: "1:583988141271:web:2a91412bffdf152aebe492"
};

// 🚀 Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 🧠 LÓGICA DEL REGISTRO
document.getElementById("registroForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // ✅ evita recarga de la página

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const descripcion = document.getElementById("descripcion").value;
  const telefono = document.getElementById("telefono").value;
  const ciudad = document.getElementById("ciudad").value;
  const hojavida = document.getElementById("hojavida").files[0];

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // 🗂 Subir hoja de vida a Firebase Storage
    const storageRef = ref(storage, hojas_de_vida/${uid}.pdf);
    await uploadBytes(storageRef, hojavida);
    const hojavidaURL = await getDownloadURL(storageRef);

    // 📄 Guardar datos en Firestore
    await setDoc(doc(db, "usuarios", uid), {
      nombre,
      email,
      descripcion,
      telefono,
      ciudad,
      hojavidaURL,
      tipo_cuenta: "trabajador",
      createdAt: serverTimestamp()
    });

    alert("Registro exitoso. ¡Bienvenido a ContrataListo!");
  } catch (error) {
    console.error("Error al registrar:", error);
    alert("Error: " + error.message);
  }
});