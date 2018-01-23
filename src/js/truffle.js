module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  // TODO: add test/production networks
  // and prevent concurrent access to multiple networks
  // see: http://truffleframework.com/docs/advanced/configuration#accessing-only-one-of-multiple-network-providers
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545, // 'truffle develop' runs on 9545 by default
      network_id: "*" // Match any network id
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545, // ganache runs on 7545 by default
      network_id: "*"
    }
  }
};
