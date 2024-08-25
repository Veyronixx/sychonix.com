---
title: Snapshot
layout: '~/layouts/TestnetLayout.astro'
icon: fiamma
---

- Stop Service
<div class="code-block-wrapper">
  <pre><code>sudo systemctl stop fiammad</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Back up priv_validator_state.json
<div class="code-block-wrapper">
  <pre><code>cp ~/.fiamma/data/priv_validator_state.json  ~/.fiamma/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>fiammad tendermint unsafe-reset-all --home $HOME/.fiamma --keep-addr-book</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>curl https://snapshot.sychonix.com/fiamma/fiamma-latest.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.fiamma</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>mv $HOME/.fiamma/priv_validator_state.json.backup $HOME/.fiamma/data/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart fiammad && sudo journalctl -u fiammad -f -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
