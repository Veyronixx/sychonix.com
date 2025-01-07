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
git clone https://github.com/atomone-hub/atomone.git
cd atomone
git checkout v1.0.0
make install</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize The Node

<div class="code-block-wrapper"><!-- Change chain id and port -->
  <pre><code>atomoned init $MONIKER --chain-id atomone-1
sed -i -e "s|^node *=.*|node = \"tcp://localhost:12957\"|" $HOME/.atomone/config/client.toml
sed -i -e "s|^keyring-backend *=.*|keyring-backend = \"os\"|" $HOME/.atomone/config/client.toml
sed -i -e "s|^chain-id *=.*|chain-id = \"atomone-1\"|" $HOME/.atomone/config/client.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Change chain id and port -->

- Download Genesis & Addrbook

<div class="code-block-wrapper">
  <pre><code>curl -L https://snapshot.sychonix.com/mainnet/atomone/genesis.json > $HOME/.atomone/config/genesis.json
curl -L https://snapshot.sychonix.com/mainnet/atomone/addrbook.json > $HOME/.atomone/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Seeds and Peers

<div class="code-block-wrapper">
  <pre><code>SEEDS="a3c7481636f715464af61b5cb26de1cb7fd26f05@atomone-mainnet.sychonix.com:12956"
PEERS="$(curl -sS https://rpc-atomone.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i -e "s|^seeds *=.*|seeds = '"$SEEDS"'|; s|^persistent_peers *=.*|persistent_peers = '"$PEERS"'|" $HOME/.atomone/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Update Port Configuration

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%:1317%:12917%; s%:8080%:12980%; s%:9090%:12990%; s%:9091%:12991%; s%:8545%:12945%; s%:8546%:12946%; s%:6065%:12965%" $HOME/.atomone/config/app.toml
sed -i -e "s%:26658%:12958%; s%:26657%:12957%; s%:6060%:12960%; s%:26656%:12956%; s%:26660%:12961%" $HOME/.atomone/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Customize Pruning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.atomone/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer

<div class="code-block-wrapper"><!-- Note: Change gas price and denom -->
  <pre><code>sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0uatone\"|" $HOME/.atomone/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.atomone/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.atomone/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Note: Change gas price and denom -->

- Create Service File

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/atomoned.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=atomoned node service
After=network-online.target
[Service]
User=$USER
ExecStart=$(which atomoned) start
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
  <pre><code>curl "https://snapshot.sychonix.com/mainnet/atomone/atomone-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.atomone"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable the Service and Start the Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable atomoned.service
sudo systemctl restart atomoned.service && sudo journalctl -u atomoned.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
