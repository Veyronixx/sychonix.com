---
title: Snapshot
---



- Stop Service
<div class="code-block-wrapper">
  <pre><code>sudo systemctl stop crossfid</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Back up priv_validator_state.json
<div class="code-block-wrapper">
  <pre><code>cp ~/.crossfid/data/priv_validator_state.json  ~/.crossfid/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Reset the data
<div class="code-block-wrapper">
  <pre><code>crossfid tendermint unsafe-reset-all --home $HOME/.crossfid --keep-addr-book</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Snapshot
<div class="code-block-wrapper">
  <pre><code>curl https://snapshot.sychonix.com/testnet/crossfi/crossfi-latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.crossfid</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Restore Backup
<div class="code-block-wrapper">
  <pre><code>mv $HOME/.crossfid/priv_validator_state.json.backup $HOME/.crossfid/data/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Restart Service
<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart crossfid && sudo journalctl -u crossfid -f -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
