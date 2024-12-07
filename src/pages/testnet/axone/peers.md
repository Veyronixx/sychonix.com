---
---

<div class="code-block-wrapper"><!-- Note: Change nodename and $HOME/.binary -->
  <pre><code>PEERS="$(curl -sS https://rpc-axone-t.sychonix.com/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}' | sed -z 's|\n|,|g;s|.$||')"
sed -i.bak -e "s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.axoned/config/config.toml</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button><!-- Note: Change nodename and $HOME/.binary -->
</div>
