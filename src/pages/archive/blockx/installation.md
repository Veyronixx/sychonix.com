---
layout: '~/layouts/MainnetLayout.astro'
icon: blockx
---

 Install dependencies 

```
sudo apt update && sudo apt upgrade -y && sudo apt install curl tar wget clang pkg-config libssl-dev jq build-essential bsdmainutils git make ncdu gcc git jq chrony liblz4-tool -y
```

 Install go
```
ver="1.21.1"
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> ~/.bash_profile
source ~/.bash_profile
go version
```

 Install binary

```
cd $HOME
git clone https://github.com/BlockXLabs/BlockX-Genesis-Mainnet1.git
cd BlockX-Genesis-Mainnet1
make install
```
 Initialize the node
```
blockxd init $MONIKER --chain-id blockx_100-1
blockxd config chain-id blockx_100-1
blockxd config keyring-backend file
```

 Genesis
```
wget -O $HOME/.blockxd/config/genesis.json "https://raw.githubusercontent.com/BlockXLabs/networks/master/chains/blockx_100-1/genesis.json"
```
Seed, Peer & Gas
```
seeds="cd462b62d54296ab4550d7c1ed5baafe5653faa6@137.184.7.64:26656,fbaf65d8f2732cb19269569763de4b75d84f5f52@147.182.238.235:26656,5f21477b66cce124fc61167713243d8de30a9572@137.184.38.212:26656,abddf4491980d5e6c31b44e3640610c77d475d89@146.190.153.165:26656"
sed -i.bak -e "s/^seed *=.*/seed = \"$seed\"/" ~/.blockxd/config/config.toml
```

 Prunning
```
sed -i 's|^pruning *=.*|pruning = "custom"|g' $HOME/.blockxd/config/app.toml
sed -i 's|^pruning-keep-recent  *=.*|pruning-keep-recent = "100"|g' $HOME/.blockxd/config/app.toml
sed -i 's|^pruning-interval *=.*|pruning-interval = "10"|g' $HOME/.blockxd/config/app.toml
sed -i 's|^snapshot-interval *=.*|snapshot-interval = 2000|g' $HOME/.blockxd/config/app.toml
sed -i 's|^prometheus *=.*|prometheus = true|' $HOME/.blockxd/config/config.toml
```

 Service
```
sudo tee /etc/systemd/system/blockxd.service > /dev/null << EOF
[Unit]
Description=Blockxd
After=network-online.target

[Service]
User=$USER
ExecStart=$(which blockxd) start 
Restart=always
RestartSec=3
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF
```

 Start
```
systemctl daemon-reload
systemctl enable blockxd
systemctl restart blockxd
journalctl -fu blockxd -ocat
```

 Create Validator

Heads up to the Cheat Sheets to create validator

<a href="https://sychonix.com/mainnet/blockx/cheat" 
>
  <button style="background-color: green; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 10px; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);" onmouseover="this.style.boxShadow='0 0 0 4px rgba(0,255,0,0.5)'" onmouseout="this.style.boxShadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'">CLI Cheatsheets</button>
</a>
