---
title: Installation Node
---

- Install Dependencies 

<div class="code-block-wrapper">
  <pre><code>sudo apt update && sudo apt upgrade -y
sudo apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev aria2 -y</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
<div class="code-block-wrapper">
  <pre><code>sudo curl https://get.ignite.com/cli | sudo bash
sudo mv ignite /usr/local/bin/</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install Go

<div class="code-block-wrapper">
  <pre><code>sudo rm -rf /usr/local/go
curl -Ls https://go.dev/dl/go1.23.3.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)
eval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>


- Install Binary

<div class="code-block-wrapper">
  <pre><code>cd $HOME
git clone https://github.com/aaronetwork/aaronetwork-chain.git
cd aaronetwork-chain
git checkout v1.0.0
ignite chain build</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize The Node

<div class="code-block-wrapper"><!-- Change chain id and port -->
  <pre><code>aaronetworkd init $MONIKER --chain-id aaronetwork
sed -i -e "s|^node *=.*|node = \"tcp://localhost:12657\"|" $HOME/.aaronetwork/config/client.toml
sed -i -e "s|^keyring-backend *=.*|keyring-backend = \"os\"|" $HOME/.aaronetwork/config/client.toml
sed -i -e "s|^chain-id *=.*|chain-id = \"aaronetwork\"|" $HOME/.aaronetwork/config/client.toml
</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Change chain id and port -->

- Download Genesis & Addrbook

<div class="code-block-wrapper">
  <pre><code>curl -L https://snapshot.sychonix.com/mainnet/aaronetwork/genesis.json > $HOME/.aaronetwork/config/genesis.json
curl -L https://snapshot.sychonix.com/mainnet/aaronetwork/addrbook.json > $HOME/.aaronetwork/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Seeds and Peers

<div class="code-block-wrapper">
  <pre><code>SEEDS="d74b63e82c0d6ee7f97da784dd86ec4f8d805bc3@aaronetwork-mainnet.sychonix.com:12656"
PEERS="$(curl -sS https://rpc-aaronetwork.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i -e "s|^seeds *=.*|seeds = '"$SEEDS"'|; s|^persistent_peers *=.*|persistent_peers = '"$PEERS"'|" $HOME/.aaronetwork/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Update Port Configuration

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%:1317%:12617%; s%:8080%:12680%; s%:9090%:12690%; s%:9091%:12691%; s%:8545%:12645%; s%:8546%:12646%; s%:6065%:12665%" $HOME/.aaronetwork/config/app.toml
sed -i -e "s%:26658%:12658%; s%:26657%:12657%; s%:6060%:12660%; s%:26656%:12656%; s%:26660%:12661%" $HOME/.aaronetwork/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Customize Pruning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.aaronetwork/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer

<div class="code-block-wrapper"><!-- Note: Change gas price and denom -->
  <pre><code>sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0uaaron\"|" $HOME/.aaronetwork/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.aaronetwork/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.aaronetwork/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Note: Change gas price and denom -->

- Create Service File

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/aaronetworkd.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=aaronetwork mainnet node
After=network-online.target
[Service]
User=$USER
ExecStart=$(which aaronetworkd) start
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
  <pre><code>curl "https://snapshot.sychonix.com/mainnet/aaronetwork/aaronetwork-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.aaronetwork"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable the Service and Start the Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable aaronetworkd.service
sudo systemctl restart aaronetworkd.service && sudo journalctl -u aaronetworkd.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
