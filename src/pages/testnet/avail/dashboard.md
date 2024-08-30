
<!-- Overview Section -->
<div class="dashboard-overview p-6 bg-gray-900 rounded-lg mb-2">
  <div class="flex flex-col items-center">
    <img src="/img/avail.png" alt="Logo" class="dashboard-logo mb-2 w-24 h-24 rounded-full" />
    <h2 class="text-xl font-bold text-white mb-1">Avail</h2>
    <p class="text-left text-sm text-gray-300 mb-1">
Avail is a Web3 infrastructure layer that allows modular execution layers to scale and interoperate in a trust minimized way.
    </p>
  </div>
</div>

<!-- Card Container -->
<div class="card-container flex flex-wrap justify-between gap-4 mb-4">
  <!-- Telemetry Card -->
  <a href="https://telemetry.avail.so/#list/0xd3d2f3a3495dc597434a99d7d449ebad6616db45e4e4f178f31cc6fa14378b70" target="_blank" class="card">
    <h3 class="card-title">Telemetry</h3>
    <p class="card-text">Monitor the network status and performance metrics of Avail Network in real-time.</p>
  </a>

  <!-- Chain Explorer Card -->
  <a href="https://explorer.avail.so/#/accounts" target="_blank" class="card">
    <h3 class="card-title">Chain Explorer</h3>
    <p class="card-text">Explore blocks, transactions, and validator information for Avail Network.</p>
  </a>
</div>

<style>
/* Card Container */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem; /* Adjusts the gap between cards */
  margin-bottom: 1rem;
}

/* Card Styles */
.card {
  flex: 1;
  min-width: 250px; /* Ensures a minimum width for each card */
  background-color: #0f172a; /* Background color */
  border: 1px solid #111827; /* Slightly lighter border color */
  padding: 1rem;
  border-radius: 0.5rem; /* Rounded corners */
  text-decoration: none; /* Removes underline from links */
  color: white; /* Text color */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Thicker shadow effect */
  transition: transform 0.2s ease, background-color 0.3s ease; /* Smooth transform and background color transition */
  display: flex;
  flex-direction: column; /* Ensures title and text stack vertically */
  justify-content: center; /* Centers content vertically */
  align-items: flex-start; /* Aligns content to the start */
}

/* Card Hover Effect */
.card:hover {
  background-color: #374151; /* Tailwind color 'bg-gray-700' */
  transform: translateY(-4px); /* Slight upward shift on hover */
}

/* Card Title */
.card-title {
  font-size: 1.125rem; /* Tailwind 'text-lg' */
  font-weight: bold;
  margin-bottom: 0.5rem;
}

/* Card Text */
.card-text {
  font-size: 0.875rem; /* Tailwind 'text-sm' */
  color: #9CA3AF; /* Tailwind color 'text-gray-300' */
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .card-container {
    flex-direction: column; /* Stacks cards vertically on smaller screens */
    gap: 1rem; /* Adjusts the gap between cards for smaller screens */
  }

  .card {
    max-width: 100%; /* Allows cards to take full width on smaller screens */
  }
}
</style>
