import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const pendingList = document.getElementById("pendingList");

const totalUsers = document.getElementById("totalUsers");
const totalAgents = document.getElementById("totalAgents");
const pendingAgents = document.getElementById("pendingAgents");

/* 🔐 PROTECT ADMIN PAGE */

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "auth.html";
    return;
  }

  const userDoc = await getDoc(doc(db, "users", user.uid));

  const data = userDoc.data();

  /* 🚫 BLOCK NON-ADMINS */

  if (data.role !== "admin") {
    alert("Access denied");
    window.location.href = "index.html";
    return;
  }

  loadDashboard();
});

/* 📊 LOAD DASHBOARD */

async function loadDashboard() {

  const snapshot = await getDocs(collection(db, "users"));

  let users = [];

  snapshot.forEach(docItem => {
    users.push({
      id: docItem.id,
      ...docItem.data()
    });
  });

  totalUsers.innerText = users.length;

  totalAgents.innerText =
    users.filter(u => u.role === "agent").length;

  pendingAgents.innerText =
    users.filter(u => u.role === "pending-agent").length;

  renderPending(users);
}

/* 🧑‍⚖️ RENDER PENDING */

function renderPending(users) {

  const pending = users.filter(
    u => u.role === "pending-agent"
  );

  pendingList.innerHTML = "";

  if (!pending.length) {
    pendingList.innerHTML =
      "<p>No pending applications</p>";
    return;
  }

  pending.forEach(user => {

    const card = document.createElement("div");

    card.className = "admin-user-card";

    card.innerHTML = `
      <h3>${user.businessName || "No Business Name"}</h3>

      <p><strong>Name:</strong> ${user.name}</p>

      <p><strong>Email:</strong> ${user.email}</p>

      <p><strong>Phone:</strong> ${user.phone || "-"}</p>

      <p><strong>CAC:</strong> ${user.cac || "-"}</p>

      <button
        class="approve-btn"
        onclick="approveAgent('${user.id}')"
      >
        Approve
      </button>

      <button
        class="reject-btn"
        onclick="rejectAgent('${user.id}')"
      >
        Reject
      </button>
    `;

    pendingList.appendChild(card);
  });
}

/* ✅ APPROVE */

window.approveAgent = async (id) => {

  await updateDoc(doc(db, "users", id), {
    role: "agent",
    verificationStatus: "approved"
  });

  alert("Agent approved");

  location.reload();
};

/* ❌ REJECT */

window.rejectAgent = async (id) => {

  await updateDoc(doc(db, "users", id), {
    role: "buyer",
    verificationStatus: "rejected"
  });

  alert("Application rejected");

  location.reload();
};