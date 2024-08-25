---
title: Snapshot
layout: '~/layouts/TestnetLayout.astro'
network: 
chain id : 
icon: crossfi
---


- Stop Service

<div class="code-block-wrapper">
  <pre><code>sudo systemctl stop crossfid</code></pre>
  <button class="copy-btn" data-target="sudo systemctl stop crossfid"><i class="fas fa-copy"></i></button>
</div>

- Back up priv_validator_state.json

<div class="code-block-wrapper">
  <pre><code>cp ~/.mineplex-chain/data/priv_validator_state.json  ~/.mineplex-chain/priv_validator_state.json</code></pre>
  <button class="copy-btn" data-target="cp ~/.mineplex-chain/data/priv_validator_state.json  ~/.mineplex-chain/priv_validator_state.json"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>crossfid tendermint unsafe-reset-all --home $HOME/.mineplex-chain --keep-addr-book</code></pre>
  <button class="copy-btn" data-target="crossfid tendermint unsafe-reset-all --home $HOME/.mineplex-chain --keep-addr-book"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>curl https://snapshot.sychonix.com/crossfi/crossfi-latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.mineplex-chain</code></pre>
  <button class="copy-btn" data-target="curl https://snapshot.sychonix.com/crossfi/crossfi-latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.mineplex-chain"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>mv $HOME/.mineplex-chain/priv_validator_state.json.backup $HOME/.mineplex-chain/data/priv_validator_state.json</code></pre>
  <button class="copy-btn" data-target="mv $HOME/.mineplex-chain/priv_validator_state.json.backup $HOME/.mineplex-chain/data/priv_validator_state.json"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart crossfid && sudo journalctl -u crossfid -f -o cat</code></pre>
  <button class="copy-btn" data-target="sudo systemctl restart crossfid && sudo journalctl -u crossfid -f -o cat"><i class="fas fa-copy"></i></button>
</div>
