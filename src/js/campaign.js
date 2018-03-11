import React from 'react';
import Header from './header';
import App    from './app';
import QR     from 'qrious';

const transientState = {
  account: 'unknown',
  accountQR: undefined,
  balance: 0,
  network: 'unknown',
  previouslyRegistered: false,
  canDisburseMultipleTimes: false,
  isActive: true,
  waiting: false
}

export default class Campaign extends React.Component {
  constructor () {
    super()
    this.app = new App()
  }

  componentWillMount () {
    this.setState(transientState)


    this.app.getAccount()
      .then((account) => {
        const qr = new QR({ value: `ethereum:${account}` })
        transientState.account = account
        transientState.accountQR = qr.toDataURL()
        this.setState(transientState)
      })
      .catch((e) => {
        transientState.generalFailureMessage = e.message || e
        this.setState(transientState)
      })

    this.app.getHolderAddress()
      .then(holder => {
        this.app.getBalance(holder)
          .then(balanceOfHolder => {
            const compareAmount = this.app.toBigNumber('5e6')
            if (compareAmount.gt(balanceOfHolder)) {
              transientState.isActive = false
              this.setState(transientState)
            }
          })
      })
      .catch((e) => {
        transientState.generalFailureMessage = e.message || e
        this.setState(transientState)
      })

    this.app.on('account:change', (account) => {
      this.app.getBalance(account)
        .then((balance) => {
          transientState.balance = balance.toNumber()
          this.setState(transientState)
        }) 
        .catch((e) => {
          transientState.generalFailureMessage = e.message || e
          this.setState(transientState)
        })

      this.app.getPreviousDisbursment(account)
        .then((previousDisbursement) => {
          if (previousDisbursement.gt(0)) {
            transientState.previouslyRegistered = true
            this.app.getRules()
              .then((canDisburseMultipleTimes) => {
                  transientState.canDisburseMultipleTimes = canDisburseMultipleTimes
                  this.setState(transientState)
                })
          }
          })
          .catch((e) => {
            transientState.generalFailureMessage = e.message || e
            this.setState(transientState)
          })
    })

    this.app.getNetwork()
      .then((network) => {
        transientState.network = network
        this.setState(transientState)
      })
      .catch((e) => {
        transientState.generalFailureMessage = e.message || e
        this.setState(transientState)
      })

    this.app.pollForAccount()
  }

  componentWillUnmount () {
  }

  register () {
    transientState.waiting = true
    this.setState(transientState)

    this.app.register(transientState.account)
    .then((response) => {
      transientState.waiting = false
      
      transientState.registrationFailure = !(transientState.registrationSuccess = response.receipt.status === '0x1') 

      transientState.explorerLink = transientState.network.explorerFormatString + '/tx/' + response.tx
      this.setState(transientState)

      if (transientState.registrationSuccess) { 
        this.app.getBalance(transientState.account)
        .then((balance) => {
          transientState.balance = balance.toNumber()
          this.setState(transientState)
        }) 
        .catch((e) => {
          transientState.generalFailureMessage = e.message || e
          this.setState(transientState)
        })
      }
    })
    .catch((e) => {
      transientState.waiting = false
      transientState.generalFailureMessage = e.message || e
      this.setState(transientState)
    })
  }


  render () {
    const balanceClasses = (this.state.balance > 0) ? 'badge rounded-0 badge-success' : 'badge rounded-0 badge-warning'
    const previouslyRegisteredAlertClass = 'alert alert-warning alert-dismissible fade show registered ' + 
      (this.state.dismissedPreviouslyRegisteredAlert || (this.state.previouslyRegistered && !this.state.canDisburseMultipleTimes) ? '' : ' d-none ')
    const registerDisabledAttribute = ((this.state.previouslyRegistered && !this.state.canDisburseMultipleTimes) || this.state.waiting) || !this.state.isActive
    const waitingClass = 'container waiting' + (this.state.waiting ? '' : ' d-none ')
    const registrationSuccessAlertClass = 'alert alert-success alert-dismissible fade show' + (this.state.registrationSuccess ? '' : ' d-none ')
    const registrationFailureAlertClass = 'alert alert-danger registration-failure alert-dismissible fade show' + (this.state.registrationFailure ? '' : ' d-none ')
    const generalFailureAlertClass = 'alert alert-danger failure alert-dismissible fade show' + (this.state.generalFailureMessage ? '': ' d-none ')
    const campaignOverAlertClass = 'alert alert-danger failure alert-dismissible fade show' + (!this.state.isActive ? '' : ' d-none ')

    return (
      <div class="d-flex flex-column">
        <Header />
        <main role="main" class="inner cover">
                    <div class="text-center">
            <h1 class="cover-heading">Registration</h1>
            <p class="lead">If you're using MetaMask or a local web3 provider please be sure to check <a href="https://ethgasstation.info/">ETH Gas Station</a> to stay in full control of your gas usage.</p>
            <div class="qr">
              <img class="qr img-thumbnail" alt="qrcode of account" src={this.state.accountQR} />
            </div>
            <h3><span class="account">{this.state.account}</span>&nbsp;<span class={balanceClasses}><span class="balance">{this.state.balance}</span> OCC</span></h3>
            <div class="lead">
              <div class={previouslyRegisteredAlertClass} role="alert">
                <strong>Looks like you're already registered.</strong> That's great, now share the love and let others know about OCC's airdrop!
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class={campaignOverAlertClass} role="alert">
                <strong>The campaign is over! Thank you for your interest in the OCC airdrop</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <button type="button" class="btn btn-lg btn-dark rounded-0 get-coins" disabled={registerDisabledAttribute} onClick={this.register.bind(this)}>Get Coins</button>
              <div class={waitingClass}><i class="fab fa-ethereum fa-spin"></i></div>
              <div class={registrationFailureAlertClass} role="alert">
                Uh oh. Something went wrong, you can check a <a href={this.state.explorerLink} class="alert-link explorer">blockchain explorer</a> for more details.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class={registrationSuccessAlertClass} role="alert">
                They&apos;re on their way! You can check a <a href={this.state.explorerLink} class="alert-link explorer">blockchain explorer</a> for more details.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class={generalFailureAlertClass} role="alert">
                Uh oh. Something went wrong: <span class="failure-message">{this.state.generalFailureMessage}</span>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <hr />
            <p>This app has been tested using <a href="https://github.com/ethereum/mist">Mist</a>, <a href="https://metamask.io/">MetaMask</a>, <a href="https://trustwalletapp.com">Trust Wallet</a>, and <a href="https://www.cipherbrowser.com/">Cipher Browser</a>.</p>
            <hr />
            <p>Ethereum Network: <span class="network">{this.state.network.name}</span></p>
          </div>
        </main>
      </div>
    );
  }
}

