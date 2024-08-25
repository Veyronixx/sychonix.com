---
layout: '~/layouts/TestnetLayout.astro'
title: Live Peers
network: Testnet
icon: selfchain
chain: self-1
version: v
---
- Automatically adding Live peers to your config.toml file

<div class="code-block-wrapper">
  <pre><code>PEERS="$(curl -sS http://rpc-selfchain.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.empe-chain/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
