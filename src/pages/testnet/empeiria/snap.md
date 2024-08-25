---
title: Snapshot
layout: '~/layouts/TestnetLayout.astro'
network: 
chain id: 
icon: emped
---



- Stop Service
<div class="code-block-wrapper">
  <pre><code>sudo systemctl stop emped</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Back up priv_validator_state.json
<div class="code-block-wrapper">
  <pre><code>cp ~/.empe-chain/data/priv_validator_state.json  ~/.empe-chain/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>emped tendermint unsafe-reset-all --home $HOME/.empe-chain --keep-addr-book</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>curl https://snapshot.sychonix.com/empeiria/empeiria-latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.empe-chain</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>mv $HOME/.empe-chain/priv_validator_state.json.backup $HOME/.empe-chain/data/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart emped && sudo journalctl -u emped -f -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
