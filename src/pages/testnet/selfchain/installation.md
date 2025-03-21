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
curl -L https://snapshot.sychonix.com/testnet/selfchain/selfchaind.tar.gz | tar -xvzf - -C $HOME
sudo mv selfchaind /usr/local/bin/</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize The Node

<div class="code-block-wrapper">
  <pre><code>selfchaind init $MONIKER --chain-id selfchain-testnet
sed -i -e "s|^node *=.*|node = \"tcp://localhost:11557\"|" $HOME/.selfchain/config/client.toml
sed -i -e "s|^keyring-backend *=.*|keyring-backend = \"os\"|" $HOME/.selfchain/config/client.toml
sed -i -e "s|^chain-id *=.*|chain-id = \"selfchain-testnet\"|" $HOME/.selfchain/config/client.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Genesis & Addrbook

<div class="code-block-wrapper">
  <pre><code>curl -L https://snapshot.sychonix.com/testnet/selfchain/genesis.json > $HOME/.selfchain/config/genesis.json
curl -L https://snapshot.sychonix.com/testnet/selfchain/addrbook.json > $HOME/.selfchain/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Seeds and Peers

<div class="code-block-wrapper">
  <pre><code>PEERS="$(curl -sS https://rpc-selfchain-t.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.selfchain/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Update Port Configuration

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%:1317%:11517%; s%:8080%:11580%; s%:9090%:11590%; s%:9091%:11591%; s%:8545%:11545%; s%:8546%:11546%; s%:6065%:11565%" $HOME/.selfchain/config/app.toml
sed -i -e "s%:26658%:11558%; s%:26657%:11557%; s%:6060%:11560%; s%:26656%:11556%; s%:26660%:11561%" $HOME/.selfchain/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Customize Pruning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.selfchain/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.005uself\"|" $HOME/.selfchain/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.selfchain/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.selfchain/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Service File

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/selfchaind.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=selfchain testnet node
After=network-online.target
[Service]
User=$USER
ExecStart=$(which selfchaind) start
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
  <pre><code>curl "https://snapshot.sychonix.com/testnet/selfchain/selfchain-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.selfchain"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable the Service and Start the Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable selfchaind.service
sudo systemctl restart selfchaind.service && sudo journalctl -u selfchaind.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
