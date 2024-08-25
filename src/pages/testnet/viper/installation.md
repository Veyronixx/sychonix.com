---
layout: '~/layouts/TestnetLayout.astro'
title: Installation Node
network: 
icon: viper
chain: 
version: 
---

- Install dependencies Required

<div class="code-block-wrapper">
  <pre><code>sudo apt update && sudo apt upgrade -y
sudo apt install curl tar wget clang pkg-config libssl-dev jq build-essential bsdmainutils git make ncdu gcc git jq chrony liblz4-tool -y</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install go

<div class="code-block-wrapper">
  <pre><code>ver="1.21.6"
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile
go version</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install binary

<div class="code-block-wrapper">
  <pre><code>cd $HOME && mkdir -p go/bin/
sudo mkdir -p viper-network
cd viper-network
sudo git clone https://github.com/vipernet-xyz/viper-binaries
cd viper-binaries
sudo cp viper_linux_amd64 /usr/local/bin/viper</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize Node

<div class="code-block-wrapper">
  <pre><code>viper util gen-chains</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>viper util gen-geozone</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create/import wallet

<div class="code-block-wrapper">
  <pre><code>viper wallet create-account</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>viper wallet import-encrypted &lt;encrypted&gt;
viper wallet import-raw &lt;privatekey&gt;</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Validator Address

<div class="code-block-wrapper">
  <pre><code>viper servicers create-validator your_address</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Peers

<div class="code-block-wrapper">
  <pre><code>echo $(viper util print-configs) | jq '.tendermint_config.P2P.PersistentPeers = "859674aa64c0ee20ebce8a50e69390698750a65f@mynode1.testnet.vipernet.xyz:26656,eec6c84a7ededa6ee2fa25e3da3ff821d965f94d@mynode2.testnet.vipernet.xyz:26656,81f4c53ccbb36e190f4fc5220727e25c3186bfeb@mynode3.testnet.vipernet.xyz:26656,d53f620caab13785d9db01515b01d6f21ab26d54@mynode4.testnet.vipernet.xyz:26656,e2b1dc002270c8883abad96520a2fe5982cb3013@mynode5.testnet.vipernet.xyz:26656"' | jq . > ~/.viper/config/configuration.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Genesis

<div class="code-block-wrapper">
  <pre><code>cd ~/.viper/config
wget -O ~/.viper/config/genesis.json https://raw.githubusercontent.com/vipernet-xyz/genesis/main/testnet/genesis.json
ulimit -Sn 16384</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create a service file

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/viper.service > /dev/null &lt; EOF
[Unit]
Description=viper service
After=network.target
Wants=network-online.target systemd-networkd-wait-online.service
[Service]
User=root
Group=sudo
ExecStart=/usr/local/bin/viper network start
ExecStop=/usr/local/bin/viper network stop
[Install]
WantedBy=default.target
EOF</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable Service and Start Node

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable viper.service
sudo systemctl restart viper.service && journalctl -fu viper -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
