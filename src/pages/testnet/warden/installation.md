---
title: Installation Node
layout: '~/layouts/TestnetLayout.astro'
network: Testnet
chain id : buenavista-1
icon: warden
---

- Install dependencies 

<div class="code-block-wrapper">
  <pre><code>sudo apt update && sudo apt upgrade -y
apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev tar clang bsdmainutils ncdu unzip libleveldb-dev -y</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install go 

<div class="code-block-wrapper">
  <pre><code>ver="1.21.1"
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> ~/.bash_profile
source ~/.bash_profile
go version</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install and Build binary 

<div class="code-block-wrapper">
  <pre><code>cd $HOME && mkdir -p go/bin/
wget https://github.com/warden-protocol/wardenprotocol/releases/download/v0.3.2/wardend_Linux_x86_64.zip
unzip wardend_Linux_x86_64.zip
rm -rf wardend_Linux_x86_64.zip
chmod +x wardend
mv wardend $HOME/go/bin/wardend</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Initialize the node 

<div class="code-block-wrapper">
  <pre><code>wardend config set client chain-id buenavista-1
wardend config set client keyring-backend test</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Genesis 

<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/warden/genesis.json > $HOME/.warden/config/genesis.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download addrbook 

<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/warden/addrbook.json > $HOME/.warden/config/addrbook.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Seed & Gas 

<div class="code-block-wrapper">
  <pre><code>sed -i -e 's|^seeds *=.*|seeds = "ddb4d92ab6eba8363bab2f3a0d7fa7a970ae437f@sentry-1.buenavista.wardenprotocol.org:26656,c717995fd56dcf0056ed835e489788af4ffd8fe8@sentry-2.buenavista.wardenprotocol.org:26656,e1c61de5d437f35a715ac94b88ec62c482edc166@sentry-3.buenavista.wardenprotocol.org:26656"|' $HOME/.warden/config/config.toml
sed -i -e 's|^minimum-gas-prices *=.*|minimum-gas-prices = "0.01uward"|' $HOME/.warden/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Prunning 

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "17"|' \
  $HOME/.warden/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Indexer (optional) 

<div class="code-block-wrapper">
  <pre><code>indexer="null" &&
sed -i -e "s/^indexer *=.*/indexer = \"$indexer\"/" $HOME/.warden/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Custom Port (optional) 

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:24158\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:24157\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:24160\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:24156\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":24166\"%" $HOME/.warden/config/config.toml
sed -i -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:24117\"%; s%^address = \":8080\"%address = \":24180\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:24190\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:24191\"%; s%:8545%:24145%; s%:8546%:24146%; s%:6065%:24165%" $HOME/.warden/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Service File 

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/wardend.service > /dev/null << EOF
[Unit]
Description=Warden Protocol node service
After=network-online.target
[Service]
User=$USER
ExecStart=$(which wardend) start
Restart=on-failure
RestartSec=10
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Snapshot 

<div class="code-block-wrapper">
  <pre><code>curl "https://snapshot.sychonix.com/warden/warden-latest.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.warden"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Start 

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable wardend.service
sudo systemctl start wardend.service
sudo journalctl -u wardend.service -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create Validator

- Heads up to the Cheat Sheets to create validator

<a href="https://sychonix.com/testnet/warden/cheat" >
  <button style="background-color: green; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 10px; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);" onmouseover="this.style.boxShadow='0 0 0 4px rgba(0,255,0,0.5)'" onmouseout="this.style.boxShadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'">CLI Cheatsheets</button>
</a>
