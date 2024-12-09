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
curl -L https://snapshot.sychonix.com/mainnet/cnho/cnhod.tar.gz | tar -xvzf - -C $HOME
sudo mv cnhod /usr/local/bin/</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize The Node

<div class="code-block-wrapper">
  <pre><code>cnhod config node tcp://localhost:11357
cnhod config keyring-backend os
cnhod config chain-id cnho_stables-1
cnhod init "YourName" --chain-id cnho_stables-1</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Genesis & Addrbook

<div class="code-block-wrapper">
  <pre><code>curl -L https://snapshot.sychonix.com/mainnet/cnho/genesis.json > $HOME/.cnho/config/genesis.json
curl -L https://snapshot.sychonix.com/mainnet/cnho/addrbook.json > $HOME/.cnho/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Seeds and Peers

<div class="code-block-wrapper">
  <pre><code>PEERS="$(curl -sS https://rpc-cnho.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.cnho/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Update Port Configuration

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%:1317%:11317%; s%:8080%:11380%; s%:9090%:11390%; s%:9091%:11391%; s%:8545%:11345%; s%:8546%:11346%; s%:6065%:11365%" $HOME/.cnho/config/app.toml
sed -i -e "s%:26658%:11358%; s%:26657%:11357%; s%:6060%:11360%; s%:26656%:11356%; s%:26660%:11361%" $HOME/.cnho/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Customize Pruning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.cnho/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.00001ucnho\"|" $HOME/.cnho/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.cnho/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.cnho/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Service File

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/cnhod.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=cnho mainnet node
After=network-online.target
[Service]
User=$USER
ExecStart=$(which cnhod) start
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
  <pre><code>curl "https://snapshot.sychonix.com/mainnet/cnho/cnho-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.cnho"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable the Service and Start the Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable cnhod.service
sudo systemctl restart cnhod.service && sudo journalctl -u cnhod.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
