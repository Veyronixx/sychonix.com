---
title: Installation Node
---

- Install Dependencies

<div class="code-block-wrapper">
  <pre><code>sudo apt update && sudo apt upgrade -y
apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev -y</code></pre>
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
- Install the Binary

<div class="code-block-wrapper">
  <pre><code>cd && rm -rf firmachain
git clone https://github.com/firmachain/firmachain
cd firmachain
git checkout v0.3.5-patch</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize the Node

<div class="code-block-wrapper">
  <pre><code>firmachaind config node tcp://localhost:11457
fiammad config keyring-backend os
fiammad config chain-id firmachain-evm-mainnet-1
fiammad init "YourName" --chain-id firmachain-evm-mainnet-1</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Genesis and Addrbook

<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/mainnet/firmachain/genesis.json > $HOME/.firmachain/config/genesis.json
curl -Ls https://snapshot.sychonix.com/firmachain/addrbook.json > $HOME/.firmachain/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Seeds and Peers

<div class="code-block-wrapper">
  <pre><code>sed -i -e 's|^seeds *=.*|seeds = "7b3251fa381f170365df33191cfa36b24c63821d@firmachain-mainnet.sychonix.com:11456,f89dcc15241e30323ae6f491011779d53f9a5487@mainnet-seed1.firmachain.dev:26656,04cce0da4cf5ceb5ffc04d158faddfc5dc419154@mainnet-seed2.firmachain.dev:26656,940977bdc070422b3a62e4985f2fe79b7ee737f7@mainnet-seed3.firmachain.dev:26656,20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:16456,8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:26656,b85358e035343a3b15e77e1102857dcdaf70053b@seeds.bluestake.net:24156,931a7c680d28c84a8a53e4017a6eae0788ee7cf2@firmachain.ramuchi.tech:57656,35b9e0a0818d2c5e9ef187984872c0ad2dbd447c@firma.peer.stavr.tech:1036,637077d431f618181597706810a65c826524fd74@firmachain.rpc.nodeshub.online:16456"|' $HOME/.firmachain/config/config.toml
PEERS="$(curl -sS https://rpc-firmachain.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.firmachain/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Update Port Configuration

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%:1317%:11417%; s%:8080%:11480%; s%:9090%:11490%; s%:9091%:11491%; s%:8545%:11445%; s%:8546%:11446%; s%:6065%:11465%" $HOME/.firmachain/config/app.toml
sed -i -e "s%:26658%:11458%; s%:26657%:11457%; s%:6060%:11460%; s%:26656%:11456%; s%:26660%:11461%" $HOME/.firmachain/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Customize Pruning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.firmachain/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer

<div class="code-block-wrapper">
  <pre><code>sed -i 's|minimum-gas-prices =.*|minimum-gas-prices = "0.1ufct"|g' $HOME/.firmachain/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.firmachain/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.firmachain/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Service File

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/fiammad.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=firmachain mainnet node
After=network-online.target
[Service]
User=$USER
ExecStart=$(which fiammad) start
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
  <pre><code>curl "https://snapshot.sychonix.com/mainnet/firmachain/firmachain-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.firmachain"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable the Service and Start the Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable fiammad.service
sudo systemctl restart fiammad.service && sudo journalctl -u fiammad.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
