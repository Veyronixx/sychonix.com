---
title: Installation Node

network: Testnet
chain id: fiamma-testnet-1
icon: fiamma
---

- Autoinstall Script
<div class="code-block-wrapper">
  <pre><code>source &lt;(curl -s https://snapshot.sychonix.com/fiamma/autoinstall.sh)</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

------

<p style="font-weight: bold; font-size: 1.2rem; margin-top: 1rem; margin-bottom: 1rem;">Manual Installation</p>

- Install Dependencies
<div class="code-block-wrapper">
  <pre><code>sudo apt update && sudo apt upgrade -y 
sudo apt install -y git gcc make unzip jq</code></pre>
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
git clone https://github.com/fiamma-chain/fiamma
cd fiamma
git checkout v0.1.3
make install</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize the node
<div class="code-block-wrapper">
  <pre><code>fiammad config chain-id fiamma-testnet-1
fiammad config keyring-backend file
fiammad init &lt;your_name&gt; --chain-id fiamma-testnet-1</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Genesis
<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/fiamma/genesis.json > $HOME/.fiamma/config/genesis.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download addrbook
<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/fiamma/addrbook.json > $HOME/.fiamma/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Seed and Peer
<div class="code-block-wrapper">
  <pre><code>PEERS="$(curl -sS https://rpc-fiamma-t.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.fiamma/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Gas Prices
<div class="code-block-wrapper">
  <pre><code>sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.00001ufia\"|" $HOME/.fiamma/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Pruning
<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  $HOME/.fiamma/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Custom Port (Optional)
<div class="code-block-wrapper">
  <pre><code>PORT=21
fiammad config node tcp://localhost:${PORT}657
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:${PORT}658\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:${PORT}657\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:${PORT}060\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:${PORT}656\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":${PORT}660\"%" $HOME/.fiamma/config/config.toml
sed -i -e "s%^address = \"tcp://localhost:1317\"%address = \"tcp://localhost:${PORT}317\"%; s%^address = \":8080\"%address = \":${PORT}080\"%; s%^address = \"localhost:9090\"%address = \"localhost:${PORT}090\"%; s%^address = \"localhost:9091\"%address = \"localhost:${PORT}091\"%; s%^address = \"0.0.0.0:8545\"%address = \"0.0.0.0:${PORT}545\"%; s%^ws-address = \"0.0.0.0:8546\"%ws-address = \"0.0.0.0:${PORT}546\"%" $HOME/.fiamma/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Service
<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/fiammad.service > /dev/null &lt;&lt;EOF
[Unit]
Description=Fiamma node
After=network-online.target
[Service]
User=$USER
WorkingDirectory=$HOME/.fiamma
ExecStart=$(which fiammad) start --home $HOME/.fiamma
Restart=on-failure
RestartSec=5
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Snapshot
<div class="code-block-wrapper">
  <pre><code>curl "https://snapshot.sychonix.com/fiamma/fiamma-latest.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.fiamma"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Start
<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable fiammad
sudo systemctl restart fiammad && sudo journalctl -u fiammad -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Validator

Heads up to the Cheat Sheets to create validator

<a href="https://sychonix.com/testnet/fiamma/cheat" >
  <button style="background-color: green; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 10px; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);" onmouseover="this.style.boxShadow='0 0 0 4px rgba(0,255,0,0.5)'" onmouseout="this.style.boxShadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'">CLI Cheatsheets</button>
</a>
