# Cardano Transactions History DB
The goal of this project is to compare the different available methods to store historical Cardano transactions data in a regular database.

## Usage

### Implementations
All folders in the `implementations/` directory are the different possible implementations of saving transaction data to a database. Each folder contains a `README.md` file with instructions and conclusionson.
- default network is `preview` (testnet) for all implementations (can be changed by setting the `NETWORK` environment variable before running the scripts)

### Database
The database is a simple PostgreSQL database with a single table called `transactions`.
Setup and usage instructions are in `database/README.md`.

### Smart Contract
For now we are using a simple smart contract which send simple transactions + mint and send NFTs. We store only the offchain code of the smart contract in the repository.
Setup and usage instructions are in `smart-contract/offchain/README.md`.