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
      const response = await fetch('https://snapshot.sychonix.com/testnet/odiseo/log.json');
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

- Stop Service

<div class="code-block-wrapper">
  <pre><code>sudo systemctl stop achillesd</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Back up priv_validator_state.json

<div class="code-block-wrapper">
  <pre><code>cp $HOME/.achilles/data/priv_validator_state.json $HOME/.achilles/priv_validator_state.json.backup</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Reset the data

<div class="code-block-wrapper">
  <pre><code>achillesd tendermint unsafe-reset-all --home $HOME/.achilles --keep-addr-book</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Snapshot

<div class="code-block-wrapper">
  <pre><code>aria2c -x 16 -s 16 -o odiseo-snapshot.tar.lz4 https://snapshot.sychonix.com/testnet/odiseo/odiseo-snapshot.tar.lz4
lz4 -dc odiseo-snapshot.tar.lz4 | tar -xf - -C $HOME/.achilles
rm -v odiseo-snapshot.tar.lz4</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Restore Backup and Restart Service

<div class="code-block-wrapper">
  <pre><code>mv $HOME/.achilles/priv_validator_state.json.backup $HOME/.achilles/data/priv_validator_state.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart achillesd && sudo journalctl -u achillesd -f -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
