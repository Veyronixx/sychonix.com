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

- Install the Binary

<div class="code-block-wrapper"><!-- Binary-->
  <pre><code>cd $HOME 
curl -L https://snapshot.sychonix.com/mainnet/crossfi/crossfid.tar.gz | tar -xvzf - -C $HOME
sudo mv crossfid $HOME/go/bin/</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Binary-->

- Initialize the Node

<div class="code-block-wrapper"><!-- Change chain id and port -->
  <pre><code>crossfid config node tcp://localhost:11057
crossfid config keyring-backend os
crossfid config chain-id crossfi-evm-mainnet-1
crossfid init "YourName" --chain-id crossfi-evm-mainnet-1</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Change chain id and port -->

- Download Genesis and Addrbook

<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/mainnet/crossfi/genesis.json > $HOME/.crossfid/config/genesis.json
curl -Ls https://snapshot.sychonix.com/mainnet/crossfi/addrbook.json > $HOME/.crossfid/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure Seeds and Peers

<div class="code-block-wrapper">
  <pre><code>PEERS="$(curl -sS https://rpc-crossfi.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.crossfid/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Update Port Configuration

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%:1317%:11017%; s%:8080%:11080%; s%:9090%:11090%; s%:9091%:11091%; s%:8545%:11045%; s%:8546%:11046%; s%:6065%:11065%" $HOME/.crossfid/config/app.toml
sed -i -e "s%:26658%:11058%; s%:26657%:11057%; s%:6060%:11060%; s%:26656%:11056%; s%:26660%:11061%" $HOME/.crossfid/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Customize Pruning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.crossfid/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Set Minimum Gas Price, Enable Prometheus, and Disable the Indexer <!-- Note: Change gas price and denom -->
<div class="code-block-wrapper">
  <pre><code>sed -i 's|minimum-gas-prices =.*|minimum-gas-prices = "10000000000000mpx"|g' $HOME/.crossfid/config/app.toml
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.crossfid/config/config.toml
sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.crossfid/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div><!-- Note: Change gas price and denom -->

- Create Service File

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/crossfid.service &gt; /dev/null &lt;&lt;EOF
[Unit]
Description=crossfi mainnet node
After=network-online.target
[Service]
User=$USER
ExecStart=$(which crossfid) start
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
  <pre><code>curl "https://snapshot.sychonix.com/mainnet/crossfi/crossfi-snapshot.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.crossfid"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable the Service and Start the Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable crossfid.service
sudo systemctl restart crossfid.service && sudo journalctl -u crossfid.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
