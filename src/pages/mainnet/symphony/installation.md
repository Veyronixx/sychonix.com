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
  <pre><code>VER="1.21.6"
sudo rm -rf /usr/local/go
curl -Ls https://go.dev/dl/go$VER.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile
go version</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install Binary

<div class="code-block-wrapper">
  <pre><code>cd $HOME
git clone https://github.com/Orchestra-Labs/symphony
cd symphony
git checkout v1.0.0
make install</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize The Node

<div class="code-block-wrapper"><!-- Change chain id and port -->
  <pre><code>symphonyd init $MONIKER --chain-id symphony-1
sed -i -e "s|^keyring-backend *=.*|keyring-backend = \"os\"|" $HOME/.symphonyd/config/client.toml
sed -i -e "s|^chain-id *=.*|chain-id = \"symphony-1\"|" $HOME/.symphonyd/config/client.toml
sed -i -e "s|^node *=.*|node = \"tcp://localhost:12057\"|" $HOME/.symphonyd/config/client.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Change chain id and port -->

- Download Genesis & Addrbook

<div class="code-block-wrapper">
  <pre><code>curl -L https://snapshot.sychonix.com/mainnet/symphony/genesis.json > $HOME/.symphonyd/config/genesis.json
curl -L https://snapshot.sychonix.com/mainnet/symphony/addrbook.json > $HOME/.symphonyd/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Seeds and Peers

<div class="code-block-wrapper">
  <pre><code>SEEDS="df05ff81c798868838207ee4843c7ed60280e147@symphony-mainnet.sychonix.com:12056"
PEERS="$(curl -sS https://rpc-symphony.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i -e "s|^seeds *=.*|seeds = '"$SEEDS"'|; s|^persistent_peers *=.*|persistent_peers = '"$PEERS"'|" $HOME/.symphonyd/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Update Port Configuration

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%:1317%:12017%; s%:8080%:12080%; s%:9090%:12090%; s%:9091%:12091%; s%:8545%:12045%; s%:8546%:12046%; s%:6065%:12065%" $HOME/.symphonyd/config/app.toml
sed -i -e "s%:26658%:12058%; s%:26657%:12057%; s%:6060%:12060%; s%:26656%:12056%; s%:26660%:12061%" $HOME/.symphonyd/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Customize Pruning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.symphonyd/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer

<div class="code-block-wrapper"><!-- Note: Change gas price and denom -->
  <pre><code>sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.025note\"|" $HOME/.symphonyd/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.symphonyd/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.symphonyd/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Note: Change gas price and denom -->

- Create Service File

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/symphonyd.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=symphony node service
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

- Download Current Snapshot

<div class="code-block-wrapper">
  <pre><code>curl "https://snapshot.sychonix.com/mainnet/symphony/symphony-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.symphonyd"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable the Service and Start the Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable symphonyd.service
sudo systemctl restart symphonyd.service && sudo journalctl -u symphonyd.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Validator

<div class="code-block-wrapper">
  <pre><code>symphonyd tendermint show-validator</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>sudo nano $HOME/.symphonyd/validator.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create validator.json file
<div class="code-block-wrapper">
  <pre><code>
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
  <pre><code>symphonyd tx staking create-validator $HOME/.symphonyd/validator.json \
--from=wallet \
--chain-id=symphony-1 \
--gas-adjustment 1.5 \
--gas-prices 0.025note \
--gas auto</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

