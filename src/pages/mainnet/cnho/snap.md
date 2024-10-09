---
title: Snapshot
icon: cnho
---


- Stop Service

<div class="code-block-wrapper">
  <pre><code>sudo systemctl stop cnhod</code></pre>
  <button class="copy-btn" data-target="sudo systemctl stop cnhod"><i class="fas fa-copy"></i></button>
</div>

- Back up priv_validator_state.json

<div class="code-block-wrapper">
  <pre><code>cp ~/.cnho/data/priv_validator_state.json  ~/.cnho/priv_validator_state.json</code></pre>
  <button class="copy-btn" data-target="cp ~/.cnho/data/priv_validator_state.json  ~/.cnho/priv_validator_state.json"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>cnhod tendermint unsafe-reset-all --home $HOME/.cnho --keep-addr-book</code></pre>
  <button class="copy-btn" data-target="cnhod tendermint unsafe-reset-all --home $HOME/.cnho --keep-addr-book"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>curl https://snapshot.sychonix.com/mainnet/cnho/cnho-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.cnho</code></pre>
  <button class="copy-btn" data-target="curl https://snapshot.sychonix.com/mainnet/cnho/cnho-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.cnho"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>mv $HOME/.cnho/priv_validator_state.json.backup $HOME/.cnho/data/priv_validator_state.json</code></pre>
  <button class="copy-btn" data-target="mv $HOME/.cnho/priv_validator_state.json.backup $HOME/.cnho/data/priv_validator_state.json"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart cnhod && sudo journalctl -u cnhod -f -o cat</code></pre>
  <button class="copy-btn" data-target="sudo systemctl restart cnhod && sudo journalctl -u cnhod -f -o cat"><i class="fas fa-copy"></i></button>
</div>
