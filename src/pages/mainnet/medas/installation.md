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

<div class="code-block-wrapper">
  <pre><code>cd $HOME
curl -L https://snapshot.sychonix.com/mainnet/medas/medasdigitald.tar.gz | tar -xvzf - -C $HOME
sudo mv medasdigitald /usr/local/bin/</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download CosmWasm Library

<div class="code-block-wrapper">
  <pre><code>sudo wget -P /usr/lib https://github.com/CosmWasm/wasmvm/releases/download/v2.1.2/libwasmvm.x86_64.so</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize The Node

<div class="code-block-wrapper"><!-- Change chain id and port -->
  <pre><code>medasdigitald init $MONIKER --chain-id medasdigital-2
sed -i -e "s|^node *=.*|node = \"tcp://localhost:12857\"|" $HOME/.medasdigital/config/client.toml
sed -i -e "s|^keyring-backend *=.*|keyring-backend = \"os\"|" $HOME/.medasdigital/config/client.toml
sed -i -e "s|^chain-id *=.*|chain-id = \"medasdigital-2\"|" $HOME/.medasdigital/config/client.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Change chain id and port -->

- Download Genesis & Addrbook

<div class="code-block-wrapper">
  <pre><code>curl -L https://snapshot.sychonix.com/mainnet/medas/genesis.json > $HOME/.medasdigital/config/genesis.json
curl -L https://snapshot.sychonix.com/mainnet/medas/addrbook.json > $HOME/.medasdigital/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Seeds and Peers

<div class="code-block-wrapper">
  <pre><code>SEEDS="c8f33bf69e79389c832a9d0f5c5df2737a812cd9@medas-mainnet.sychonix.com:12856"
PEERS="$(curl -sS https://rpc-medas.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i -e "s|^seeds *=.*|seeds = '"$SEEDS"'|; s|^persistent_peers *=.*|persistent_peers = '"$PEERS"'|" $HOME/.medasdigital/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Update Port Configuration

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%:1317%:12817%; s%:8080%:12880%; s%:9090%:12890%; s%:9091%:12891%; s%:8545%:12845%; s%:8546%:12846%; s%:6065%:12865%" $HOME/.medasdigital/config/app.toml
sed -i -e "s%:26658%:12858%; s%:26657%:12857%; s%:6060%:12860%; s%:26656%:12856%; s%:26660%:12861%" $HOME/.medasdigital/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Customize Pruning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.medasdigital/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer

<div class="code-block-wrapper"><!-- Note: Change gas price and denom -->
  <pre><code>sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.025umedas\"|" $HOME/.medasdigital/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.medasdigital/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.medasdigital/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Note: Change gas price and denom -->

- Create Service File

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/medasdigitald.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=medasdigitald node service
After=network-online.target
[Service]
User=$USER
ExecStart=$(which medasdigitald) start
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
  <pre><code>curl "https://snapshot.sychonix.com/mainnet/medas/medas-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.medasdigital"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable the Service and Start the Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable medasdigitald.service
sudo systemctl restart medasdigitald.service && sudo journalctl -u medasdigitald.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Validator

<div class="code-block-wrapper">
  <pre><code>medasdigitald tendermint show-validator</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create validator.json file
<div class="code-block-wrapper">
  <pre><code>sudo nano $HOME/.medasdigital/validator.json
{
  "pubkey": {"#pubkey"},
  "amount": "", 
  "moniker": "", 
  "identity": "",
  "website": "",
  "security": "", 
  "details": "", 
  "commission-rate": "0.05",
  "commission-max-rate": "0.2",
  "commission-max-change-rate": "0.05",
  "min-self-delegation": "1"
}</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>medasdigitald tx staking create-validator $HOME/.medasdigital/validator.json \
--from wallet \
--chain-id medasdigital-2</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

