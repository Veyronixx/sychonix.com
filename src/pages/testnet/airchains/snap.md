---
title: Snapshot
icon: airchains
---


- Stop Service

<div class="code-block-wrapper">
  <pre><code>sudo systemctl stop junctiond</code></pre>
  <button class="copy-btn" data-target="sudo systemctl stop junctiond"><i class="fas fa-copy"></i></button>
</div>

- Back up priv_validator_state.json

<div class="code-block-wrapper">
  <pre><code>cp ~/.junction/data/priv_validator_state.json  ~/.junction/priv_validator_state.json</code></pre>
  <button class="copy-btn" data-target="cp ~/.junction/data/priv_validator_state.json  ~/.junction/priv_validator_state.json"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>junctiond tendermint unsafe-reset-all --home $HOME/.junction --keep-addr-book</code></pre>
  <button class="copy-btn" data-target="junctiond tendermint unsafe-reset-all --home $HOME/.junction --keep-addr-book"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>curl https://snapshot.sychonix.com/testnet/airchains/airchains-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.junction</code></pre>
  <button class="copy-btn" data-target="curl https://snapshot.sychonix.com/testnet/airchains/airchains-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.junction"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>mv $HOME/.junction/priv_validator_state.json.backup $HOME/.junction/data/priv_validator_state.json</code></pre>
  <button class="copy-btn" data-target="mv $HOME/.junction/priv_validator_state.json.backup $HOME/.junction/data/priv_validator_state.json"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart junctiond && sudo journalctl -u junctiond -f -o cat</code></pre>
  <button class="copy-btn" data-target="sudo systemctl restart junctiond && sudo journalctl -u junctiond -f -o cat"><i class="fas fa-copy"></i></button>
</div>
