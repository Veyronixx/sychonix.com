---
title: Dashboard
---

<!-- Overview Section -->
<div class="dashboard-overview p-6 bg-gray-900 rounded-lg mb-2"> <!-- Changed mb-6 to mb-2 -->
  <div class="flex flex-col items-center">
    <!-- Update the image source path and add Tailwind classes for resizing and rounding -->
    <img src="/img/kopi.jpg" alt="Logo" class="dashboard-logo mb-2 w-24 h-24 rounded-full" />
    <h2 class="text-xl font-bold text-white mb-1"></h2>
    <p class="text-left text-sm	 text-gray-300 mb-1"> <!-- Changed mb-2 to mb-1 -->
Kopi Money is a decentralized finance (DeFi) protocol combining a Decentralized Exchange (DEX) and a money market. 
    </p>
  </div>
</div>

<!-- Tabs Navigation Section -->
<div class="tabs mt-4 mb-4 overflow-x-auto border-b border-gray-600">
  <ul class="flex w-full space-x-1">
    <li class="shrink-0">
      <a class="tab-link inline-block py-2 px-2 text-base md:text-lg text-blue-500 font-semibold border-b-2 border-blue-500 hover:text-blue-700 transition duration-300 whitespace-nowrap" href="#public-endpoints">Public Endpoints</a>
    </li>
    <li class="shrink-0">
      <a class="tab-link inline-block py-2 px-2 text-base md:text-lg text-blue-500 font-semibold border-b-2 border-blue-500 hover:text-blue-700 transition duration-300 whitespace-nowrap" href="#network-service">Network Service</a>
    </li>
    <li class="shrink-0">
      <a class="tab-link inline-block py-2 px-2 text-base md:text-lg text-blue-500 font-semibold border-b-2 border-blue-500 hover:text-blue-700 transition duration-300 whitespace-nowrap" href="#chain-explorer">Chain Explorer</a>
    </li>
  </ul>
</div>

<!-- Public Endpoints Section -->
<div id="public-endpoints">
  <h3 class="text-lg font-semibold mb-2"></h3> <!-- Added title for Public Endpoints -->

  <label class="block mt-1 mb-1">RPC Endpoints</label> <!-- Added mt-1 mb-1 to adjust spacing -->
  <div class="code-block-wrapper">
    <pre><code>https://rpc-kopi.sychonix.com</code></pre>
    <button class="copy-btn"><i class="fas fa-copy"></i></button>
  </div>

  <label>API Endpoints</label>
  <div class="code-block-wrapper">
    <pre><code>https://api-kopi.sychonix.com</code></pre>
    <button class="copy-btn"><i class="fas fa-copy"></i></button>
  </div>
</div>

<!-- Network Service Section (Previously Peering Service) -->
<div id="network-service" class="hidden">
  <h3 class="text-lg font-semibold mb-2"></h3>
  
  <label class="block mt-1 mb-1">Seeds</label>
  <div class="code-block-wrapper">
    <pre><code>9393f89a72c3f5b27f22a286b4494e3c3409c652@kopi-mainnet.sychonix.com:11656</code></pre>
    <button class="copy-btn"><i class="fas fa-copy"></i></button>
  </div>

  <label class="block mt-1 mb-1">Live Peers</label>
  <div class="code-block-wrapper">
    <pre><code>PEERS="$(curl -sS https://rpc-kopi.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"  
sed -i -e "s|^persistent_peers *=.*|persistent_peers = \"$PEERS\"|" $HOME/.kopid/config/config.toml</code></pre>
    <button class="copy-btn"><i class="fas fa-copy"></i></button>
  </div>

  <label class="block mt-1 mb-1">Genesis File</label>
  <div class="code-block-wrapper">
    <pre><code>curl -L https://snapshot.sychonix.com/mainnet/kopi/genesis.json > $HOME/.kopid/config/genesis.json</code></pre>
    <button class="copy-btn"><i class="fas fa-copy"></i></button>
  </div>

  <label class="block mt-1 mb-1">Addrbook File</label>
  <div class="code-block-wrapper">
    <pre><code>curl -L https://snapshot.sychonix.com/mainnet/kopi/addrbook.json > $HOME/.kopid/config/addrbook.json</code></pre>
    <button class="copy-btn"><i class="fas fa-copy"></i></button>
  </div>
</div>


<!-- Chain Explorer Section -->
<div id="chain-explorer" class="hidden bg-slate-950 p-4 rounded-lg shadow-md">
  <!-- Added clickable link -->
  <p class="text-sm text-gray-300">
    <a href="https://explorer.sychonix.com/kopi-mainnet" target="_blank" 
       class="text-blue-500 underline hover:text-blue-700 hover:shadow-lg">
      https://explorer.sychonix.com/kopi-mainnet
    </a>
  </p>
</div>

<script>
  const tabs = document.querySelectorAll('.tab-link');
  const sections = document.querySelectorAll('#public-endpoints, #network-service, #chain-explorer');

  function activateTab(tab, section) {
    // Remove active classes from all tabs
    tabs.forEach(t => t.classList.remove('text-blue-500', 'border-b-2', 'border-blue-500'));
    
    // Add active class to the clicked tab
    tab.classList.add('text-blue-500', 'border-b-2', 'border-blue-500');

    // Hide all sections
    sections.forEach(sec => sec.classList.add('hidden'));

    // Show the corresponding section
    section.classList.remove('hidden');
  }

  // Set default tab to Public Endpoints on page load
  document.addEventListener('DOMContentLoaded', () => {
    const defaultTab = document.querySelector('a[href="#public-endpoints"]');
    const defaultSection = document.querySelector('#public-endpoints');
    activateTab(defaultTab, defaultSection);
  });

  // Add event listeners for tab clicks
  tabs.forEach(tab => {
    tab.addEventListener('click', function(event) {
      event.preventDefault();
      
      const targetSection = document.querySelector(this.getAttribute('href'));
      activateTab(this, targetSection);
    });
  });
</script>
