---
title: Installation Node

network: Testnet
chain id: empe-testnet-2
icon: emped
---

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
  <pre><code>curl -LO https://github.com/empe-io/empe-chain-releases/raw/master/v0.1.0/emped_linux_amd64.tar.gz</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Verify the checksum:
<div class="code-block-wrapper">
  <pre><code>sha256sum emped_linux_amd64.tar.gz</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
<span style="font-size: 15px;">You should see the following:</span>
<div class="code-block-wrapper">
  <pre><code>5353de7004bbacc516d6fc89d7bbcbde251fbba8c4bdccb2a58f8376e47ab753  emped_linux_amd64.tar.gz</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Unpack the tar.gz file
<div class="code-block-wrapper">
  <pre><code>tar -xvf emped_linux_amd64.tar.gz
mkdir -p ~/go/bin
sudo mv emped ~/go/bin
chmod u+x ~/go/bin/emped</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure a node
<div class="code-block-wrapper">
  <pre><code>export CHAINID=empe-testnet-2
export MONIKER=&lt;your moniker&gt;
emped init $MONIKER --chain-id $CHAINID
rm -rf ~/.empe-chain/config/genesis.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Genesis
<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/testnet/empeiria/genesis.json > $HOME/.empe-chain/config/genesis.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download addrbook
<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/testnet/empeiria/addrbook.json > $HOME/.empe-chain/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Peers and Seeds
<div class="code-block-wrapper">
  <pre><code>sed -i -e 's|^seeds *=.*|seeds = "31b7897fd46f68ccede7fbd827c6b6439d5b97ab@rpc-empeiria-t.sychonix.com:24556"|' $HOME/.empe-chain/config/config.toml
PEERS="$(curl -sS https://rpc-empeiria-t.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.empe-chain/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Gas Prices
<div class="code-block-wrapper">
  <pre><code>sed -e "s|minimum-gas-prices = \".*\"|minimum-gas-prices = \"$(cat .data | grep -oP 'Minimum Gas Price\s+\K\S+')\"|g" ~/.empe-chain/config/app.toml > ~/.empe-chain/config/app.toml.tmp
mv ~/.empe-chain/config/app.toml.tmp  ~/.empe-chain/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Custom Port (optional)
<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:24558\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:24557\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:24560\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:24556\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":24566\"%" $HOME/.empe-chain/config/config.toml
sed -i -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:24517\"%; s%^address = \":8080\"%address = \":24580\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:24590\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:24591\"%; s%:8545%:24545%; s%:8546%:24546%; s%:6065%:24565%" $HOME/.empe-chain/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Set pruning
<div class="code-block-wrapper">
  <pre><code>pruning="custom"
pruning_keep_recent="1000"
pruning_keep_every="0"
pruning_interval="10"
sed -i -e "s/^pruning *=.*/pruning = \"$pruning\"/" $HOME/.empe-chain/config/app.toml
sed -i -e "s/^pruning-keep-recent *=.*/pruning-keep-recent = \"$pruning_keep_recent\"/" $HOME/.empe-chain/config/app.toml
sed -i -e "s/^pruning-keep-every *=.*/pruning-keep-every = \"$pruning_keep_every\"/" $HOME/.empe-chain/config/app.toml
sed -i -e "s/^pruning-interval *=.*/pruning-interval = \"$pruning_interval\"/" $HOME/.empe-chain/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Indexer (optional)
<div class="code-block-wrapper">
  <pre><code>indexer="null" &&
sed -i -e "s/^indexer *=.*/indexer = \"$indexer\"/" $HOME/.empe-chain/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create a service file
<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/emped.service > /dev/null &lt;&lt;EOF
[Unit]
Description=emped
After=network-online.target
[Service]
User=$USER
ExecStart=$(which emped) start
Restart=on-failure
RestartSec=3
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Snapshot
<div class="code-block-wrapper">
  <pre><code>curl "https://snapshot.sychonix.com/testnet/empeiria/empeiria-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.empe-chain"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Start Service
<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable emped
sudo systemctl restart emped && sudo journalctl -u emped -f -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
