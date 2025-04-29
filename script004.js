// Mapping hospital names to Google Maps URLs
const hospitalLocations = {
    "St Thomas' Hospital": "https://www.google.com/maps?q=St+Thomas'+Hospital+London",
    "University College Hospital": "https://www.google.com/maps?q=University+College+Hospital+London",
    "Royal London Hospital": "https://www.google.com/maps?q=Royal+London+Hospital",
    "Guy's Hospital": "https://www.google.com/maps?q=Guy's+Hospital+London",
    "Chelsea and Westminster Hospital": "https://www.google.com/maps?q=Chelsea+and+Westminster+Hospital",
    "King's College Hospital": "https://www.google.com/maps?q=King's+College+Hospital+London",
    "St George's Hospital": "https://www.google.com/maps?q=St+George's+Hospital+London",
    "Whipps Cross University Hospital": "https://www.google.com/maps?q=Whipps+Cross+University+Hospital+London",
    "Northwick Park Hospital": "https://www.google.com/maps?q=Northwick+Park+Hospital+London",
    "Homerton University Hospital": "https://www.google.com/maps?q=Homerton+University+Hospital+London",
    "Queen Elizabeth Hospital": "https://www.google.com/maps?q=Queen+Elizabeth+Hospital+London",
    "Ealing Hospital": "https://www.google.com/maps?q=Ealing+Hospital+London",
    "Barnet Hospital": "https://www.google.com/maps?q=Barnet+Hospital+London",
    "Newham University Hospital": "https://www.google.com/maps?q=Newham+University+Hospital+London",
    "Royal Free Hospital": "https://www.google.com/maps?q=Royal+Free+Hospital+London"
  };
  
  function showSelection() {
    const select = document.getElementById('hospitalSelect');
    const selectedHospital = select.value;
    const displayDiv = document.getElementById('selectedHospital');
    const mapFrame = document.getElementById('map');
  
    if (selectedHospital) {
      displayDiv.textContent = `You selected: ${selectedHospital}`;
      const mapUrl = hospitalLocations[selectedHospital];
      mapFrame.src = mapUrl + "&output=embed";
    } else {
      displayDiv.textContent = '';
      mapFrame.src = '';
    }
  }
  