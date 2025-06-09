// ---------------- Profile Page Logic ----------------
document.addEventListener('DOMContentLoaded', () => {
  const welcomeEl = document.getElementById("welcome");
  const petDetailsEl = document.getElementById("petDetails");
  const uploadSection = document.getElementById("uploadSection");

  if (welcomeEl && petDetailsEl) {
    fetch('/user/profile/data')
      .then(res => res.json())
      .then(data => {
        const user = data.user;
        welcomeEl.innerText = `Welcome back, ${user.name}!`;

        if (user.adoptedPet) {
          const pet = user.adoptedPet;
          const vaccinations = pet.vaccinations.map(v => `
            <li>${v.vaccineName} - ${new Date(v.date).toLocaleDateString()}</li>
          `).join('');

          petDetailsEl.innerHTML = `
            <h2>Adopted Pet Details</h2>
            <p><strong>Name:</strong> ${pet.name}</p>
            <p><strong>Breed:</strong> ${pet.breed}</p>
            <p><strong>Age:</strong> ${pet.age}</p>
            <p><strong>Description:</strong> ${pet.description}</p>
            <p><strong>Vaccinations:</strong></p>
            <ul>${vaccinations}</ul>
            <p><strong>Pet Image:</strong></p>
            <img src="${pet.image}" alt="${pet.name}" style="max-width: 200px;" />
          `;

          if (user.media && user.media.length > 0) {
            petDetailsEl.innerHTML += `<h3>Uploaded Media:</h3>`;
            user.media.forEach(mediaUrl => {
              const ext = mediaUrl.split('.').pop().toLowerCase();
              if (["mp4", "webm"].includes(ext)) {
                petDetailsEl.innerHTML += `<video src="${mediaUrl}" controls width="250"></video>`;
              } else {
                petDetailsEl.innerHTML += `<img src="${mediaUrl}" style="max-width: 150px; margin: 5px;" />`;
              }
            });
          }

          if (uploadSection) uploadSection.style.display = "block";
        } else {
          petDetailsEl.innerHTML = `<p>You haven't adopted any pet yet.</p>`;
        }
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        petDetailsEl.innerHTML = `<p>Error loading profile data.</p>`;
      });
  }
});

// ---------------- Upload Handler ----------------
function upload() {
  const fileInput = document.getElementById("media");
  if (!fileInput || !fileInput.files.length) {
    alert("Please select a file to upload.");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  fetch('/user/upload', {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Upload successful!");
        location.reload();
      } else {
        alert("Upload failed.");
      }
    })
    .catch(() => alert("Upload error occurred."));
}

// ---------------- Search Redirect ----------------
function searchPets() {
  const searchInput = document.getElementById("searchInput");
  const query = searchInput.value.trim();
  if (query) {
    window.location.href = `/pets.html?breed=${encodeURIComponent(query)}`;
  }
}

// ---------------- Adoption Form Submission ----------------
document.getElementById("adoptForm")?.addEventListener("submit", function(event) {
  event.preventDefault();

  const form = new FormData(this);
  const petId = form.get("petId");
  const userId = form.get("userId");

  fetch("/adopt", {
    method: "POST",
    body: JSON.stringify({
      petId,
      userId,
      userDetails: {
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone")
      }
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("Adoption successful! A confirmation email has been sent.");
      window.location.href = "/profile";
    } else {
      alert("There was an issue with your adoption request. Please try again.");
    }
  })
  .catch(err => {
    console.error("Error during adoption:", err);
    alert("An error occurred during the adoption process.");
  });
});

// ---------------- 🐾 Paw Navigation Animation ----------------
// ---------------- Paw Animation + Sound ----------------
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    // Prevent default just to see the effect clearly (optional)
    // e.preventDefault();

    // 🐾 Create paw image
    const paw = document.createElement('img');
    paw.src = '/images/paw.png';
    paw.className = 'paw-animation';
    paw.style.position = 'fixed';
    paw.style.left = `${e.clientX}px`;
    paw.style.top = `${e.clientY}px`;
    paw.style.width = '40px';
    paw.style.zIndex = 9999;
    paw.style.animation = 'bounce 1s ease-out';

    document.body.appendChild(paw);
    setTimeout(() => document.body.removeChild(paw), 1000);

    // 🔊 Play pop sound
    const audio = new Audio('/sounds/pop.mp3');
    audio.play().catch(err => {
      console.error("Audio error:", err);
    });
  });
});
