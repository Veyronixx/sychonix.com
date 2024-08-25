---
title: Snapshot
layout: '~/layouts/TestnetLayout.astro'
icon: warden
---

- Stop Service 

<div class="code-block-wrapper">
  <pre><code>sudo systemctl stop wardend</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Back up priv_validator_state.json 

<div class="code-block-wrapper">
  <pre><code>cp ~/.warden/data/priv_validator_state.json  ~/.warden/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>wardend tendermint unsafe-reset-all --home $HOME/.warden --keep-addr-book</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>curl https://snapshot.sychonix.com/symphony/symphony-latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.warden</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>mv $HOME/.warden/priv_validator_state.json.backup $HOME/.warden/data/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart wardend && sudo journalctl -u wardend -f -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
