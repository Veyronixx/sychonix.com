---

title: CLI Cheatsheet
network: 
icon: viper
chain: 
version: 
---

- Check Node Status

<div class="code-block-wrapper">
  <pre><code>curl http://127.0.0.1:26657/status</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Check Block Height

<div class="code-block-wrapper">
  <pre><code>viper network query current-height</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Check Balance

<div class="code-block-wrapper">
  <pre><code>viper wallet query account-balance &lt;address&gt;</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Stake & Create Validator

<div class="code-block-wrapper">
  <pre><code>viper servicers stake self &lt;address&gt; 20000000000 0001 0D02 https://&lt;hostname or ip&gt;:443 testnet</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Check Txhash

<div class="code-block-wrapper">
  <pre><code>viper network query fetch-tx &lt;txhash&gt;</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Check Validator

<div class="code-block-wrapper">
  <pre><code>viper servicers query servicer &lt;address&gt;</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Backup Wallet

<div class="code-block-wrapper">
  <pre><code>viper wallet export-encrypted &lt;address&gt;</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>viper wallet export-raw &lt;address&gt;</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Import Wallet

<div class="code-block-wrapper">
  <pre><code>viper wallet import-encrypted &lt;encrypted&gt;</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>viper wallet import-raw &lt;pk&gt;</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- List Validator

<div class="code-block-wrapper">
  <pre><code>curl -sX POST http://127.0.0.1:8082/v1/query/servicers|jq '.result[].node_url'</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Update Binary

<div class="code-block-wrapper">
  <pre><code>cd ~/viper-network
sudo systemctl stop viper.service
cd viper-binaries
sudo git pull origin main
sudo cp viper_linux_amd64 /usr/local/bin/viper
sudo systemctl restart viper.service</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<div class="code-block-wrapper">
  <pre><code>viper network version</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Error Exit Code

<div class="code-block-wrapper">
  <pre><code>cd ~/.viper
rm -r data
rm -r viper_evidence.db
rm -r viper_result.db
sudo git clone https://github.com/vishruthsk/data.git data
cd config
rm addrbook.json
sudo systemctl restart viper.service
journalctl -u viper -f</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
