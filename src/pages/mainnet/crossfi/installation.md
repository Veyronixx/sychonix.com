---
title: Installation Node
layout: '~/layouts/TestnetLayout.astro'
network: Mainnet
icon: crossfi
chain: crossfi-evm-mainnet-1
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
  <pre><code>cd $HOME
wget https://github.com/crossfichain/crossfi-node/releases/download/v0.1.1/mineplex-2-node._v0.1.1_linux_amd64.tar.gz && tar -xf mineplex-2-node._v0.1.1_linux_amd64.tar.gz
tar -xvf mineplex-2-node._v0.1.1_linux_amd64.tar.gz
chmod +x $HOME/mineplex-chaind
mv $HOME/mineplex-chaind $HOME/go/bin/crossfid
rm mineplex-2-node._v0.1.1_linux_amd64.tar.gz</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize the node

<div class="code-block-wrapper">
  <pre><code>crossfid init "your_node_name" --chain-id crossfi-evm-mainnet-1
crossfid config chain-id crossfi-evm-mainnet-1</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Genesis

<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/crossfi/genesis.json > $HOME/.mineplex-chain/config/genesis.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Addrbook 

<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/crossfi/addrbook.json > $HOME/.mineplex-chain/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Seed & Gas

<div class="code-block-wrapper">
  <pre><code>sed -i -e 's|^seeds *=.*|seeds = "693d9fe729d41ade244717176ab1415b2c06cf86@crossfi-mainnet-seed.itrocket.net:48656"|' $HOME/.mineplex-chain/config/config.toml
sed -i -e 's|^minimum-gas-prices *=.*|minimum-gas-prices = "5000000000mpx"|' $HOME/.mineplex-chain/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Prunning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.mineplex-chain/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Indexer

<div class="code-block-wrapper">
  <pre><code>indexer="null" &&
sed -i -e "s/^indexer *=.*/indexer = \"$indexer\"/" $HOME/.empe-chain/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Service

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/crossfid.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=Crossfi node
After=network-online.target
[Service]
User=$USER
WorkingDirectory=$HOME/.mineplex-chain
ExecStart=$(which crossfid) start --home $HOME/.mineplex-chain
Restart=always
RestartSec=3
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Snapshot

<div class="code-block-wrapper">
  <pre><code>curl "https://snapshot.sychonix.com/crossfi/crossfi-latest.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.mineplex-chain"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Start

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable crossfid.service
sudo systemctl restart crossfid.service && sudo journalctl -u crossfid.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Validator

Heads up to the Cheat Sheets to create validator

<a href="https://service.sychonix.com/mainnet/crossfi/cheat" >
  <button style="background-color: green; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 10px; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);" onmouseover="this.style.boxShadow='0 0 0 4px rgba(0,255,0,0.5)'" onmouseout="this.style.boxShadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'">CLI Cheatsheets</button>
</a>
