const form = document.getElementById('vehicleForm');
const list = document.getElementById('vehicleList');

// Add new vehicle on form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const vehicle = Object.fromEntries(formData.entries());

    try {
        const res = await fetch('/api/vehicles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehicle)
        });

        if (!res.ok) throw new Error(`Failed to add vehicle: ${res.status}`);

        const data = await res.json();
        addVehicleToList(data);
        form.reset();
    } catch (error) {
        alert('Error adding vehicle: ' + error.message);
        console.error(error);
    }
});

// Display one vehicle in the list
function addVehicleToList(vehicle) {
    const item = document.createElement('li');
    item.innerHTML = `
        <strong>${vehicle.vehicleName}</strong> - ₹${vehicle.price}<br>
        <em>${vehicle.brand}</em> | ${vehicle.desc}<br>
        <img src="${vehicle.image}" alt="${vehicle.vehicleName}" width="100" onerror="this.src='https://via.placeholder.com/100';" />
    `;
    list.appendChild(item);
}

// Load and display existing vehicles
async function loadVehicles() {
    try {
        const res = await fetch('/api/vehicles');
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();

        list.innerHTML = '';
        if (!data.length) {
            list.innerHTML = '<li>No vehicles found.</li>';
        } else {
            data.forEach(addVehicleToList);
        }
    } catch (error) {
        list.innerHTML = '<li>Error loading vehicles.</li>';
        console.error(error);
    }
}

loadVehicles();
