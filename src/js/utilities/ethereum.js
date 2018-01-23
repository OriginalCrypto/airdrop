import _            from 'underscore';
import tc           from 'truffle-contract';
import Web3         from 'web3';
import { networks } from '../truffle';
import config       from '../config';

const AirdropCampaignArtifact = require('../../contracts/AirdropCampaign.json'),
      OriginalTokenArtifact   = require('../../contracts/OriginalToken.json');

let provider,
    bundledWeb3,
    contracts = {};

export default {
  getProvider () {
    if (!provider) {
      if (web3 === undefined) {
        let network;

        if (config.environment) {
          network = networks[config.environment];
        } else {
          network = _.first(Object.values(networks));
        }

        provider = Web3.providers.HttpProvider(`http://${network.host}:${network.port}`);
      } else {
        provider = web3.currentProvider;
      }
    }

    return provider;
  },
  getWeb3 () {
    if (!bundledWeb3) {
        // even if web3 is already defined we use the web3 library bundled with the application instead of
        // some unknown version injected by Mist, MetaMask (or something else)
      bundledWeb3 = new Web3(this.getProvider());
    }

    return bundledWeb3;
  },
  getAirdropCampaignContract () {
    if (!contracts.AirdropCampaign) {
      contracts.AirdropCampaign = tc(AirdropCampaignArtifact);

      contracts.AirdropCampaign.setProvider(this.getProvider());
    }

    return contracts.AirdropCampaign;
  },
  getOriginalTokenContract () {
    if (!contracts.OriginalToken) {
      contracts.OriginalToken = tc(OriginalTokenArtifact);

      contracts.OriginalToken.setProvider(this.getProvider());
    }

    return contracts.OriginalToken;
  }
};

