---
title: Installation Node
---

- Install Dependencies 

<div class="code-block-wrapper">
  <pre><code>sudo apt update && sudo apt upgrade -y
apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev -y</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install Go

<div class="code-block-wrapper">
  <pre><code>sudo rm -rf /usr/local/go
curl -Ls https://go.dev/dl/go1.21.1.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)
eval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install Binary

<div class="code-block-wrapper">
  <pre><code>cd $HOME
rm -rf prysm
git clone https://github.com/kleomedes/prysm prysm
cd prysm
git checkout v0.1.0-devnet
make install</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize The Node

<div class="code-block-wrapper">
  <pre><code>prysmd init "YourName" --chain-id prysm-devnet-1</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Genesis & Addrbook

<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/testnet/prysm/genesis.json > $HOME/.prysm/config/genesis.json
curl -Ls https://snapshot.sychonix.com/testnet/prysm/addrbook.json > $HOME/.prysm/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Seeds and Peers

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s|^seeds *=.*|seeds = \"9e64aabd8502346fa810857e2ce1f6fb6b8c6292@prysm-testnet.sychonix.com:19756\"|" $HOME/.prysm/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Customize Pruning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.prysm/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.0uprysm\"|" $HOME/.prysm/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.prysm/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.prysm/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Service File

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/prysmd.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=prysm testnet node
After=network-online.target
[Service]
User=$USER
ExecStart=$(which prysmd) start
Restart=always
RestartSec=3
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Current Snapshot

<div class="code-block-wrapper">
  <pre><code>curl "https://snapshot.sychonix.com/testnet/prysm/prysm-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.prysm"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable the Service and Start the Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable prysmd.service
sudo systemctl restart prysmd.service && sudo journalctl -u prysmd.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
