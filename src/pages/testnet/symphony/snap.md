---
title: Snapshot

icon: sym
---
<!-- Note: Change nodename, Binary, and $HOME/.binary -->
- Stop Service

<div class="code-block-wrapper">
  <pre><code>sudo systemctl stop symphonyd</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Back up priv_validator_state.json

<div class="code-block-wrapper">
  <pre><code>cp ~/.symphonyd/data/priv_validator_state.json  ~/.symphonyd/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Reset State

<div class="code-block-wrapper">
  <pre><code>symphonyd tendermint unsafe-reset-all --home $HOME/.symphonyd --keep-addr-book</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Snapshot

<div class="code-block-wrapper">
  <pre><code>curl https://snapshot.sychonix.com/testnet/symphony/symphony-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.symphonyd</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Restore Backup and Restart Service

<div class="code-block-wrapper">
  <pre><code>mv $HOME/.symphonyd/priv_validator_state.json.backup $HOME/.symphonyd/data/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>



<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart symphonyd && sudo journalctl -u symphonyd -f -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
