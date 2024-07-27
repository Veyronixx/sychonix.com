---
title: Snapshot
layout: '~/layouts/TestnetLayout.astro'
network: 
chain id : 
icon: emped
---



- Stop Service
```
sudo systemctl stop emped
```
- Back up priv_validator_state.json
```
cp ~/.empe-chain/data/priv_validator_state.json  ~/.empe-chain/priv_validator_state.json
```
```
emped tendermint unsafe-reset-all --home $HOME/.empe-chain --keep-addr-book
```
```
curl https://snapshot.sychonix.com/empeiria/empeiria-latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.empe-chain
```
```
mv $HOME/.empe-chain/priv_validator_state.json.backup $HOME/.empe-chain/data/priv_validator_state.json
```
```
sudo systemctl restart emped && sudo journalctl -u emped -f -o cat
```