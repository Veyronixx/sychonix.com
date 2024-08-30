---
layout: '~/layouts/copybutton.astro'
icon : crossfi
---
<!-- saya mau menggunakan const detail ini
node name and icon : crossfi
chain id : crossfi-evm-testnet-1
Binary Name : crossfid
Binary Home : $HOME/.mineplex-chain
Staking Denom : mpx
systemd name : crossfid 
-->

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

<div class="cheat-sheet-container">
<h3 for="iwallet">Wallet Management</h3>
<div class="input-group">
  <input id="iwallet" type="text" placeholder="Enter wallet name" oninput="updatePre()" />
</div>

<label for="iwallet" style="vertical-align: top;"> Create New Wallet</label>
<div class="pre-container">
  <pre class="my-pre" id="pre1" style="margin-top: 5px;">crossfid keys add <span class="rwallet1"></span></pre>
  <button class="copy-btn" id="copy1" data-clipboard-text="" onclick="copyText(1)"></button>
</div>

<label for="iwallet" style="vertical-align: top;"> Recovery New Wallet</label>
<div class="pre-container">
  <pre class="my-pre" id="pre2" style="margin-top: 5px;">crossfid keys add <span class="rwallet2"></span> --recover</pre>
  <button class="copy-btn" id="copy2" data-clipboard-text="" onclick="copyText(2)"></button>
</div>

<label for="iwallet" style="vertical-align: top;"> List All Wallet</label>
<div class="pre-container">
  <pre class="my-pre" id="pre3" style="margin-top: 5px;">crossfid keys list <span class="rwallet3"></span></pre>
  <button class="copy-btn" id="copy3" data-clipboard-text="" onclick="copyText(3)"></button>
</div>

<label for="iwallet" style="vertical-align: top;"> Delete Wallet</label>
<div class="pre-container">
  <pre class="my-pre" id="pre4">crossfid keys delete <span class="rwallet4"></span></pre>
  <button class="copy-btn" id="copy4" data-clipboard-text="" onclick="copyText(4)"></button>
</div>

<label for="iwallet" style="vertical-align: top;"> Export Wallet</label>
<div class="pre-container">
  <pre class="my-pre" id="pre5">crossfid keys export <span class="rwallet5"></span></pre>
  <button class="copy-btn" id="copy5" data-clipboard-text="" onclick="copyText(5)"></button>
</div>


<label for="iwallet" style="vertical-align: top;"> Import key</label>
<div class="pre-container">
<pre class="my-pre" id="pre6">crossfid keys import <span class="rwallet6"></span>.backup</pre>
  <button class="copy-btn" class="copy-btn" id="copy6" data-clipboard-text="" onclick="copyText(6)"></button>
</div>

<label for="iwallet" style="vertical-align: top;"> Check balance</label>
<div class="pre-container">
  <pre class="my-pre" id="pre7">crossfid q bank balances $(crossfid keys show <span class="rwallet7"></span> -a)</pre>
  <button class="copy-btn" id="copy7" data-clipboard-text="" onclick="copyText(7)"></button>
</div>


<h3 for="imoniker">Validator Management</h3>
<label for="ivalidator" style="vertical-align: top;"> Create New Validator</label>
<div class="input-row">
  <!-- Col 1 -->
  <div class="input-col">
    <div class="input-group">
      <label for="imoniker">Moniker</label>
      <input id="imoniker" type="text" placeholder="Enter Moniker" oninput="updatePre()" />
    </div>
    <div class="input-group">
      <label for="iidentity">Identity</label>
      <input id="iidentity" type="text" placeholder="Enter Identity" oninput="updatePre()" />
    </div>
    <div class="input-group">
      <label for="idetails">Details</label>
      <input id="idetails" type="text" placeholder="Enter Details" oninput="updatePre()" />
    </div>
  </div>
  <!-- Col 2 -->
  <div class="input-col">
    <div class="input-group">
      <label for="iwebsite">Website</label>
      <input id="iwebsite" type="text" placeholder="Enter Website" oninput="updatePre()" />
    </div>
    <div class="input-group">
      <label for="icontact">Contact</label>
      <input id="icontact" type="text" placeholder="Enter Contact" oninput="updatePre()" />
    </div>
    <div class="input-group">
      <label for="iamount">Amount</label>
      <input id="iamount" type="text" placeholder="Enter Amount" oninput="updatePre()" />
    </div>
    <div class="input-group">
      <label for="icommission">Commission</label>
      <input id="icommission" type="text" placeholder="Enter Commission" oninput="updatePre()" />
    </div>
  </div>
</div>

<!-- Wrap the <pre> and button in a new container -->
<div class="pre-container">
  <pre class="my-pre" id="pre8">
crossfid tx staking create-validator \
--amount=<span class="ramount1"></span>0000000mpx \
--moniker="<span class="rmoniker1"></span>" \
--pubkey=$(crossfid tendermint show-validator) \
--identity="<span class="ridentity1"></span>" \
--details="<span class="rdetails1"></span>" \
--website="<span class="rwebsite1"></span>" \
--security-contact=<span class="rcontact1"></span> \
--chain-id=crossfi-evm-testnet-1 \
--commission-rate=<span class="rcommission1"></span> \
--commission-max-rate=0.20 \
--commission-max-change-rate=0.01 \
--min-self-delegation=1 \
--from=<span class="rwallet8"></span> \
--gas=auto  \
--gas-prices="0mpx"</pre>
  <button class="copy-btn" id="copy8" data-clipboard-text="" onclick="copyText(8)"></button>


<label for="imoniker"> Edit Validator</label>
<div class="container">
  <div class="input-group">
    <label for="ieditmoniker">New Moniker</label>
    <input id="ieditmoniker" type="text" placeholder="Enter New Moniker" oninput="updatePre()" />
  </div>
  <div class="input-group">
    <label for="ieditidentity">New identity</label>
    <input id="ieditidentity" type="text" placeholder="Enter New identity" oninput="updatePre()" />
  </div>
  <div class="input-group">
    <label for="ieditdetails">New Details</label>
    <input id="ieditdetails" type="text" placeholder="Enter New Details" oninput="updatePre()" />
  </div>
  <div class="input-group">
    <label for="ieditweb">New Website</label>
    <input id="ieditweb" type="text" placeholder="Enter New Website" oninput="updatePre()" />
  </div>
</div>

<div class="pre-container">
<pre class="my-pre" id="pre9">
crossfid tx staking edit-validator \
--new-moniker="<span class="reditmoniker1"></span>" \
--identity="<span class="reditidentity1"></span>" \
--details="<span class="reditdetails1"></span>" \
--website="<span class="reditweb1"></span>" \
--chain-id=crossfi-evm-testnet-1 \
--commission-rate=0.07 \
--from=<span class="rwallet9"></span> \
--gas=auto  \
--gas-prices="0mpx"  </pre>
  <button class="copy-btn" id="copy8" data-clipboard-text="" onclick="copyText(8)"></button>
</div>

<label for="iwallet" style="vertical-align: top;"> Unjail Validator</label>
<div class="pre-container">
  <pre class="my-pre" id="pre10">crossfid tx slashing unjail --from <span class="rwallet10"></span> --chain-id crossfi-evm-testnet-1 --gas-prices 0.00025mpx --gas-adjustment 1.5 --gas auto -y</pre>
  <button class="copy-btn" id="copy10" data-clipboard-text="" onclick="copyText(10)"></button>
</div>

<label for="iwallet" style="vertical-align: top;"> Jail Reason</label>
<div class="pre-container">
  <pre class="my-pre" id="pre11">crossfid query slashing signing-info $(crossfid tendermint show-validator)</pre>
  <button class="copy-btn" id="copy11" data-clipboard-text="" onclick="copyText(11)"></button>
</div>

<label for="iwallet" style="vertical-align: top;"> View validator details</label>
<div class="pre-container">
  <pre class="my-pre" id="pre12">crossfid q staking validator $(crossfid keys show <span class="rwallet11"></span> --bech val -a)</pre>
  <button class="copy-btn" id="copy12" data-clipboard-text="" onclick="copyText(12)"></button>
</div>

<label> Get Denom Info</label>
<div class="pre-container">
  <pre class="my-pre" id="pre23">crossfid q bank denom-metadata -oj | jq</pre>
  <button class="copy-btn" id="copy23" data-clipboard-text="" onclick="copyText(23)"></button>
</div>

<label> Get Sync Status</label>
<div class="pre-container">
  <pre class="my-pre" id="pre24">crossfid status 2>&1 | jq -r '.SyncInfo.catching_up // .sync_info.catching_up'</pre>
  <button class="copy-btn" id="copy24" data-clipboard-text="" onclick="copyText(24)"></button>
</div>

<label> Get Latest Height</label>
<div class="pre-container">
  <pre class="my-pre" id="pre25">crossfid status 2>&1 | jq -r '.SyncInfo.latest_block_height // .sync_info.latest_block_height'</pre>
  <button class="copy-btn" id="copy25" data-clipboard-text="" onclick="copyText(25)"></button>
</div>

<h3 for="imoniker">Token Management</h3>

<label for="ivalidator" style="vertical-align: top;"> Withdraw rewards from all validators</label>
<div class="pre-container">
  <pre class="my-pre" id="pre13">crossfid tx distribution withdraw-all-rewards --from <span class="rwallet12"></span> --chain-id crossfi-evm-testnet-1 --gas=auto  --gas-prices="0mpx"</pre>
  <button class="copy-btn" id="copy13" data-clipboard-text="" onclick="copyText(13)"></button>
</div>

<label for="ivalidator" style="vertical-align: top;"> Withdraw commission and rewards from your validator</label>
<div class="pre-container">
  <pre class="my-pre" id="pre14">crossfid tx distribution withdraw-rewards $(crossfid keys show <span class="rwallet13"></span> --bech val -a) --commission --from <span class="rwallet14"></span> --chain-id crossfi-evm-testnet-1 --gas=auto --gas-prices="0mpx"</pre>
  <button class="copy-btn" id="copy14" data-clipboard-text="" onclick="copyText(14)"></button>
</div>


<div class="input-group">

<label for="idelegete" style="vertical-align: top;"> Delegate tokens to yourself</label>
<div class="input-group">
  <input id="idelegete" type="text" placeholder="Enter Amount" oninput="updatePre()" />
</div>
<div class="pre-container">
  <pre class="my-pre" id="pre15" style="margin-top: 5px;">crossfid tx staking delegate $(crossfid keys show <span class="rwallet15"></span> --bech val -a) <span class="rdelegete1"></span>00000000mpx --from <span class="rwallet16"></span> --chain-id crossfi-evm-testnet-1 --gas=auto --gas-prices="0mpx"</pre>
  <button class="copy-btn" id="copy15" data-clipboard-text="" onclick="copyText(15)"></button>
</div>


<label for="iredelegete" style="vertical-align: top;"> Redelegate tokens to another validator</label>
<div class="input-group">
  <input id="iredelegete" type="text" placeholder="Enter <TO_VALOPER_ADDRESS>" oninput="updatePre()" />
</div>
<div class="pre-container">
  <pre class="my-pre" id="pre16" style="margin-top: 5px;">crossfid tx staking redelegate $(crossfid keys show <span class="rwallet17"></span> --bech val -a) <span class="rredelegete1"></span> <span class="rdelegete2"></span>00000000mpx --from <span class="rwallet18"></span> --chain-id crossfi-evm-testnet-1 --gas=auto --gas-prices="0mpx"</pre>
  <button class="copy-btn" id="copy16" data-clipboard-text="" onclick="copyText(16)"></button>
</div>


<label for="iredelegete" style="vertical-align: top;"> Delegate tokens to validator</label>
<div class="pre-container">
  <pre class="my-pre" id="pre17" style="margin-top: 5px;">crossfid tx staking delegate <span class="rredelegete2"></span> <span class="rdelegete3"></span>00000000mpx --from <span class="rwallet19"></span> --chain-id crossfi-evm-testnet-1 --gas=auto --gas-prices="0mpx"</pre>
  <button class="copy-btn" id="copy17" data-clipboard-text="" onclick="copyText(17)"></button>
</div>


<label for="iredelegete" style="vertical-align: top;"> Unbond tokens from your validator</label>
<div class="pre-container">
  <pre class="my-pre" id="pre18" style="margin-top: 5px;">crossfid tx staking unbond $(crossfid keys show <span class="rwallet20"></span> --bech val -a) <span class="rdelegete4"></span>00000000mpx --from <span class="rwallet21"></span> --chain-id crossfi-evm-testnet-1 --gas=auto --gas-prices="0mpx"</pre>
  <button class="copy-btn" id="copy18" data-clipboard-text="" onclick="copyText(18)"></button>
</div>



<label for="idelegete" style="vertical-align: top;"> Send tokens to Any wallet</label>
<div class="input-group">
  <input id="itoken" type="text" placeholder="Enter Address Wallet" oninput="updatePre()" />
</div>
<div class="pre-container">
  <pre class="my-pre" id="pre19" style="margin-top: 5px;">crossfid tx bank send <span class="rwallet22"></span> <span class="rtoken1"></span> <span class="rdelegete5"></span>000000000mpx --from <span class="rwallet23"></span> --chain-id crossfi-evm-testnet-1 --gas=auto --gas-prices="0mpx"</pre>
  <button class="copy-btn" id="copy19" data-clipboard-text="" onclick="copyText(19)"></button>
</div>

<div class="cheat-sheet-container">
<h3 for="iwallet">Service Management</h3>

<label> Reload Services</label>
<div class="pre-container">
  <pre class="my-pre" id="pre26">sudo systemctl daemon-reload</pre>
  <button class="copy-btn" id="copy26" data-clipboard-text="" onclick="copyText(26)"></button>
</div>

<label> Enable Service</label>
<div class="pre-container">
  <pre class="my-pre" id="pre27">sudo systemctl enable crossfid</pre>
  <button class="copy-btn" id="copy27" data-clipboard-text="" onclick="copyText(27)"></button>
</div>

<label> Disable Service</label>
<div class="pre-container">
  <pre class="my-pre" id="pre28">sudo systemctl disable crossfid</pre>
  <button class="copy-btn" id="copy28" data-clipboard-text="" onclick="copyText(28)"></button>
</div>

<label> Run Service</label>
<div class="pre-container">
  <pre class="my-pre" id="pre29">sudo systemctl start crossfid</pre>
  <button class="copy-btn" id="copy29" data-clipboard-text="" onclick="copyText(29)"></button>
</div>

<label> Stop Service</label>
<div class="pre-container">
  <pre class="my-pre" id="pre30">sudo systemctl stop crossfid</pre>
  <button class="copy-btn" id="copy30" data-clipboard-text="" onclick="copyText(30)"></button>
</div>

<label> Restart Service</label>
<div class="pre-container">
  <pre class="my-pre" id="pre31">sudo systemctl restart crossfid</pre>
  <button class="copy-btn" id="copy31" data-clipboard-text="" onclick="copyText(31)"></button>
</div>

<label> Check Service Status</label>
<div class="pre-container">
  <pre class="my-pre" id="pre32">sudo systemctl status crossfid</pre>
  <button class="copy-btn" id="copy32" data-clipboard-text="" onclick="copyText(32)"></button>
</div>

<label> Check Service Logs</label>
<div class="pre-container">
  <pre class="my-pre" id="pre33">sudo journalctl -u crossfid -f --no-hostname -o cat</pre>
  <button class="copy-btn" id="copy33" data-clipboard-text="" onclick="copyText(33)"></button>
</div>

<label> Custom Port</label>
<div class="input-group">
  <input id="iport" type="text" placeholder="Enter Custom Port" oninput="updatePre()" />
</div>
<div class="pre-container">
  <pre class="my-pre" id="pre20" style="margin-top: 5px;">CUSTOM_PORT=<span class="rport1"></span>
sed -i.bak -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:${CUSTOM_PORT}658\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:${CUSTOM_PORT}657\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:${CUSTOM_PORT}060\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:${CUSTOM_PORT}656\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":${CUSTOM_PORT}660\"%" $HOME/.mineplex-chain/config/config.toml
sed -i.bak -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:${CUSTOM_PORT}317\"%; s%^address = \":8080\"%address = \":${CUSTOM_PORT}080\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:${CUSTOM_PORT}090\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:${CUSTOM_PORT}091\"%" $HOME/.mineplex-chain/config/app.toml</pre>
  <button class="copy-btn" id="copy20" data-clipboard-text="" onclick="copyText(20)"></button>
</div>

<label> Remove Node</label>
<div class="pre-container">
  <pre class="my-pre" id="pre21">sudo systemctl stop crossfid && sudo systemctl disable crossfid && sudo rm /etc/systemd/system/crossfid.service && sudo systemctl daemon-reload && rm -rf $HOME/.mineplex-chain && rm -rf crossfi-evm-testnet-1 && sudo rm -rf $(which crossfid)</pre>
  <button class="copy-btn" id="copy21" data-clipboard-text="" onclick="copyText(21)"></button>
</div>



<script>
  function updatePre() {
    const walletInput = document.getElementById('iwallet').value.trim();
    document.querySelector('.rwallet1').textContent = walletInput;
    document.querySelector('.rwallet2').textContent = walletInput;
    document.querySelector('.rwallet3').textContent = walletInput;
    document.querySelector('.rwallet4').textContent = walletInput;
    document.querySelector('.rwallet5').textContent = walletInput;
    document.querySelector('.rwallet6').textContent = walletInput;
    document.querySelector('.rwallet7').textContent = walletInput;
    document.querySelector('.rwallet8').textContent = walletInput;
    document.querySelector('.rwallet9').textContent = walletInput;
    document.querySelector('.rwallet10').textContent = walletInput;
    document.querySelector('.rwallet11').textContent = walletInput;
    document.querySelector('.rwallet12').textContent = walletInput;
    document.querySelector('.rwallet13').textContent = walletInput;
    document.querySelector('.rwallet14').textContent = walletInput;
     document.querySelector('.rwallet15').textContent = walletInput;
      document.querySelector('.rwallet16').textContent = walletInput;
        document.querySelector('.rwallet17').textContent = walletInput;
          document.querySelector('.rwallet18').textContent = walletInput;
          document.querySelector('.rwallet19').textContent = walletInput;
          document.querySelector('.rwallet20').textContent = walletInput;
          document.querySelector('.rwallet21').textContent = walletInput;
          document.querySelector('.rwallet22').textContent = walletInput;
          document.querySelector('.rwallet23').textContent = walletInput;

    const monikerInput = document.getElementById('imoniker').value.trim();
    document.querySelector('.rmoniker1').textContent = monikerInput;

     const identityInput = document.getElementById('iidentity').value.trim();
    document.querySelector('.ridentity1').textContent = identityInput;
   
   const detailsInput = document.getElementById('idetails').value.trim();
    document.querySelector('.rdetails1').textContent = detailsInput;

    const websiteInput = document.getElementById('iwebsite').value.trim();
    document.querySelector('.rwebsite1').textContent = websiteInput;

    const contactInput = document.getElementById('icontact').value.trim();
    document.querySelector('.rcontact1').textContent = contactInput;

    const amountInput = document.getElementById('iamount').value.trim();
    document.querySelector('.ramount1').textContent = amountInput;
    
    const commissionInput = document.getElementById('icommission').value.trim();
    document.querySelector('.rcommission1').textContent = commissionInput;

    const editmonikerInput = document.getElementById('ieditmoniker').value.trim();
    document.querySelector('.reditmoniker1').textContent = editmonikerInput;
    
    const editidentityInput = document.getElementById('ieditidentity').value.trim();
    document.querySelector('.reditidentity1').textContent = editidentityInput;

     const editdetailsInput = document.getElementById('ieditdetails').value.trim();
    document.querySelector('.reditdetails1').textContent = editdetailsInput;

    const editwebInput = document.getElementById('ieditweb').value.trim();
    document.querySelector('.reditweb1').textContent = editwebInput;

    const delegeteInput = document.getElementById('idelegete').value.trim();
    document.querySelector('.rdelegete1').textContent = delegeteInput;
      document.querySelector('.rdelegete2').textContent = delegeteInput;
document.querySelector('.rdelegete3').textContent = delegeteInput;
document.querySelector('.rdelegete4').textContent = delegeteInput;
document.querySelector('.rdelegete5').textContent = delegeteInput;
    const redelegeteInput = document.getElementById('iredelegete').value.trim();
    document.querySelector('.rredelegete1').textContent = redelegeteInput;
       document.querySelector('.rredelegete2').textContent = redelegeteInput;

const tokenInput = document.getElementById('itoken').value.trim();
    document.querySelector('.rtoken1').textContent = tokenInput;

    const portInput = document.getElementById('iport').value.trim();
    document.querySelector('.rport1').textContent = portInput;
  }

function copyText(preIndex) {
  const preElement = document.querySelector(`#pre${preIndex}`);
  const button = document.querySelector(`#copy${preIndex}`);

  navigator.clipboard.writeText(preElement.textContent)
    .then(() => {
      button.classList.add('show-check');
      setTimeout(() => {
        button.classList.remove('show-check');
      }, 2000);
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
      const range = document.createRange();
      range.selectNode(preElement);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      button.classList.add('show-check');
      setTimeout(() => {
        button.classList.remove('show-check');
      }, 2000);
    });
}
</script>
<style>
  /* Container Styles */
  .cheat-sheet-container {
  position: relative; /* Container for positioning the button */
  max-width: 100%; /* Prevents the container from expanding beyond its parent */
}

  /* Preformatted Text and Copy Button */
.cheat-sheet-container .my-pre {
  position: relative; /* Ensure the pre block is the reference point */
  overflow: auto; /* Enable scrolling if the content is too wide */
  padding-top: 2rem; /* Adjust padding to accommodate the button */
}
.cheat-sheet-container label {
  display: block !important; /* Make label block-level to occupy the full width */
  margin-bottom: -1.2rem !important; /* Add space between label and pre */
  font-size: 0.875rem !important; /* Font size similar to the example image */
  color: #e5e5e5 !important; /* Text color for labels */
  margin-left: 0.1rem !important; /* Align left with a bit of indentation */
}
/* Adjust spacing for the specific label 'Create New Validator' */
.cheat-sheet-container label[for="ivalidator"] {
  margin-bottom: 0 !important; /* Remove bottom margin */
  margin-top: 0 !important; /* Remove top margin to move it up */
  padding: 0 !important; /* Remove any padding */
}

.cheat-sheet-container .copy-btn {
  position: absolute; /* Position relative to the nearest positioned ancestor */
  top: 0.5rem; /* Align to the top of the pre element */
  right: 0.5rem; /* Align to the right of the pre element */
  background-color: #1f2937;
  color: white;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Ensure the button is above the text */
}

  .cheat-sheet-container .copy-btn:before {
    content: '\f0c5'; /* Copy icon code from Font Awesome */
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
  }

  .cheat-sheet-container .copy-btn.show-check:before {
    content: '\f00c'; /* Check icon code from Font Awesome */
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
  }

  .cheat-sheet-container .copy-btn.hidden {
    display: none;
  }

  .cheat-sheet-container .copy-btn i {
    font-size: 0.75rem;
  }

  /* Input Row and Column Layout */
  .cheat-sheet-container .input-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .cheat-sheet-container .input-col {
    width: 48%;
  }

  .cheat-sheet-container .input-moci {
    width: calc(50% - 20px);
    margin-bottom: 20px;
  }

  /* Input Group Styles */
  .cheat-sheet-container .input-group {
    margin-bottom: 20px;
  }

  .cheat-sheet-container .input-group label,
  .cheat-sheet-container .input-moci label {
    display: block;
    margin-bottom: 5px;
  }

  .cheat-sheet-container .input-group input,
  .cheat-sheet-container .input-moci input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 0.5rem; /* 8px */
    font-size: 13px;
  }

  .cheat-sheet-container .input-group input {
    background-color: #0f172a;
  }

  .cheat-sheet-container .input-group input:focus {
    outline: none;
    border-color: rgb(0, 0, 0);
  }

  .cheat-sheet-container .input-group input::placeholder {
    color: #cbd5e1; /* Placeholder text color */
    font-size: 13px; /* Placeholder text size */
  }

  /* Popup Styles */
  .cheat-sheet-container .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-color: rgb(45, 212, 191);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .cheat-sheet-container .popup-content {
    background-color: black;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    font-size: 16px;
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
  }

  .cheat-sheet-container .closebtn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
/* New Container for <pre> and Button */
.pre-container {
  position: relative; /* Container for positioning the button */
  max-width: 100%; /* Prevents the container from expanding beyond its parent */
}

.pre-container .my-pre {
  overflow-x: auto; /* Enables horizontal scrolling if the content is too wide */
  white-space: pre-wrap; /* Maintains formatting and prevents text wrapping */
  padding: 0.5rem; /* Adjust padding as needed */
  box-sizing: border-box; /* Ensures padding does not affect size */
  max-width: 100%; /* Prevents <pre> from expanding beyond the container */
  background-color: #0f172a; /* Adds background color for contrast */
  color: white; /* Ensures text is visible on background */
  border-radius: 0.375rem; /* Adds rounded corners */
}

.pre-container .copy-btn {
  position: absolute; /* Absolute position within the container */
  top: 0.5rem; /* Adjust as needed */
  right: 0.5rem; /* Adjust as needed */
  background-color: #1f2937;
  color: white;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Ensure the button is above the text */
}

  /* Header Styles */
  .cheat-sheet-container h3[for="iwallet"],
  .cheat-sheet-container h3[for="imoniker"] {
    color: #e5e5e5; /* Text color */
    font-size: 1.3rem; /* Text size */
  }

  /* Grid Container */
  .cheat-sheet-container .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }
</style>
