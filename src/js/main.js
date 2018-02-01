import jQuery     from 'jquery';
import Ethereum   from './utilities/ethereum';
import QR         from 'qrious';

const networks = [
  { id: '1', name: 'main' },
  { id: '42', name: 'kovan' },
  { id: '4', name: 'rinkeby' },
  { id: '3', name: 'ropsten' },
];

const app = {
  account: undefined,
  interval: undefined,
  token: undefined,
  airdrop: undefined,
  decimals: undefined,
  balance: undefined,
  canDisburseMultipleTimes: undefined,
  previousDisbursement: undefined,
  explorerFormatString: undefined,
  start: function () {
    
    const networkId = Ethereum.getWeb3().network,
          networkName = networks.find(function (network) { return network.id == networkId;});
        
    if (networkName === 'main' || networkName === undefined) {
      this.explorerFormatString = 'https://etherscan.io';
    } else {
      this.explorerFormatString = `https://${networkName}.etherscan.io`;
    }

    this.setAccount(this);
    // accounts can change, 
    (function (context) {
      context.interval = window.setInterval(context.setAccount, 5000, context);
    })(this);

    this.token = Ethereum.getOriginalTokenContract();
    this.airdrop = Ethereum.getAirdropCampaignContract();

    // get balance
    this.setBalance(this, this.token);

    // get the airdrop campaign rules
    (function (context, airdrop) {
      airdrop.deployed()
      .then(function (instance) {
        return instance.canDisburseMultipleTimes.call()
          .then(function (canDisburseMultipleTimes) {
            context.canDisburseMultipleTimes = canDisburseMultipleTimes;
            return instance.disbursements.call(context.account);
          })
          .then(function (previousDisbursement) {
            context.previousDisbursement = previousDisbursement.toNumber();
            return instance;
          });
      })
      .then(function (instance) {
        if (!context.canDisburseMultipleTimes && context.previousDisbursement > 0) {
          jQuery(context.display.previousRegistrationAlert).removeClass('d-none');
          jQuery(context.display.registrationButton).attr('disabled', true);
        }
      })
      .catch(function (e) {
        context.setFailure(e);
      });
    })(this, this.airdrop);

    this.bindDomEvents();
    this.bindWeb3Events();
  },
  bindDomEvents: function () {
    jQuery(document).on('click', this.display.registrationButton, this, this.register);
  },
  bindWeb3Events: function () {
  },
  register: function (event) {
    event.preventDefault();
    if (event.stopPropagation) event.stopPropagation();

    const context = event.data;
    context.airdrop.deployed()
      .then(function (instance) {
        return instance.register({ from: context.account })
        .then(function (tx) {
          if (tx.status) {
            jQuery(context.display.successAlert).removeClass('d-none');
          } else {
            jQuery(context.display.registrationFailureAlert).removeClass('d-none');
          }
        });
      })
      .catch(function (e) {
          context.setFailure(e);
      });
  },
  setAccount: function (context) {
    const accountCandidate = Ethereum.getWeb3().eth.accounts[0];

    if (context.account !== accountCandidate) {
      console.log(`account changing from \'${context.account}\' to \'${accountCandidate}\'`);
      context.account = accountCandidate;
      const qr = new QR({ value: `ethereum:${context.account}` });
      jQuery(context.display.qr).attr('src', qr.toDataURL());
      jQuery(context.display.account).text(context.account);

      if (context.token) {
        context.setBalance(context, context.token);
      }
    }
  },
  setBalance: function (context, token) {
    token.deployed()
    .then(function (instance) {
      return instance.decimals.call()
      .then(function (bigDecimals) {
        context.decimals = bigDecimals.toNumber();
        return instance;
      });
    })
    .then(function (instance) {
      return instance.balanceOf.call(context.account);
    })
    .then(function (bigBalance) {
      const balance = bigBalance.toNumber();
      jQuery(context.display.balance).text(balance * Math.pow(10, -1 * (context.decimals || 18)));
    })
    .catch(function (e) {
      context.setFailure(e);
    });
  },
  setFailure: function (e) {
    const failureMessage = jQuery(this.display.failureAlertMessage),
          failureAlert   = jQuery(this.display.failureAlert);

    
    failureMessage.text(e.message || e);
    failureAlert.removeClass('d-none');
    throw e;
  },
  display: {
    qr: 'img.qr',
    account: '.account',
    balance: '.balance',
    previousRegistrationAlert: '.registered',
    registrationButton: 'a.get-coins',
    registrationFailureAlert: 'div.alert.registration-failure',
    explorerLink: 'a.explorer',
    failureAlert: 'div.alert.failure',
    failureAlertMessage: 'span.failure-message',
    successAlert: 'div.alert-success'
  }
};


jQuery(document).ready(function() {
  app.start();
});
