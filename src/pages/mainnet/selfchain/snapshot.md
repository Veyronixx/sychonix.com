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
      const response = await fetch('https://snapshot.sychonix.com/mainnet/selfchain/log.json');
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
  <pre><code>curl https://snapshot.sychonix.com/mainnet/selfchain/selfchain-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.selfchain</code></pre>
  <button class="copy-btn" data-target="curl https://snapshot.sychonix.com/mainnet/selfchain/selfchain-snapshot.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.selfchain"><i class="fas fa-copy"></i></button>
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
