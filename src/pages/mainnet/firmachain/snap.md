---
title: Snapshot

icon: sym
---
This guide helps you restore your FirmaChain node using the latest snapshot, which is updated every 24 hours. Follow the steps below to ensure your node is up-to-date and running smoothly.


- Stop Service

<div class="code-block-wrapper">
  <pre><code>sudo systemctl stop firmachaind</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Back up priv_validator_state.json

<div class="code-block-wrapper">
  <pre><code>cp ~/.firmachain/data/priv_validator_state.json  ~/.firmachain/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Reset State

<div class="code-block-wrapper">
  <pre><code>firmachaind tendermint unsafe-reset-all --home $HOME/.firmachain --keep-addr-book</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Snapshot

<div class="code-block-wrapper">
  <pre><code>curl https://snapshot.sychonix.com/mainnet/firmachain/firmachain-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.firmachain</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Restore Backup and Restart Service

<div class="code-block-wrapper">
  <pre><code>mv $HOME/.firmachain/priv_validator_state.json.backup $HOME/.firmachain/data/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>



<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart firmachaind && sudo journalctl -u firmachaind -f -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
