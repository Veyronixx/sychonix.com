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
  <pre><code>cp ~/.mineplex-chain/data/priv_validator_state.json  ~/.mineplex-chain/priv_validator_state.json</code></pre>
  <button class="copy-btn" data-target="cp ~/.mineplex-chain/data/priv_validator_state.json  ~/.mineplex-chain/priv_validator_state.json"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>cnhod tendermint unsafe-reset-all --home $HOME/.mineplex-chain --keep-addr-book</code></pre>
  <button class="copy-btn" data-target="cnhod tendermint unsafe-reset-all --home $HOME/.mineplex-chain --keep-addr-book"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>curl https://snapshot.sychonix.com/mainnet/cnho/cnho-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.mineplex-chain</code></pre>
  <button class="copy-btn" data-target="curl https://snapshot.sychonix.com/mainnet/cnho/cnho-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.mineplex-chain"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>mv $HOME/.mineplex-chain/priv_validator_state.json.backup $HOME/.mineplex-chain/data/priv_validator_state.json</code></pre>
  <button class="copy-btn" data-target="mv $HOME/.mineplex-chain/priv_validator_state.json.backup $HOME/.mineplex-chain/data/priv_validator_state.json"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart cnhod && sudo journalctl -u cnhod -f -o cat</code></pre>
  <button class="copy-btn" data-target="sudo systemctl restart cnhod && sudo journalctl -u cnhod -f -o cat"><i class="fas fa-copy"></i></button>
</div>
