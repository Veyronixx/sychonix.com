---
title: Snapshot

icon: sym
---
<!-- Note: Change nodename, Binary, and $HOME/.binary -->
- Stop Service

<div class="code-block-wrapper">
  <pre><code>sudo systemctl stop kopid</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Back up priv_validator_state.json

<div class="code-block-wrapper">
  <pre><code>cp ~/.kopid/data/priv_validator_state.json  ~/.kopid/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Reset State

<div class="code-block-wrapper">
  <pre><code>kopid tendermint unsafe-reset-all --home $HOME/.kopid --keep-addr-book</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Snapshot

<div class="code-block-wrapper">
  <pre><code>curl https://snapshot.sychonix.com/testnet/kopi/kopi-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.kopid</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Restore Backup and Restart Service

<div class="code-block-wrapper">
  <pre><code>mv $HOME/.kopid/priv_validator_state.json.backup $HOME/.kopid/data/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>



<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart kopid && sudo journalctl -u kopid -f -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
