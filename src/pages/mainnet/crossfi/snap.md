---
title: Snapshot
icon: crossfi
---


- Stop Service

<div class="code-block-wrapper">
  <pre><code>sudo systemctl stop crossfid</code></pre>
  <button class="copy-btn" data-target="sudo systemctl stop crossfid"><i class="fas fa-copy"></i></button>
</div>

- Back up priv_validator_state.json

<div class="code-block-wrapper">
  <pre><code>cp ~/.crossfid/data/priv_validator_state.json  ~/.crossfid/priv_validator_state.json</code></pre>
  <button class="copy-btn" data-target="cp ~/.crossfid/data/priv_validator_state.json  ~/.crossfid/priv_validator_state.json"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>crossfid tendermint unsafe-reset-all --home $HOME/.crossfid --keep-addr-book</code></pre>
  <button class="copy-btn" data-target="crossfid tendermint unsafe-reset-all --home $HOME/.crossfid --keep-addr-book"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>curl https://snapshot.sychonix.com/mainnet/crossfi/crossfi-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.crossfid</code></pre>
  <button class="copy-btn" data-target="curl https://snapshot.sychonix.com/mainnet/crossfi/crossfi-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.crossfid"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>mv $HOME/.crossfid/priv_validator_state.json.backup $HOME/.crossfid/data/priv_validator_state.json</code></pre>
  <button class="copy-btn" data-target="mv $HOME/.crossfid/priv_validator_state.json.backup $HOME/.crossfid/data/priv_validator_state.json"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart crossfid && sudo journalctl -u crossfid -f -o cat</code></pre>
  <button class="copy-btn" data-target="sudo systemctl restart crossfid && sudo journalctl -u crossfid -f -o cat"><i class="fas fa-copy"></i></button>
</div>
