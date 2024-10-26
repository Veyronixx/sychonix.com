---
title: Snapshot

icon: sym
---

- Stop Service

<div class="code-block-wrapper">
  <pre><code>sudo systemctl stop prysmd</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Back up priv_validator_state.json

<div class="code-block-wrapper">
  <pre><code>cp ~/.prysm/data/priv_validator_state.json  ~/.prysm/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Reset State

<div class="code-block-wrapper">
  <pre><code>prysmd tendermint unsafe-reset-all --home $HOME/.prysm --keep-addr-book</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Snapshot

<div class="code-block-wrapper">
  <pre><code>curl https://snapshot.sychonix.com/testnet/prysm/prysm-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.prysm</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Restore Backup and Restart Service

<div class="code-block-wrapper">
  <pre><code>mv $HOME/.prysm/priv_validator_state.json.backup $HOME/.prysm/data/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>



<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart prysmd && sudo journalctl -u prysmd -f -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
