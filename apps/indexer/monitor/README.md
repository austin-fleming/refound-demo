# Monitor

-   watches for contract events and publishes them to the message queue

## Caveats

-   Does not currently keep track of last block when data was persisted. So there is a risk that there may occasionally need to be a full index wipe and rebuild.

-   There is a risk that the monitor pair could go down at the same time. The gap between when the past events are published and the listener begins could miss messages.

## REFERENCES

-   [eth-indexer](https://github.com/dominiek/eth-indexer)
-   [intermittent indexer](https://medium.com/coinmonks/caching-ethereum-events-with-mysql-18bfa3558355)
-   [eth caching](https://github.com/olekon/p1_eth_caching)
-   [example](https://www.smashingmagazine.com/2021/01/nodejs-api-ethereum-blockchain/)
