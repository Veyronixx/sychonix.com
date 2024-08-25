---
title: Installation Node
layout: '~/layouts/TestnetLayout.astro'
network: Testnet
chain id: symphony-testnet-3
icon: sym
---

- Autoinstall Script

<div class="code-block-wrapper">
  <pre><code>source &lt;(curl -s https://snapshot.sychonix.com/symphony/autoinstall.sh)</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

------

Manual installation

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
rm -rf symphony
git clone https://github.com/Orchestra-Labs/symphony symphony
cd symphony
git checkout v0.3.0
make install</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize the node

<div class="code-block-wrapper">
  <pre><code>symphonyd config chain-id symphony-testnet-3
symphonyd config keyring-backend file
symphonyd init &lt;your_name&gt; --chain-id symphony-testnet-3</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Genesis

<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/symphony/genesis.json &gt; $HOME/.symphonyd/config/genesis.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download addrbook

<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/symphony/addrbook.json &gt; $HOME/.symphonyd/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Seed and Peer

<div class="code-block-wrapper">
  <pre><code>SEEDS="98fcefd53552f5ef2f77a92eda9b5ae22071400e@rpc-symphony-t.sychonix.com:24856"
PEERS="$(curl -sS https://rpc-symphony.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i.bak -e "s/^seeds *=.*/seeds = \"$SEEDS\"/; s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.symphonyd/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Gas Prices

<div class="code-block-wrapper">
  <pre><code>sed -i 's|minimum-gas-prices =.*|minimum-gas-prices = "0.25note"|g' $HOME/.symphonyd/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Prunning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  $HOME/.symphonyd/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Custom Port (Optional)

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%:1317%:26017%; s%:8080%:26080%; s%:9090%:26090%; s%:9091%:26091%; s%:8545%:26045%; s%:8546%:26046%; s%:6065%:26065%" $HOME/.symphonyd/config/app.toml
sed -i -e "s%:26658%:26058%; s%:26657%:26057%; s%:6060%:26060%; s%:26656%:26056%; s%:26660%:26061%" $HOME/.symphonyd/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Service

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/symphonyd.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=symphonyd
After=network-online.target
[Service]
User=$USER
ExecStart=$(which symphonyd) start
Restart=always
RestartSec=3
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Snapshot

<div class="code-block-wrapper">
  <pre><code>curl "https://snapshot.sychonix.com/symphony/symphony-latest.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.symphonyd"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Start

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable symphonyd
sudo systemctl restart symphonyd && sudo journalctl -u symphonyd -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Validator

Heads up to the Cheat Sheets to create validator

<a href="https://sychonix.com/testnet/symphony/cheat" >
  <button style="background-color: green; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 10px; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);" onmouseover="this.style.boxShadow='0 0 0 4px rgba(0,255,0,0.5)'" onmouseout="this.style.boxShadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'">CLI Cheatsheets</button>
</a>
