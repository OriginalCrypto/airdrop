import Ethereum         from './utilities/ethereum';
import { EventEmitter } from 'events';
import networks         from './networks';
import BigNumber        from 'bignumber.js';


let primaryAccount,
    accountCandidate,
    pollForAccountInterval,
    token,
    airdrop


export default class App extends EventEmitter {
  constructor () {
    super()
    token = Ethereum.getOriginalTokenContract()
    airdrop = Ethereum.getAirdropCampaignContract()
  }

  getNetwork () {
    return new Promise((resolve, reject) => {
      Ethereum
        .getWeb3()
        .version
        .getNetwork((error, networkId) => {
          if (error) { reject(error) }

          const network = networks.find(function (network) { return network.id == networkId })
          
          if (network !== undefined) {
            network.explorerFormatString = (network.name === 'main') ? 'https://etherscan.io' : `https://${network.name}.etherscan.io`

            resolve(network)
            this.emit('network', network)
          } else {
            reject(new Error('couldn\'t find network in list with networkId of \'' + networkId + '\''))
          }
        })
    })
  }

  getAccount () {
    return new Promise((resolve, reject) => {
      Ethereum
      .getWeb3()
      .eth
      .getAccounts((error, accounts) => {
        if (error) { reject(error) }

        accountCandidate = accounts[0]

        if (primaryAccount !== accountCandidate) {
          console.log(`account changing from \'${primaryAccount}\' to \'${accountCandidate}\'`)
          primaryAccount = accountCandidate
          this.emit('account:change', primaryAccount)
        }
        resolve(primaryAccount)
      })
    })
  }

  pollForAccount () {
    pollForAccountInterval = window.setInterval(this.getAccount.bind(this), 5000)
  }

  stopPollingForAccount () {
    window.clearInterval(pollForAccountInterval)
  }

  getBalance (account) {
    let decimals

    return token.deployed()
      .then((instance) => {
        return instance.decimals.call()
        .then((bigDecimals) => {
          decimals = bigDecimals
          return instance
        })
      })
      .then((instance) => {
        return instance.balanceOf.call(account)
      })
      .then((balanceBeforeDecimals) => {
        const bigTen = BigNumber(10)
        const balance = balanceBeforeDecimals.mul(bigTen.exponentiatedBy(-1 * decimals))        
        
        this.emit('balance', balance)
        return balance
      })
  }

  getPreviousDisbursment (account) {
    return airdrop
      .deployed()
      .then((instance) => {
        return instance.disbursements.call(account)
      })
  }

  getHolderAddress () {
    return airdrop
      .deployed()
      .then(instance => {
        return instance.tokenHolderAddress.call()
      })
  }

  getRules () {
    return airdrop
      .deployed()
      .then((instance) => {
        return instance.canDisburseMultipleTimes.call()
      })
  }

  register (account) {
    return airdrop
      .deployed()
      .then(function (instance) {
        return instance.register({ from: account })
      })
  }

  toBigNumber (value) {
    return Ethereum.getWeb3().toBigNumber(value)
  }
}
