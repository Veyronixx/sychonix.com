---
title: Dashboard
---

<!-- Overview Section -->
<div class="dashboard-overview p-6 bg-gray-900 rounded-lg mb-2">
  <div class="flex flex-col items-center">
    <img src="/img/ika.png" alt="Logo" class="dashboard-logo mb-2 w-24 h-24 rounded-full" />
    <h2 class="text-xl font-bold text-white mb-1">Ika</h2>
    <p class="text-left text-sm text-gray-300 mb-1">
Ika is the first sub-second MPC network, scaling to 10,000 tps and hundreds of signer nodes, with zero-trust security.
Powering multi-chain coordination on the Sui blockchain.</p>
  </div>
</div>

<style>
/* Card Container */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centers the cards horizontally */
  gap: 1rem; /* Adjusts the gap between cards */
  margin-bottom: 1rem;
  max-width: 1200px; /* Optional: sets a max width to contain the cards */
  margin-left: auto; /* Centers the card container */
  margin-right: auto; /* Centers the card container */
}

/* Card Styles */
.card {
  flex: 1;
  min-width: 350px; /* Further increases the minimum width for each card */
  max-width: 400px; /* Further increases the maximum width for better centering */
  background-color: #0f172a; /* Background color */
  border: 1px solid #111827; /* Slightly lighter border color */
  padding: 0.5rem 1rem; /* Reduces top and bottom padding for less vertical height */
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
