---
layout: '~/layouts/TestnetLayout.astro'
icon: airchains
title: Rollup DA
---

 Hardware requirements
The following requirements are recommended for running Airchains:

| **Component**                      | **Minimum** | **Recommended**      |
|------------------------------------|-------------|----------------------|
| **RAM**                            | 4GB         | 8GB                  |
| **CPU (amd64/x86 architecture)**   | 2 cores     | 4 cores              |
| **Storage (SSD)**                  | 50-100 GB   | 200-300 GB           |

 Creating an EVM ZK Rollup using DA Eigen

 Install dependencies
```
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git jq lz4 build-essential cmake perl automake autoconf libtool wget libssl-dev
```

 Install Go
```
ver="1.22.3" && \
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz" && \
sudo rm -rf /usr/local/go && \
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz" && \
rm "go$ver.linux-amd64.tar.gz" && \
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile && \
source $HOME/.bash_profile && \
go version
```

 Install Packages
```
git clone https://github.com/airchains-network/evm-station.git
```
```
git clone https://github.com/airchains-network/tracks.git
```


 Setting Up and Running the EVM Station
```
cd evm-station
```
```
go mod tidy
```
 Running the Project and save privatekey
```
/bin/bash ./scripts/local-setup.sh
```
![photo_6298630648834933141_y](https://github.com/sychonix/sychonixx/assets/110755590/f57bd88a-21f7-4889-bfee-d2e5f81dbfac)
# Create env file
```
nano ~/.rollup-env
```
```
MONIKER="localtestnet"
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
VAL_KEY="mykey"
```
 Create a service file Evmos 
```
sudo tee /etc/systemd/system/rolld.service > /dev/null << EOF
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
EOF
```

 Change the Port in app.toml to 0.0.0.0
```
nano $HOME/.evmosd/config/app.toml
```
![1](https://github.com/sychonix/sychonixx/assets/110755590/ac098248-4970-4eb8-bf69-59835426cb46)

 Enable Service and Start Evmos
```
sudo systemctl daemon-reload
sudo systemctl enable rolld
sudo systemctl start rolld
sudo journalctl -u rolld -f --no-hostname -o cat
```
 Get the Evmos Private Key and Keep it Safe
```
/bin/bash ./scripts/local-keys.sh
```
 Install Eigen DA
```
cd $HOME
wget https://github.com/airchains-network/tracks/releases/download/v0.0.2/eigenlayer
mkdir -p $HOME/go/bin
chmod +x $HOME/eigenlayer
mv $HOME/eigenlayer $HOME/go/bin
```
 Generate operator keys with ECDSA type
```
eigenlayer operator keys create --key-type ecdsa <yor_wallet_name>
```
**The above command generates an ECDSA Private Key, save it in a safe place and CTRL + C to continue, fill in the `holesky faucet' at the ethreum address generated in the above command**.
![photo1718295797](https://github.com/sychonix/sychonixx/assets/110755590/e442679f-0fb6-4d42-8704-be16d8a3fda4)



![3](https://github.com/sychonix/sychonixx/assets/110755590/c684c31b-691a-4424-8f6a-96b84236c04f)


 Setting Up and Running Tracks
```
cd tracks
```
```
go mod tidy
```

 Initiate Sequencer
```
go run cmd/main.go init --daRpc "disperser-holesky.eigenda.xyz" --daKey "PUBLICHEX" --daType "eigen" --moniker "MONIKER" --stationRpc "http://127.0.0.1:8545" --stationAPI "http://127.0.0.1:8545" --stationType "evm"
```

![4](https://github.com/sychonix/sychonixx/assets/110755590/b82ee47d-a855-4024-bc90-2f9a6e5d0b5f)



 Create Keys for Junction
```
go run cmd/main.go keys junction --accountName <your-wallet-name> --accountPath $HOME/.tracks/junction-accounts/keys
```
**keep it in a safe place**

![5](https://github.com/sychonix/sychonixx/assets/110755590/df5e6502-3831-4e87-b256-fee02af2b798)


> Fund Keys for Junction Testnet
Navigate to the Switchyard faucet in the [Airchains Discord](https://discord.gg/KCmxXXnM) and follow the provided steps to obtain Switchyard tokens for funding the keys.
 Initiate Prover
```
go run cmd/main.go prover v1EVM
```

![6](https://github.com/sychonix/sychonixx/assets/110755590/b9e80456-c0b4-4900-b429-a0dadc114693)



 Create Station on Junction
Locate the node ID in the `~/.track/config/sequencer.toml` configuration file.
```
nano ~/.tracks/config/sequencer.toml
```

![7](https://github.com/sychonix/sychonixx/assets/110755590/6c141b79-3dd9-455c-8c85-ffd2a19fea81)

```
go run cmd/main.go create-station --accountName <your-wallet-name> --accountPath $HOME/.tracks/junction-accounts/keys --jsonRPC "https://junction-testnet-rpc.synergynodes.com/" --info "EVM Track" --tracks <wallet-address> --bootstrapNode "/ip4/<your-ip-vps>/tcp/2300/p2p/<node_id>"
```
***replace <your-wallet-name> with your wallet name, replace <node_id> with the node id you got in `~/.track/config/sequencer.toml`, replace <wallet-address> with the address you generated earlier, and replace <your-ip-vps> with your VPS ip.***

 Create and run node with systemd
```
sudo tee /etc/systemd/system/stationd.service > /dev/null << EOF
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
EOF
```
```
sudo systemctl daemon-reload
sudo systemctl enable stationd
sudo systemctl restart stationd
sudo journalctl -u stationd -f --no-hostname -o cat
```

 All done, now just tx using your RPC.

![8](https://github.com/sychonix/sychonixx/assets/110755590/d79b02b4-e05c-4b33-8e6b-7341d8a2e02f)

> RPC : http://your-ip:8545

> Chain ID :  1234
