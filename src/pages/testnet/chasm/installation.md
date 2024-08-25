---
title: Installation Node
layout: '~/layouts/TestnetLayout.astro'
network: Chasm Network 
chain id : 
icon: chasm
---

- Update and install packages

<div class="code-block-wrapper">
  <pre><code>sudo apt update && sudo apt upgrade -y</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install Docker

<div class="code-block-wrapper">
  <pre><code>sudo apt install apt-transport-https ca-certificates curl software-properties-common -y && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" && sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Folder

<div class="code-block-wrapper">
  <pre><code>mkdir chasm
cd chasm</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Setup Environment
<div class="code-block-wrapper">
  <pre><code>nano .env</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>PORT=3001
LOGGER_LEVEL=debug

ORCHESTRATOR_URL=https://orchestrator.chasm.net
SCOUT_NAME=NAMASCOUTKAMU
SCOUT_UID=DARIMINTSCOUT
WEBHOOK_API_KEY=your_Webhook_API_Key
WEBHOOK_URL=http://your_VPS_ip:3001/

PROVIDERS=groq
MODEL=gemma2-9b-it
GROQ_API_KEY=your_Groq_API_Key

OPENROUTER_API_KEY=
OPENAI_API_KEY=</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Start and run Node with Docker

<div class="code-block-wrapper">
  <pre><code>docker pull johnsonchasm/chasm-scout
docker run -d --restart=always --env-file ./.env -p 3001:3001 --name scout johnsonchasm/chasm-scout</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Check if your node is running successfully

<div class="code-block-wrapper">
  <pre><code>curl localhost:3001</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Check your Scouts [Here](https://scout.chasm.net/dashboard)
