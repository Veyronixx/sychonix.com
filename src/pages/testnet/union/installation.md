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
curl -Ls https://go.dev/dl/go1.21.13.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)
eval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install binary 

<div class="code-block-wrapper">
  <pre><code>cd $HOME
curl -L https://snapshot.sychonix.com/testnet/union/uniond.tar.gz | tar -xvzf - -C $HOME
sudo mv uniond /usr/local/bin/</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize The Node

<div class="code-block-wrapper"><!-- Change chain id and port -->
  <pre><code>alias uniond='uniond --home=$HOME/.union/'
uniond init $MONIKER --chain-id union-testnet-9
sed -i -e "s|^node *=.*|node = \"tcp://localhost:13157\"|" $HOME/.union/config/client.toml
sed -i -e "s|^keyring-backend *=.*|keyring-backend = \"os\"|" $HOME/.union/config/client.toml
sed -i -e "s|^chain-id *=.*|chain-id = \"union-testnet-9\"|" $HOME/.union/config/client.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Change chain id and port -->

- Download Genesis & Addrbook

<div class="code-block-wrapper">
  <pre><code>curl -L https://snapshot.sychonix.com/testnet/union/genesis.json > $HOME/.union/config/genesis.json
curl -L https://snapshot.sychonix.com/testnet/union/addrbook.json > $HOME/.union/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Seeds and Peers

<div class="code-block-wrapper">
  <pre><code>SEEDS="d603ec240859a2d67e87118d0faff5abeb82d263@union-testnet.sychonix.com:13156"
PEERS="$(curl -sS https://rpc-union-t.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i -e "s|^seeds *=.*|seeds = '"$SEEDS"'|; s|^persistent_peers *=.*|persistent_peers = '"$PEERS"'|" $HOME/.union/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Update Port Configuration

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%:1317%:13117%; s%:8080%:13180%; s%:9090%:13190%; s%:9091%:13191%; s%:8545%:13145%; s%:8546%:13146%; s%:6065%:13165%" $HOME/.union/config/app.toml
sed -i -e "s%:26658%:13158%; s%:26657%:13157%; s%:6060%:13160%; s%:26656%:13156%; s%:26660%:13161%" $HOME/.union/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Customize Pruning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.union/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer

<div class="code-block-wrapper"><!-- Note: Change gas price and denom -->
  <pre><code>sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0muno\"|" $HOME/.union/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.union/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.union/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Note: Change gas price and denom -->

- Create Service File

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/uniond.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=uniond node service
After=network-online.target
[Service]
User=$USER
ExecStart=$(which uniond) start
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
  <pre><code>curl "https://snapshot.sychonix.com/testnet/union/union-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.union"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable the Service and Start the Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable uniond.service
sudo systemctl restart uniond.service && sudo journalctl -u uniond.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
