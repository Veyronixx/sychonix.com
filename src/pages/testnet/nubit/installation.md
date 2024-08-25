---
layout: '~/layouts/TestnetLayout.astro'
icon: nubit
title: Installation Node
---

- Install dependencies 

<div class="code-block-wrapper">
  <pre><code>sudo apt update && sudo apt upgrade -y
apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev -y</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install go

<div class="code-block-wrapper">
  <pre><code>ver="1.21.1"
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> ~/.bash_profile
source ~/.bash_profile
go version</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install binary

<div class="code-block-wrapper">
  <pre><code>curl -sL1 https://nubit.sh | bash</code></pre>
  <span style="font-size: 15px;">wait until the node is running and then CTRL C to stop.</span>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Service File 

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/nubit.service > /dev/null << EOF
[Unit]
Description=Nubit Light Node
After=network-online.target
[Service]
User=$USER
ExecStart=/bin/bash -c 'curl -sL https://nubit.sh | bash'
Restart=always
RestartSec=3
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable Service

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable nubit</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Start Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl start nubit.service && sudo journalctl -u nubit.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Save Phrase

<div class="code-block-wrapper">
  <pre><code>cd nubit-node
sudo cat mnemonic.txt</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
