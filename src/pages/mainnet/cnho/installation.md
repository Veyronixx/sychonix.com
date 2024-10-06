---
title: Installation Node
---

- Install dependencies 

<div class="code-block-wrapper">
  <pre><code>sudo apt update && sudo apt upgrade -y
apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev -y</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install go

<div class="code-block-wrapper">
  <pre><code>sudo rm -rf /usr/local/go
curl -Ls https://go.dev/dl/go1.21.1.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)
eval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install binary

<div class="code-block-wrapper">
  <pre><code>cd $HOME
curl -L https://snapshot.sychonix.com/mainnet/cnho/cnhod.tar.gz | tar -xvzf - -C $HOME
sudo mv cnhod /usr/local/bin/</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize the node

<div class="code-block-wrapper">
  <pre><code>cnhod config chain-id cnho_stables-1
cnhod config keyring-backend file
cnhod init "your_node_name" --chain-id cnho_stables-1
</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Genesis

<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/mainnet/cnho/genesis.json > $HOME/.cnho/config/genesis.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Addrbook 

<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/cnho/addrbook.json > $HOME/.cnho/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Peers and Gas Prices

<div class="code-block-wrapper">
  <pre><code>PEERS="$(curl -sS https://rpc-cnho.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.cnho/config/config.toml
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.00001ucnho\"|" $HOME/.cnho/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Prunning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.cnho/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Indexer

<div class="code-block-wrapper">
  <pre><code>indexer="null" &&
sed -i -e "s/^indexer *=.*/indexer = \"$indexer\"/" $HOME/.cnho/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Service

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

- Snapshot

<div class="code-block-wrapper">
  <pre><code>curl "https://snapshot.sychonix.com/mainnet/cnho/cnho-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.cnho"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Start

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable cnhod.service
sudo systemctl restart cnhod.service && sudo journalctl -u cnhod.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
