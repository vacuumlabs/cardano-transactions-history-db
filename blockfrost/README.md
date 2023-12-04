## Blockfrost
[Blockfrost](https://blockfrost.io/) is an API for Cardano blockchain, it provides useful endpoints and SDKs for developers to build applications on top of Cardano blockchain.

We will use the **[Webhooks](https://blockfrost.dev/start-building/webhooks/)** feature of Blockfrost to trigger our endpoint whenever a new transaction - with certain parameters - is made on Cardano blockchain.

### Setup
To start the webhook endpoint from your local machine:
1. Install dependencies: `npm install`
2. Start the web server: `npm start` (hot reloading is enabled)
3. Expose the endpoint to the internet (I suggest [VSCode's Loocal Port Forwarding](https://code.visualstudio.com/docs/editor/port-forwarding), or you can use [ngrok](https://ngrok.com/) or any other tool)

As this method depends heavily on the Blockfrost services, we need to do these steps on the *[Blockfrost's Web UI](https://blockfrost.dev/)*:
1. Create an account.
2. Create a new **Secure Webhook**
3. Set the **trigger** events you interested in
4. point the **Endpoint URL** to your exposed endpoint (supplemented with your POST path, e.g. `https://port-forwarding-service.com/action-on-smart-contract`)

### Conclusions
- **Benefits**:
    - Easy to setup & configure
    - No need to manage a local cardano node
    - Blockfrost's web UI gives you a lot of control and debug opportunities (e.g. list of successful/failed requests, email on failed request...) over the webhook
- **Drawbacks**:
    - You heavily depends on a third party service (Blockfrost)
    - Trigger conditions are limited to the ones provided by Blockfrost (however it seems to be enough for most use cases)