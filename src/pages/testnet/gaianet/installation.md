---
title: Installation Node
layout: '~/layouts/TestnetLayout.astro'
network: Testnet
icon: gaianet
---

- Install GaiaNet node
<div class="code-block-wrapper">
  <pre><code>curl -sSfL 'https://github.com/GaiaNet-AI/gaianet-node/releases/latest/download/install.sh' | bash
source ~/.bashrc</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Init with the qwen-1.5-0.5b-chat model
<div class="code-block-wrapper">
  <pre><code>gaianet init --config https://raw.githubusercontent.com/GaiaNet-AI/node-configs/main/qwen-1.5-0.5b-chat/config.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Start the node
<div class="code-block-wrapper">
  <pre><code>gaianet start</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

---

Auto chat script with Bot

- Install Binary
<div class="code-block-wrapper">
  <pre><code>git clone https://github.com/iyogz/gaian 
cd gaian</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Change your NodeIdGaia with your gaianet node id
<div class="code-block-wrapper">
  <pre><code>nano gaian.js</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Start The script
<div class="code-block-wrapper">
  <pre><code>screen -Rd gaianbot
npm i
node gaian.js</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
