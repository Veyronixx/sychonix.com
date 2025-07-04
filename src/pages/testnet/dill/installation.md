---
title: Installation Node

network: Dill Testnet Andes
icon: dill
---



- Update and install packages
<div class="code-block-wrapper">
  <pre><code>sudo apt update
sudo apt install make clang pkg-config libssl-dev build-essential</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Install and Extract binary
<div class="code-block-wrapper">
  <pre><code>curl -O https://dill-release.s3.ap-southeast-1.amazonaws.com/linux/dill.tar.gz
tar -xzvf dill.tar.gz && cd dill</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Generate validator keys
<div class="code-block-wrapper">
  <pre><code>./dill_validators_gen new-mnemonic --num_validators=1 --chain=andes --folder=./</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Import your keys to your keystore
<div class="code-block-wrapper">
  <pre><code>./dill-node accounts import --andes --wallet-dir ./keystore --keys-dir validator_keys/ --accept-terms-of-use</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<span style="font-size: 20px;">sample output</span>

```
[2024-07-13 08:08:34]  INFO flags: Running on the Andes Beacon Chain Testnet
Password requirements: at least 8 characters
New wallet password:
Confirm password:
[2024-07-13 08:08:39]  INFO wallet: Successfully created new wallet walletPath=/home/ubuntu/dill/keystore
[2024-07-13 08:08:39]  WARN client: You are using an insecure gRPC connection. If you are running your beacon node and validator on the same machines, you can ignore this message. If you want to know how to enable secure connections, see: https://docs.prylabs.network/docs/prysm-usage/secure-grpc
[2024-07-13 08:08:39]  INFO accounts: importing validator keystores...
[2024-07-13 08:08:39]  INFO accounts: checking directory for keystores: /home/ubuntu/dill/validator_keys
Enter the password for your imported accounts:
Importing accounts, this may take a while...
Importing accounts... 100% [===================================================================================]  [1s:0s]
[2024-07-13 08:08:44]  INFO local-keymanager: Reloaded validator keys into keymanager
[2024-07-13 08:08:44]  INFO local-keymanager: Successfully imported validator key(s) pubkeys=0xxxxx
[2024-07-13 08:08:44]  INFO accounts: Imported accounts [xxxxxx], view all of them by running `accounts list`
ubuntu@ip-xxxxx:~/dill$
```

- Start the light validator node
<div class="code-block-wrapper">
  <pre><code>echo {your-password} > walletPw.txt
./start_light.sh -p walletPw.txt</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- The node will output the following when started:
```
Option --pwdfile, argument 'walletPw.txt'
Remaining arguments:
using password file at walletPw.txt
start light node
start light node done
ubuntu@xxxxx:~/dill$ nohup: redirecting stderr to stdout
```

<script>
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('.code-block-wrapper').forEach(wrapper => {
        const button = wrapper.querySelector('.copy-btn');
        const code = wrapper.querySelector('pre code');
    
        if (button && code) {
          button.addEventListener('click', () => {
            // Gunakan navigator.clipboard.writeText untuk metode yang lebih modern
            navigator.clipboard.writeText(code.textContent)
              .then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => button.innerHTML = '<i class="fas fa-copy"></i>', 2000);
              })
              .catch(err => {
                console.error('Failed to copy: ', err);
                // Untuk fallback jika navigator.clipboard.writeText gagal
                const range = document.createRange();
                range.selectNode(code);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => button.innerHTML = '<i class="fas fa-copy"></i>', 2000);
              });
          });
        }
      });
    });
    </script>
