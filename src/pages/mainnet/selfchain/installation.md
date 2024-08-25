---
layout: '~/layouts/TestnetLayout.astro'
title: Installation Node
network: Mainnet
icon: selfchain
chain: self-1
---

- Autoinstall Script

<div class="code-block-wrapper">
  <pre><code>source <(curl -s https://snapshot.sychonix.com/selfchain/autoinstall.sh)</code></pre>
  <button class="copy-btn" data-target="source <(curl -s https://snapshot.sychonix.com/selfchain/autoinstall.sh)"><i class="fas fa-copy"></i></button>
</div>

------

Manual installation

- Install Dependencies

<div class="code-block-wrapper">
  <pre><code>sudo apt update && sudo apt upgrade -y 
sudo apt install -y git gcc make unzip jq</code></pre>
  <button class="copy-btn" data-target="sudo apt update && sudo apt upgrade -y \nsudo apt install -y git gcc make unzip jq"><i class="fas fa-copy"></i></button>
</div>

- Install Go

<div class="code-block-wrapper">
  <pre><code>sudo rm -rf /usr/local/go
curl -Ls https://go.dev/dl/go1.21.1.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local
eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)
eval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)</code></pre>
  <button class="copy-btn" data-target="sudo rm -rf /usr/local/go\ncurl -Ls https://go.dev/dl/go1.21.1.linux-amd64.tar.gz | sudo tar -xzf - -C /usr/local\n eval $(echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee /etc/profile.d/golang.sh)\neval $(echo 'export PATH=$PATH:$HOME/go/bin' | tee -a $HOME/.profile)"><i class="fas fa-copy"></i></button>
</div>

- Install Binary

<div class="code-block-wrapper">
  <pre><code>cd $HOME && mkdir -p go/bin/
curl -O https://snapshot.sychonix.com/selfchain/selfchaind
chmod +x selfchaind
mv selfchaind $HOME/go/bin</code></pre>
  <button class="copy-btn" data-target="cd $HOME && mkdir -p go/bin/\ncurl -O https://snapshot.sychonix.com/selfchain/selfchaind\nchmod +x selfchaind\nmv selfchaind $HOME/go/bin"><i class="fas fa-copy"></i></button>
</div>

- Initialize the node

<div class="code-block-wrapper">
  <pre><code>selfchaind config chain-id self-1
selfchaind config keyring-backend file
selfchaind init &lt;your_name&gt; --chain-id self-1</code></pre>
  <button class="copy-btn" data-target="selfchaind config chain-id self-1\nselfchaind config keyring-backend file\nselfchaind init &lt;your_name&gt; --chain-id self-1"><i class="fas fa-copy"></i></button>
</div>

- Genesis

<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/selfchain/genesis.json > $HOME/.selfchain/config/genesis.json</code></pre>
  <button class="copy-btn" data-target="curl -Ls https://snapshot.sychonix.com/selfchain/genesis.json > $HOME/.selfchain/config/genesis.json"><i class="fas fa-copy"></i></button>
</div>

- Download addrbook

<div class="code-block-wrapper">
  <pre><code>curl -Ls https://snapshot.sychonix.com/selfchain/addrbook.json > $HOME/.selfchain/config/addrbook.json</code></pre>
  <button class="copy-btn" data-target="curl -Ls https://snapshot.sychonix.com/selfchain/addrbook.json > $HOME/.selfchain/config/addrbook.json"><i class="fas fa-copy"></i></button>
</div>

- Seed and Peer

<div class="code-block-wrapper">
  <pre><code>PEERS="$(curl -sS https://rpc-selfchain.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.selfchain/config/config.toml</code></pre>
  <button class="copy-btn" data-target="PEERS=\"$(curl -sS https://rpc-selfchain.sychonix.com/net_info | jq -r '.result.peers[] | \"\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)\"' | awk -F ':' '{print $1\":\"$(NF)}' | sed -z 's|\n|,|g;s|.$||')\"\nsed -i.bak -e \"s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/\" $HOME/.selfchain/config/config.toml"><i class="fas fa-copy"></i></button>
</div>

- Configure Gas Prices

<div class="code-block-wrapper">
  <pre><code>sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.0uslf\"|" $HOME/.selfchain/config/app.toml</code></pre>
  <button class="copy-btn" data-target="sed -i -e \"s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.0uslf\"|\" $HOME/.selfchain/config/app.toml"><i class="fas fa-copy"></i></button>
</div>

- Prunning

<div class="code-block-wrapper">
  <pre><code>sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  $HOME/.selfchain/config/app.toml</code></pre>
  <button class="copy-btn" data-target="sed -i \n  -e 's|^pruning *=.*|pruning = \"custom\"|' \n  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = \"100\"|' \n  -e 's|^pruning-keep-every *=.*|pruning-keep-every = \"0\"|' \n  -e 's|^pruning-interval *=.*|pruning-interval = \"19\"|' \n  $HOME/.selfchain/config/app.toml"><i class="fas fa-copy"></i></button>
</div>

Custom Port (Optional)

<div class="code-block-wrapper">
  <pre><code>PORT=21
selfchaind config node tcp://localhost:${PORT}657
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:${PORT}658\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:${PORT}657\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:${PORT}060\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:${PORT}656\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":${PORT}660\"%" $HOME/.selfchain/config/config.toml
sed -i -e "s%^address = \"tcp://localhost:1317\"%address = \"tcp://localhost:${PORT}317\"%; s%^address = \":8080\"%address = \":${PORT}080\"%; s%^address = \"localhost:9090\"%address = \"localhost:${PORT}090\"%; s%^address = \"localhost:9091\"%address = \"localhost:${PORT}091\"%; s%^address = \"0.0.0.0:8545\"%address = \"0.0.0.0:${PORT}545\"%; s%^ws-address = \"0.0.0.0:8546\"%ws-address = \"0.0.0.0:${PORT}546\"%" $HOME/.selfchain/config/app.toml</code></pre>
  <button class="copy-btn" data-target="PORT=21\nselfchaind config node tcp://localhost:${PORT}657\nsed -i -e \"s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:${PORT}658\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:${PORT}657\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:${PORT}060\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:${PORT}656\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":${PORT}660\"%\" $HOME/.selfchain/config/config.toml\nsed -i -e \"s%^address = \"tcp://localhost:1317\"%address = \"tcp://localhost:${PORT}317\"%; s%^address = \":8080\"%address = \":${PORT}080\"%; s%^address = \"localhost:9090\"%address = \"localhost:${PORT}090\"%; s%^address = \"localhost:9091\"%address = \"localhost:${PORT}091\"%; s%^address = \"0.0.0.0:8545\"%address = \"0.0.0.0:${PORT}545\"%; s%^ws-address = \"0.0.0.0:8546\"%ws-address = \"0.0.0.0:${PORT}546\"%\" $HOME/.selfchain/config/app.toml"><i class="fas fa-copy"></i></button>
</div>

- Service

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/selfchaind.service > /dev/null &lt;&lt;EOF
[Unit]
Description=selfchain node
After=network-online.target
[Service]
User=$USER
WorkingDirectory=$HOME/.selfchain
ExecStart=$(which selfchaind) start --home $HOME/.selfchain
Restart=on-failure
RestartSec=5
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF</code></pre>
  <button class="copy-btn" data-target="sudo tee /etc/systemd/system/selfchaind.service > /dev/null &lt;&lt;EOF\n[Unit]\nDescription=selfchain node\nAfter=network-online.target\n[Service]\nUser=$USER\nWorkingDirectory=$HOME/.selfchain\nExecStart=$(which selfchaind) start --home $HOME/.selfchain\nRestart=on-failure\nRestartSec=5\nLimitNOFILE=65535\n[Install]\nWantedBy=multi-user.target\nEOF"><i class="fas fa-copy"></i></button>
</div>

- Download Snapshot

<div class="code-block-wrapper">
  <pre><code>curl "https://snapshot.sychonix.com/selfchain/selfchain-latest.tar.lz4" | lz4 -dc - | tar -xf - -C "$HOME/.selfchain"</code></pre>
  <button class="copy-btn" data-target="curl \"https://snapshot.sychonix.com/selfchain/selfchain-latest.tar.lz4\" | lz4 -dc - | tar -xf - -C \"$HOME/.selfchain\""><i class="fas fa-copy"></i></button>
</div>

- Start

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable selfchaind
sudo systemctl restart selfchaind && sudo journalctl -u selfchaind -f --no-hostname -o cat</code></pre>
  <button class="copy-btn" data-target="sudo systemctl daemon-reload\nsudo systemctl enable selfchaind\nsudo systemctl restart selfchaind && sudo journalctl -u selfchaind -f --no-hostname -o cat"><i class="fas fa-copy"></i></button>
</div>

- Create Validator

Heads up to the Cheat Sheets to create validator

<a href="https://sychonix.com/mainnet/selfchain/cheat" >
  <button style="background-color: green; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 10px; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);" onmouseover="this.style.boxShadow='0 0 0 4px rgba(0,255,0,0.5)'" onmouseout="this.style.boxShadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'">CLI Cheatsheets</button>
</a>
