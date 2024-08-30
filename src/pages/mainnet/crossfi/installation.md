---
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
  <pre><code>sudo rm -rf /usr/local/go
curl -Ls https://go.dev/dl/go1.21.1.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)
eval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)</code></pre>
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
