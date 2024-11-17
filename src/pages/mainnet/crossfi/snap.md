---
title: Snapshot
---

<!-- Note: Change nodename, Binary, and $HOME/.binary -->

<style>
  .snapshot-info {
    font-size: 18px;
    margin-bottom: 15px;
  }
  .snapshot-info .label {
    color: #ffffff;
  }
  .snapshot-info .value {
    color: #4da6ff;
  }
</style>


<script>
  async function fetchSnapshotInfo() {
    try {
      const response = await fetch('https://snapshot.sychonix.com/mainnet/crossfi/log.json');
      const data = await response.json();
      const snapshotInfo = data.snapshot_info;

      document.getElementById('height').textContent = snapshotInfo.block_height;
      document.getElementById('size').textContent = snapshotInfo.size;

      const createdAt = new Date(snapshotInfo.created_at);
      const now = new Date();
      const timeDiffMs = now - createdAt;

      // Konversi selisih waktu ke jam dan menit
      const minutesAgo = Math.floor(timeDiffMs / (1000 * 60));
      const hours = Math.floor(minutesAgo / 60);
      const minutes = minutesAgo % 60;

      if (hours > 0) {
        document.getElementById('last-updated').textContent = `${hours} hours ${minutes} minutes ago`;
      } else {
        document.getElementById('last-updated').textContent = `${minutes} minutes ago`;
      }
    } catch (error) {
      console.error('Error fetching snapshot info:', error);
    }
  }

  fetchSnapshotInfo();
</script>

<div class="snapshot-info">
  <span class="label">Height:</span> <span class="value" id="height">Loading...</span> |
  <span class="label">Last updated:</span> <span class="value" id="last-updated">Loading...</span> |
  <span class="label">Size:</span> <span class="value" id="size">Loading...</span>
</div>

- Install dependencies, if needed

<div class="code-block-wrapper">
  <pre><code>sudo apt update && sudo apt install aria2</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<!-- Note: Change nodename and $HOME/.binary -->
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
  <pre><code>aria2c -x 16 -s 16 -o - https://snapshot.sychonix.com/mainnet/crossfi/crossfi-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.crossfid</code></pre>
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
