# Indexer

Consists of (4) parts:

-   **Monitor:** listens to on-chain events and publishes them to a queue.
-   **Queue:** a simple Bullmq instance running on Redis.
-   **Transformer:** receives events from the queue, processes them, and pushes the data to a caching database for read-only use by the frontend.
-   **Cache:** Postgres index of contract data.

The use of a queue helps ensure the server can keep up with the rate of contract events, be deployed in multiples to guard against websocket disconnections with the Celo node, and reduce the chance of a data processing error affecting the objective of catching events.

Example Flow:

-   Frontend user issues a "create profile" command to the smart contract
-   Monitor catches the "create profile" event from onchain and relays it to the transformer.
-   Transformer processes the event into a query-friendly form and pushes it to the cache.
-   Frontend user then views the data from the cache.

## Caveats

-   Transformer cannot currently handle someone moving their profile to a new wallet.
-   In theory, someone could submit non-conforming metadata directly to the smart contract, resulting in a failed cache update. The contract would need to store profiles as a struct or assemble the metadata from discrete parameters to better harden against this potential problem.
-   Currently, the monitor begins by pulling all past events before switching to listening. In theory, this gap of time between getPastEvents and listening to current events could allow events to be missed.
-   Currently, queue is configured to keep all jobs to prevent clashes on the caching server when a monitor instance reboots. This will eventually lead to a very heavy queue. Additionally, this could be an issue should Redis go down, as it will wipe completed jobs.
