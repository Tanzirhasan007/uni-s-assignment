// Sample doctor data
const doctors = [
    {
        id: 1,
        name: "Dr. Tanzir Hasan",
        specialty: "Cardiology ",
        location: "London",
        hospital: "St. Thomas' Hospital",
        rating: 4.8,
        reviews: 124,
        available: ["Today", "Tomorrow"],
        image: 'doctor1.jpg' ,
        bio: "Consultant cardiologist with 15 years of experience in treating heart conditions."
    },
    {
        id: 2,
        name: "Dr. Sufian",
        specialty: "Neurology with Pazzi",
        location: "Manchester",
        hospital: "Manchester Royal Infirmary",
        rating: 4.9,
        reviews: 98,
        available: ["Tomorrow"],
        image: "doctor2.png",
        bio: "Specialist in neurological disorders with a focus on Parkinson's disease.I will give you free Pizza."
    },
    {
        id: 3,
        name: "Dr. Shohel",
        specialty: "Pediatrican",
        location: "Birmingham",
        hospital: "Birmingham Children's Hospital",
        rating: 4.7,
        reviews: 156,
        available: ["Today", "This Week"],
        image: "doctor3.jpg",
        bio: "Pediatrican dedication to providing compassionate care for Childern's of all ages.."
    },
    {
        id: 4,
        name: "Dr. Monkey d. luffy",
        specialty: "Orthopedics",
        location: "Leeds",
        hospital: "Leeds General Infirmary",
        rating: 4.6,
        reviews: 87,
        available: ["This Week"],
        image: "doctor4.jpg",
        bio: "Orthopedic surgeon specializing in sports injuries and joint replacements."
    },
    {
        id: 5,
        name: "Dr. Naruto Uzumaki",
        specialty: "Dermatology",
        location: "London",
        hospital: "Guy's Hospital",
        rating: 4.9,
        reviews: 112,
        available: ["Today"],
        image: "doctor5.jpg",
        bio: "Dermatologist with expertise in skin cancer detection and cosmetic dermatology."
    },
    {
        id: 6,
        name: "Dr. Nikita",
        specialty: "Cardiology",
        location: "Manchester",
        hospital: "Wythenshawe Hospital",
        rating: 4.5,
        reviews: 76,
        available: ["Tomorrow", "This Week"],
        image: "doctor6.png",
        bio: "Cardiologist specializing in interventional procedures and heart failure management."
    }
];

// DOM elements
const doctorCardsContainer = document.getElementById('doctor-cards-container');
const searchInput = document.getElementById('doctor-search');
const searchBtn = document.getElementById('search-btn');
const specialtyFilter = document.getElementById('specialty-filter');
const locationFilter = document.getElementById('location-filter');
const availabilityFilter = document.getElementById('availability-filter');
const resetFiltersBtn = document.getElementById('reset-filters');
const sortBy = document.getElementById('sort-by');
const resultsCount = document.getElementById('results-count');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageNumbers = document.getElementById('page-numbers');

// Pagination variables
const doctorsPerPage = 4;
let currentPage = 1;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderDoctors(doctors);
    setupEventListeners();
});

function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', filterDoctors);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterDoctors();
    });

    // Filter functionality
    specialtyFilter.addEventListener('change', filterDoctors);
    locationFilter.addEventListener('change', filterDoctors);
    availabilityFilter.addEventListener('change', filterDoctors);
    
    // Reset filters
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    // Sort functionality
    sortBy.addEventListener('change', filterDoctors);
    
    // Pagination
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            filterDoctors();
        }
    });
    
    nextPageBtn.addEventListener('click', () => {
        const filteredDoctors = getFilteredDoctors();
        const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            filterDoctors();
        }
    });
}

function resetFilters() {
    searchInput.value = '';
    specialtyFilter.value = 'all';
    locationFilter.value = 'all';
    availabilityFilter.value = 'all';
    sortBy.value = 'name-asc';
    currentPage = 1;
    filterDoctors();
}

function getFilteredDoctors() {
    const searchTerm = searchInput.value.toLowerCase();
    const specialty = specialtyFilter.value;
    const location = locationFilter.value;
    const availability = availabilityFilter.value;
    
    return doctors.filter(doctor => {
        // Search term filter
        const matchesSearch = 
            doctor.name.toLowerCase().includes(searchTerm) ||
            doctor.specialty.toLowerCase().includes(searchTerm) ||
            doctor.location.toLowerCase().includes(searchTerm) ||
            doctor.hospital.toLowerCase().includes(searchTerm);
        
        // Specialty filter
        const matchesSpecialty = specialty === 'all' || doctor.specialty.toLowerCase() === specialty;
        
        // Location filter
        const matchesLocation = location === 'all' || doctor.location.toLowerCase() === location;
        
        // Availability filter
        let matchesAvailability = true;
        if (availability !== 'all') {
            if (availability === 'today') {
                matchesAvailability = doctor.available.includes('Today');
            } else if (availability === 'tomorrow') {
                matchesAvailability = doctor.available.includes('Tomorrow');
            } else if (availability === 'this-week') {
                matchesAvailability = doctor.available.includes('This Week');
            }
        }
        
        return matchesSearch && matchesSpecialty && matchesLocation && matchesAvailability;
    });
}

function sortDoctors(doctorsToSort) {
    const sortValue = sortBy.value;
    
    return doctorsToSort.sort((a, b) => {
        switch (sortValue) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'rating':
                return b.rating - a.rating;
            case 'availability':
                // Simple availability sorting (could be enhanced)
                if (a.available.includes('Today') && !b.available.includes('Today')) return -1;
                if (!a.available.includes('Today') && b.available.includes('Today')) return 1;
                if (a.available.includes('Tomorrow') && !b.available.includes('Tomorrow')) return -1;
                if (!a.available.includes('Tomorrow') && b.available.includes('Tomorrow')) return 1;
                return 0;
            default:
                return 0;
        }
    });
}

function filterDoctors() {
    const filteredDoctors = getFilteredDoctors();
    const sortedDoctors = sortDoctors(filteredDoctors);
    
    // Update results count
    resultsCount.textContent = `${filteredDoctors.length} ${filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Available`;
    
    // Reset to first page when filters change
    currentPage = 1;
    
    // Paginate results
    const totalPages = Math.ceil(sortedDoctors.length / doctorsPerPage);
    const startIndex = (currentPage - 1) * doctorsPerPage;
    const paginatedDoctors = sortedDoctors.slice(startIndex, startIndex + doctorsPerPage);
    
    // Update pagination controls
    pageNumbers.textContent = `${currentPage} of ${totalPages || 1}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Render doctors
    renderDoctors(paginatedDoctors);
}

function renderDoctors(doctorsToRender) {
    doctorCardsContainer.innerHTML = '';
    
    if (doctorsToRender.length === 0) {
        doctorCardsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search fa-3x"></i>
                <h3>No doctors found matching your criteria</h3>
                <p>Try adjusting your search or filters</p>
                <button id="reset-filters-btn" class="secondary-btn">Reset All Filters</button>
            </div>
        `;
        
        document.getElementById('reset-filters-btn').addEventListener('click', resetFilters);
        return;
    }
    
    doctorsToRender.forEach(doctor => {
        const availabilityBadges = doctor.available.map(avail => 
            `<span class="availability-badge">${avail}</span>`
        ).join(' ');
        
        const stars = Array(Math.floor(doctor.rating)).fill('<i class="fas fa-star"></i>').join('');
        const hasHalfStar = doctor.rating % 1 >= 0.5;
        const starRating = stars + (hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : '');
        
        const card = document.createElement('div');
        card.className = 'doctor-card';
        card.innerHTML = `
            <div class="doctor-image">
                <img src="assets/doctors/${doctor.image}" alt="${doctor.name}">
            </div>
            <div class="doctor-details">
                <h3 class="doctor-name">${doctor.name}</h3>
                <p class="doctor-specialty">${doctor.specialty}</p>
                <p class="doctor-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${doctor.hospital}, ${doctor.location}
                </p>
                <div class="doctor-rating">
                    <div class="stars">${starRating}</div>
                    <span>${doctor.rating} (${doctor.reviews} reviews)</span>
                </div>
                <p class="doctor-availability">
                    <i class="far fa-calendar-alt"></i> Available: ${availabilityBadges}
                </p>
                <p class="doctor-bio">${doctor.bio}</p>
                <button class="book-btn" data-doctor-id="${doctor.id}">
                    <i class="far fa-calendar-check"></i> Book Appointment
                </button>
            </div>
        `;
        
        doctorCardsContainer.appendChild(card);
    });
    
    // Add event listeners to book buttons
    document.querySelectorAll('.book-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const doctorId = e.target.getAttribute('data-doctor-id');
            const doctor = doctors.find(d => d.id == doctorId);
            localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
            window.location.href = 'book-appointment.html';
        });
    });
}