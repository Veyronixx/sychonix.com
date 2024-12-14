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
curl -L https://snapshot.sychonix.com/testnet/pokt/poktrolld.tar.gz | tar -xvzf - -C $HOME
sudo mv poktrolld /usr/local/bin/</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize The Node

<div class="code-block-wrapper"><!-- Change chain id and port -->
  <pre><code>poktrolld init $MONIKER --chain-id pocket-beta
sed -i -e "s|^node *=.*|node = \"tcp://localhost:12757\"|" $HOME/.poktroll/config/client.toml
sed -i -e "s|^keyring-backend *=.*|keyring-backend = \"os\"|" $HOME/.poktroll/config/client.toml
sed -i -e "s|^chain-id *=.*|chain-id = \"pocket-beta\"|" $HOME/.poktroll/config/client.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Change chain id and port -->

- Download Genesis & Addrbook

<div class="code-block-wrapper">
  <pre><code>curl -L https://snapshot.sychonix.com/testnet/pokt/genesis.json > $HOME/.poktroll/config/genesis.json
curl -L https://snapshot.sychonix.com/testnet/pokt/addrbook.json > $HOME/.poktroll/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Seeds and Peers

<div class="code-block-wrapper">
  <pre><code>SEEDS="b1a005f718ea1e9453c98513f8fbb49298eadf56@pokt-testnet.sychonix.com:12756"
PEERS="$(curl -sS https://rpc-pokt-t.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i -e "s|^seeds *=.*|seeds = '"$SEEDS"'|; s|^persistent_peers *=.*|persistent_peers = '"$PEERS"'|" $HOME/.poktroll/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Update Port Configuration

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%:1317%:12717%; s%:8080%:12780%; s%:9090%:12790%; s%:9091%:12791%; s%:8545%:12745%; s%:8546%:12746%; s%:6065%:12765%" $HOME/.poktroll/config/app.toml
sed -i -e "s%:26658%:12758%; s%:26657%:12757%; s%:6060%:12760%; s%:26656%:12756%; s%:26660%:12761%" $HOME/.poktroll/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Customize Pruning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.poktroll/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer

<div class="code-block-wrapper"><!-- Note: Change gas price and denom -->
  <pre><code>sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"1upokt\"|" $HOME/.poktroll/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.poktroll/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.poktroll/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Note: Change gas price and denom -->

- Create Service File

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/poktrolld.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=pokt node service
After=network-online.target
[Service]
User=$USER
ExecStart=$(which poktrolld) start
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
  <pre><code>curl "https://snapshot.sychonix.com/testnet/pokt/pokt-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.poktroll"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable the Service and Start the Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable poktrolld.service
sudo systemctl restart poktrolld.service && sudo journalctl -u poktrolld.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Validator

<div class="code-block-wrapper">
  <pre><code>poktrolld tendermint show-validator</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create validator.json file
<div class="code-block-wrapper">
  <pre><code>sudo nano $HOME/.poktroll/validator.json
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
  <pre><code>poktrolld tx staking create-validator $HOME/.poktroll/validator.json \
--from wallet \
--chain-id pocket-beta</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
