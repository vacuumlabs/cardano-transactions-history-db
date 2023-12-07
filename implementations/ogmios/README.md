## Ogmios
[Ogmios](https://ogmios.dev/) is a bridge interface for cardano-node. It offers a WebSockets API that enables local clients to speak with the cardano-node.

We will use the **[Chain synchronization](https://ogmios.dev/mini-protocols/local-chain-sync/)** mini-protocol to examine all the transactions happened on the blockchain, and trigger the save whenever certain conditions are met.

### Setup
To start a local cardano-node with a tied ogmios server:
1. Run the docker images: `docker-compose up`. Defaultly the cardano-node will join the `preview` network (can be changed via setting the `NETWORK` env variable before running thecommand)
2. The ogmios server will be reachable defaulty on port **1337** (can be changed via setting the `PORT` env variable)
3. Run the node script which will connect to the ogmios server and listen to the chain-sync events: `npm run start`  (hot reloading is enabled, `PORT` environemnt variable should be set to the same value as the ogmios server's port, defaultly it's `1337`)

### Conclusions
- **Benefits**:
    - Full control over the cardano-node
    - Full control over the trigger conditions
    - Quick response time
- **Drawbacks**:
    - Harder to setup the full environment
    - You need to maintain and ensure the availibility of the cardano-node and the ogmios server yourself
    - Transaction data is in raw format (e.g. no input addresses)