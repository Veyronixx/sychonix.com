---
title: Installation Node
---

- Install Dependencies 

<div class="code-block-wrapper">
  <pre><code>sudo apt update && sudo apt upgrade -y
sudo apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev aria2 -y</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install Go

<div class="code-block-wrapper">
  <pre><code>sudo rm -rf /usr/local/go
curl -Ls https://go.dev/dl/go1.23.2.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)
eval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install Binary

<div class="code-block-wrapper">
  <pre><code>cd $HOME
curl -L https://snapshot.sychonix.com/mainnet/dhealth/dhealthd.tar.gz | tar -xvzf - -C $HOME
sudo mv dhealthd /usr/local/bin/</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download CosmWasm Library

<div class="code-block-wrapper">
  <pre><code>sudo wget -P /usr/lib https://github.com/CosmWasm/wasmvm/releases/download/v1.3.1/libwasmvm.x86_64.so</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize The Node

<div class="code-block-wrapper"><!-- Change chain id and port -->
  <pre><code>dhealthd config chain-id dhealth
dhealthd init $MONIKER --chain-id dhealth
sed -i -e "s|^node *=.*|node = \"tcp://localhost:12457\"|" $HOME/.dhealth/config/client.toml
sed -i -e "s|^keyring-backend *=.*|keyring-backend = \"os\"|" $HOME/.dhealth/config/client.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Change chain id and port -->

- Download Genesis & Addrbook

<div class="code-block-wrapper">
  <pre><code>curl -L https://snapshot.sychonix.com/mainnet/dhealth/genesis.json > $HOME/.dhealth/config/genesis.json
curl -L https://snapshot.sychonix.com/mainnet/dhealth/addrbook.json > $HOME/.dhealth/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Seeds and Peers

<div class="code-block-wrapper">
  <pre><code>SEEDS="89661b92afd14d7672c6a37547cab8c746dc58c6@dhealth-mainnet.sychonix.com:12456"
PEERS="$(curl -sS https://rpc-dhealth.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i -e "s|^seeds *=.*|seeds = '"$SEEDS"'|; s|^persistent_peers *=.*|persistent_peers = '"$PEERS"'|" $HOME/.dhealth/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Update Port Configuration

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%:1317%:12417%; s%:8080%:12480%; s%:9090%:12490%; s%:9091%:12491%; s%:8545%:12445%; s%:8546%:12446%; s%:6065%:12465%" $HOME/.dhealth/config/app.toml
sed -i -e "s%:26658%:12458%; s%:26657%:12457%; s%:6060%:12460%; s%:26656%:12456%; s%:26660%:12461%" $HOME/.dhealth/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Customize Pruning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.dhealth/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer

<div class="code-block-wrapper"><!-- Note: Change gas price and denom -->
  <pre><code>sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"1udhp\"|" $HOME/.dhealth/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.dhealth/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.dhealth/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Note: Change gas price and denom -->

- Create Service File

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/dhealthd.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=dhealth mainnet node
After=network-online.target
[Service]
User=$USER
ExecStart=$(which dhealthd) start
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
  <pre><code>curl "https://snapshot.sychonix.com/mainnet/dhealth/dhealth-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.dhealth"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable the Service and Start the Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable dhealthd.service
sudo systemctl restart dhealthd.service && sudo journalctl -u dhealthd.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
