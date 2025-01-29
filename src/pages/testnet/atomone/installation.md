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
  <pre><code>atomoned init $MONIKER --chain-id atomone-testnet-1
sed -i -e "s|^node *=.*|node = \"tcp://localhost:13057\"|" $HOME/.atomone/config/client.toml
sed -i -e "s|^keyring-backend *=.*|keyring-backend = \"os\"|" $HOME/.atomone/config/client.toml
sed -i -e "s|^chain-id *=.*|chain-id = \"atomone-testnet-1\"|" $HOME/.atomone/config/client.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Change chain id and port -->

- Download Genesis & Addrbook

<div class="code-block-wrapper">
  <pre><code>curl -L https://snapshot.sychonix.com/testnet/atomone/genesis.json > $HOME/.atomone/config/genesis.json
curl -L https://snapshot.sychonix.com/testnet/atomone/addrbook.json > $HOME/.atomone/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Seeds and Peers

<div class="code-block-wrapper">
  <pre><code>SEEDS="b16ab773dc794cdd3e0a3f561e8a15e3b3fe0613@atomone-testnet.sychonix.com:13056"
PEERS="$(curl -sS https://rpc-atomone-t.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i -e "s|^seeds *=.*|seeds = '"$SEEDS"'|; s|^persistent_peers *=.*|persistent_peers = '"$PEERS"'|" $HOME/.atomone/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Update Port Configuration

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%:1317%:13017%; s%:8080%:13080%; s%:9090%:13090%; s%:9091%:13091%; s%:8545%:13045%; s%:8546%:13046%; s%:6065%:13065%" $HOME/.atomone/config/app.toml
sed -i -e "s%:26658%:13058%; s%:26657%:13057%; s%:6060%:13060%; s%:26656%:13056%; s%:26660%:13061%" $HOME/.atomone/config/config.toml</code></pre>
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
  <pre><code>sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.025uatone\"|" $HOME/.atomone/config/app.toml
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
  <pre><code>curl "https://snapshot.sychonix.com/testnet/atomone/atomone-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.atomone"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable the Service and Start the Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable atomoned.service
sudo systemctl restart atomoned.service && sudo journalctl -u atomoned.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
