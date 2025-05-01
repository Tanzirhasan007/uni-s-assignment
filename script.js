// Sample Doctors Data (you can load from server later if needed)
const doctors = [
    { id: 1, name: "Dr. Smith", specialty: "Cardiologist", location: "Downtown Clinic", available: true },
    { id: 2, name: "Dr. Johnson", specialty: "Neurologist", location: "City Hospital", available: true },
    { id: 3, name: "Dr. Williams", specialty: "Pediatrician", location: "Children's Clinic", available: true },
    { id: 4, name: "Dr. Brown", specialty: "Dermatologist", location: "Skin Care Center", available: false }
];

// DOM Elements
const loginSection = document.getElementById("loginSection");
const signupSection = document.getElementById("signupSection");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");
const logoutBtn = document.getElementById("logoutBtn");
const doctorList = document.getElementById("doctorList");
const bookingModal = document.getElementById("bookingModal");
const confirmationModal = document.getElementById("confirmationModal");
const closeBtn = document.querySelector(".close-btn");
const okBtn = document.getElementById("okBtn");
const searchBtn = document.getElementById("searchBtn");
const searchDoctor = document.getElementById("searchDoctor");

// Show Signup Form
showSignup.addEventListener("click", (e) => {
    e.preventDefault();
    loginSection.style.display = "none";
    signupSection.style.display = "flex";
});

// Show Login Form
showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    signupSection.style.display = "none";
    loginSection.style.display = "flex";
});

// Login Functionality (PHP)
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        const res = await fetch("login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const result = await res.json();
        if (result.success) {
            localStorage.setItem("user_id", result.user_id);
            localStorage.setItem("username", result.username);
            loginSection.style.display = "none";
            dashboard.style.display = "block";
            loadDoctors();
        } else {
            alert("Login failed: " + result.message);
        }
    } else {
        alert("Please enter username and password.");
    }
});

// Signup Functionality (PHP)
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    const email = document.getElementById("email").value;

    if (newUsername && newPassword && email) {
        const res = await fetch("signup.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: newUsername, password: newPassword, email })
        });
        const result = await res.json();
        if (result.success) {
            alert("Signup successful! Please log in.");
            signupSection.style.display = "none";
            loginSection.style.display = "flex";
        } else {
            alert("Signup failed: " + result.error);
        }
    } else {
        alert("Please fill all fields.");
    }
});

// Logout
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    dashboard.style.display = "none";
    loginSection.style.display = "flex";
});

// Load Doctors List
function loadDoctors(filter = "") {
    doctorList.innerHTML = "";
    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(filter.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(filter.toLowerCase()) ||
        doctor.location.toLowerCase().includes(filter.toLowerCase())
    );

    filteredDoctors.forEach(doctor => {
        const doctorCard = document.createElement("div");
        doctorCard.className = "doctor-card";
        doctorCard.innerHTML = `
            <h3>${doctor.name}</h3>
            <p><strong>Specialty:</strong> ${doctor.specialty}</p>
            <p><strong>Location:</strong> ${doctor.location}</p>
            <p><strong>Availability:</strong> ${doctor.available ? "Available" : "Not Available"}</p>
            <button class="book-btn" data-id="${doctor.id}" ${!doctor.available ? "disabled" : ""}>
                ${doctor.available ? "Book Appointment" : "Not Available"}
            </button>
        `;
        doctorList.appendChild(doctorCard);
    });

    document.querySelectorAll(".book-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.disabled) return;
            bookingModal.style.display = "flex";
        });
    });
}

// Search Doctors
searchBtn.addEventListener("click", () => {
    loadDoctors(searchDoctor.value);
});

// Close Booking Modal
closeBtn.addEventListener("click", () => {
    bookingModal.style.display = "none";
});

// Confirm Appointment (PHP)
document.getElementById("appointmentForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const patient_name = document.getElementById("patientName").value;
    const date = document.getElementById("appointmentDate").value;
    const time = document.getElementById("appointmentTime").value;
    const reason = document.getElementById("reason").value;

    if (!user_id) {
        alert("You must be logged in to book an appointment.");
        return;
    }

    const res = await fetch("book_appointment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, patient_name, date, time, reason })
    });

    const result = await res.json();
    if (result.success) {
        bookingModal.style.display = "none";
        confirmationModal.style.display = "flex";
    } else {
        alert("Booking failed.");
    }
});

// Close Confirmation Modal
okBtn.addEventListener("click", () => {
    confirmationModal.style.display = "none";
});

// Initialize
loadDoctors();
