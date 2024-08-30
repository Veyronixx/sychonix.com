---
title: Dashboard
---

<!-- Overview Section -->
<div class="dashboard-overview p-6 bg-gray-900 rounded-lg mb-2">
  <div class="flex flex-col items-center">
    <img src="/img/tangle.png" alt="Logo" class="dashboard-logo mb-2 w-24 h-24 rounded-full" />
    <h2 class="text-xl font-bold text-white mb-1">Tangle Network</h2>
    <p class="text-left text-sm text-gray-300 mb-1">
      Tangle Network is a decentralized blockchain platform offering secure infrastructure services. It allows developers to build modular services, earn rewards for contributing, operate validators, and maximize staked asset utilization through an innovative restaking mechanism.
    </p>
  </div>
</div>

<!-- Card Container -->
<div class="card-container flex flex-wrap justify-between gap-4 mb-4">
  <!-- Telemetry Card -->
  <a href="https://telemetry.polkadot.io/#/0x44f68476df71ebf765b630bf08dc1e0fedb2bf614a1aa0563b3f74f20e47b3e0" target="_blank" class="card">
    <h3 class="card-title">Telemetry</h3>
    <p class="card-text">Monitor the network status and performance metrics of Tangle Network in real-time.</p>
  </a>

  <!-- Chain Explorer Card -->
  <a href="https://polkadot.js.org/apps/?rpc=wss://rpc.tangle.tools#/staking" target="_blank" class="card">
    <h3 class="card-title">Chain Explorer</h3>
    <p class="card-text">Explore blocks, transactions, and validator information for Tangle Network.</p>
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
