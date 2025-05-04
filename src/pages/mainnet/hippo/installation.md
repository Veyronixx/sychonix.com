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
git clone https://github.com/hippocrat-dao/hippo-protocol hippo
cd hippo
git checkout main
make install</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize The Node

<div class="code-block-wrapper"><!-- Change chain id and port -->
  <pre><code>hippod init $MONIKER --chain-id hippo-protocol-1
sed -i -e "s|^node *=.*|node = \"tcp://localhost:12557\"|" $HOME/.hippo/config/client.toml
sed -i -e "s|^keyring-backend *=.*|keyring-backend = \"os\"|" $HOME/.hippo/config/client.toml
sed -i -e "s|^chain-id *=.*|chain-id = \"hippo-protocol-1\"|" $HOME/.hippo/config/client.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Change chain id and port -->

- Download Genesis & Addrbook

<div class="code-block-wrapper">
  <pre><code>curl -L https://snapshot.sychonix.com/mainnet/hippo/genesis.json > $HOME/.hippo/config/genesis.json
curl -L https://snapshot.sychonix.com/mainnet/hippo/addrbook.json > $HOME/.hippo/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Seeds and Peers

<div class="code-block-wrapper">
  <pre><code>SEEDS="f94b1ad39835a9ce9fe9f6a83ca528d9be6ba276@hippo-mainnet.sychonix.com:12556"
PEERS="$(curl -sS https://rpc-hippo.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i -e "s|^seeds *=.*|seeds = '"$SEEDS"'|; s|^persistent_peers *=.*|persistent_peers = '"$PEERS"'|" $HOME/.hippo/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Update Port Configuration

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%:1317%:12517%; s%:8080%:12580%; s%:9090%:12590%; s%:9091%:12591%; s%:8545%:12545%; s%:8546%:12546%; s%:6065%:12565%" $HOME/.hippo/config/app.toml
sed -i -e "s%:26658%:12558%; s%:26657%:12557%; s%:6060%:12560%; s%:26656%:12556%; s%:26660%:12561%" $HOME/.hippo/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Customize Pruning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.hippo/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer

<div class="code-block-wrapper"><!-- Note: Change gas price and denom -->
  <pre><code>sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.001ahp\"|" $HOME/.hippo/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.hippo/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.hippo/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Note: Change gas price and denom -->

- Create Service File

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/hippod.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=hippod node service
After=network-online.target
[Service]
User=$USER
ExecStart=$(which hippod) start
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
  <pre><code>curl "https://snapshot.sychonix.com/mainnet/hippo/hippo-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.hippo"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable the Service and Start the Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable hippod.service
sudo systemctl restart hippod.service && sudo journalctl -u hippod.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
