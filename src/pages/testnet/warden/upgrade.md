---
title: Upgrade
icon: crossfi
---

-  Upgrade to v0.5.3

<div class="code-block-wrapper">
  <pre><code>cd $HOME
wget https://github.com/warden-protocol/wardenprotocol/releases/download/v0.5.3/wardend_Linux_x86_64.zip
unzip wardend_Linux_x86_64.zip
rm -rf wardend_Linux_x86_64.zip
chmod +x wardend
mv wardend $(which wardend)
wardend version --long
sudo systemctl restart wardend && sudo journalctl -u wardend -f -o cat</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
