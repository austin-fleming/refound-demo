# Monitor

-   watches for contract events and publishes them to the message queue

## Caveats

-   Does not currently keep track of last block when data was persisted. So there is a risk that there may occasionally need to be a full index wipe and rebuild.

-   There is a risk that the monitor pair could go down at the same time. The gap between when the past events are published and the listener begins could miss messages.
