---

icon: airchains
title: Rollup DA
---

 Install dependencies
 
<div class="code-block-wrapper">
  <pre><code>sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git jq lz4 build-essential cmake perl automake autoconf libtool wget libssl-dev</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

 Install Go

<div class="code-block-wrapper">
  <pre><code>ver="1.22.3" && \
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz" && \
sudo rm -rf /usr/local/go && \
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz" && \
rm "go$ver.linux-amd64.tar.gz" && \
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile && \
source $HOME/.bash_profile && \
go version</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

 Install Packages
<div class="code-block-wrapper">
  <pre><code>git clone https://github.com/airchains-network/evm-station.git</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>git clone https://github.com/airchains-network/tracks.git</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>



 Setting Up and Running the EVM Station
<div class="code-block-wrapper">
  <pre><code>cd evm-station</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>go mod tidy</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>


 Running the Project and save privatekey
<div class="code-block-wrapper">
  <pre><code>/bin/bash ./scripts/local-setup.sh</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

 Create env file
<div class="code-block-wrapper">
  <pre><code>nano ~/.rollup-env</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>MONIKER="localtestnet"
KEYRING="test"
KEYALGO="eth_secp256k1"
LOGLEVEL="info"
HOMEDIR="$HOME/.evmosd"
TRACE=""
BASEFEE=1000000000
CONFIG=$HOMEDIR/config/config.toml
APP_TOML=$HOMEDIR/config/app.toml
GENESIS=$HOMEDIR/config/genesis.json
TMP_GENESIS=$HOMEDIR/config/tmp_genesis.json
VAL_KEY="mykey"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

 Create a service file Evmos 
<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/rolld.service > /dev/null << EOF
[Unit]
Description=ZK
After=network.target

[Service]
User=$USER
EnvironmentFile=/$HOME/.rollup-env
ExecStart=/$HOME/evm-station/build/station-evm start --metrics "" --log_level info --json-rpc.api eth,txpool,personal,net,debug,web3 --chain-id "stationevm_1234-1"
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>


 Change the Port in app.toml to 0.0.0.0
<div class="code-block-wrapper">
  <pre><code>nano $HOME/.evmosd/config/app.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

 Enable Service and Start Evmos
<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable rolld
sudo systemctl start rolld
sudo journalctl -u rolld -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

 Get the Evmos Private Key and Keep it Safe
<div class="code-block-wrapper">
  <pre><code>/bin/bash ./scripts/local-keys.sh</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

 Install Eigen DA
<div class="code-block-wrapper">
  <pre><code>cd $HOME
wget https://github.com/airchains-network/tracks/releases/download/v0.0.2/eigenlayer
mkdir -p $HOME/go/bin
chmod +x $HOME/eigenlayer
mv $HOME/eigenlayer $HOME/go/bin</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

 Generate operator keys with ECDSA type
<div class="code-block-wrapper">
  <pre><code>eigenlayer operator keys create --key-type ecdsa <yor_wallet_name></code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

 Setting Up and Running Tracks
<div class="code-block-wrapper">
  <pre><code>cd tracks</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>go mod tidy</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>


 Initiate Sequencer
<div class="code-block-wrapper">
  <pre><code>go run cmd/main.go init --daRpc "disperser-holesky.eigenda.xyz" --daKey "PUBLICHEX" --daType "eigen" --moniker "MONIKER" --stationRpc "http://127.0.0.1:8545" --stationAPI "http://127.0.0.1:8545" --stationType "evm"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

 Create Keys for Junction
<div class="code-block-wrapper">
  <pre><code>go run cmd/main.go keys junction --accountName <your-wallet-name> --accountPath $HOME/.tracks/junction-accounts/keys</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

**keep it in a safe place**


> Fund Keys for Junction Testnet
Navigate to the Switchyard faucet in the [Airchains Discord](https://discord.gg/KCmxXXnM) and follow the provided steps to obtain Switchyard tokens for funding the keys.
 Initiate Prover
<div class="code-block-wrapper">
  <pre><code>go run cmd/main.go prover v1EVM</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

 Create Station on Junction
Locate the node ID in the `~/.track/config/sequencer.toml` configuration file.
<div class="code-block-wrapper">
  <pre><code>nano ~/.tracks/config/sequencer.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>go run cmd/main.go create-station --accountName <your-wallet-name> --accountPath $HOME/.tracks/junction-accounts/keys --jsonRPC "https://junction-testnet-rpc.synergynodes.com/" --info "EVM Track" --tracks <wallet-address> --bootstrapNode "/ip4/<your-ip-vps>/tcp/2300/p2p/<node_id>"</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

 Create and run node with systemd
<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/stationd.service > /dev/null << EOF
[Unit]
Description=station track service
After=network-online.target
[Service]
User=$USER
WorkingDirectory=/$HOME/tracks/
ExecStart=/usr/local/go/bin/go run cmd/main.go start
Restart=always
RestartSec=3
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable stationd
sudo systemctl restart stationd
sudo journalctl -u stationd -f --no-hostname -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

 All done, now just tx using your RPC.
