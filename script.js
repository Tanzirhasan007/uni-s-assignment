// Sample Doctors Data
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

// Login Functionality
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple validation (in a real app, check against a database)
    if (username && password) {
        loginSection.style.display = "none";
        dashboard.style.display = "block";
        loadDoctors();
    } else {
        alert("Please enter username and password.");
    }
});

// Signup Functionality
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    const email = document.getElementById("email").value;

    if (newUsername && newPassword && email) {
        alert("Account created successfully! Please login.");
        signupSection.style.display = "none";
        loginSection.style.display = "flex";
    } else {
        alert("Please fill all fields.");
    }
});

// Logout Functionality
logoutBtn.addEventListener("click", () => {
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

    // Add event listeners to book buttons
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

// Close Modal
closeBtn.addEventListener("click", () => {
    bookingModal.style.display = "none";
});

// Confirm Booking
document.getElementById("appointmentForm").addEventListener("submit", (e) => {
    e.preventDefault();
    bookingModal.style.display = "none";
    confirmationModal.style.display = "flex";
});

// Close Confirmation Modal
okBtn.addEventListener("click", () => {
    confirmationModal.style.display = "none";
});

// Initialize
loadDoctors();