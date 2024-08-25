---
title: Snapshot
layout: '~/layouts/TestnetLayout.astro'
network: 
chain id : 
icon: selfchain
---

- Stop Service

<div class="code-block-wrapper">
  <pre><code>sudo systemctl stop selfchain</code></pre>
  <button class="copy-btn" data-target="sudo systemctl stop selfchain"><i class="fas fa-copy"></i></button>
</div>

- Back up priv_validator_state.json

<div class="code-block-wrapper">
  <pre><code>cp ~/.selfchain/data/priv_validator_state.json  ~/.selfchain/priv_validator_state.json</code></pre>
  <button class="copy-btn" data-target="cp ~/.selfchain/data/priv_validator_state.json  ~/.selfchain/priv_validator_state.json"><i class="fas fa-copy"></i></button>
</div>

- Reset State

<div class="code-block-wrapper">
  <pre><code>selfchain tendermint unsafe-reset-all --home $HOME/.selfchain --keep-addr-book</code></pre>
  <button class="copy-btn" data-target="selfchain tendermint unsafe-reset-all --home $HOME/.selfchain --keep-addr-book"><i class="fas fa-copy"></i></button>
</div>

- Download Snapshot

<div class="code-block-wrapper">
  <pre><code>curl https://snapshot.sychonix.com/selfchain/selfchain-latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.selfchain</code></pre>
  <button class="copy-btn" data-target="curl https://snapshot.sychonix.com/selfchain/selfchain-latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.selfchain"><i class="fas fa-copy"></i></button>
</div>

- Restore Backup

<div class="code-block-wrapper">
  <pre><code>mv $HOME/.selfchain/priv_validator_state.json.backup $HOME/.selfchain/data/priv_validator_state.json</code></pre>
  <button class="copy-btn" data-target="mv $HOME/.selfchain/priv_validator_state.json.backup $HOME/.selfchain/data/priv_validator_state.json"><i class="fas fa-copy"></i></button>
</div>

- Restart Service

<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart selfchaind && sudo journalctl -u selfchaind -f -o cat</code></pre>
  <button class="copy-btn" data-target="sudo systemctl restart selfchaind && sudo journalctl -u selfchaind -f -o cat"><i class="fas fa-copy"></i></button>
</div>
