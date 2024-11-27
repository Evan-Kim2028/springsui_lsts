# SpringsUI LST Example Repo

## Overview

SpringsUI LSTs is a Sentio processor that extracts events from staking contracts. Specifically this repository extracts stake and unstake events from the aftermath afSui events. It leverages the Sentio SDK to bind to specific contract events, allowing developers to monitor and respond to staking activities in real-time.

## Functionality

The library primarily listens for two types of events:

1. **StakedEvent**
2. **UnstakeRequestedEvent**

Upon receiving these events, the library logs relevant information such as the staker's address, validator details, and amounts involved in the transactions.

## Key Code Architecture

### Processor

The core functionality is encapsulated in the `src/processor.ts` file, which binds to the events emitted by the Sui contracts. Here’s a brief overview of how the processor is structured:

- **Imports**: The processor imports necessary types and classes from the Sentio SDK and the event types defined in the Sui contract.
- **Contract Addresses**: It defines an array of contract addresses that the processor will listen to for events.
- **Event Binding**: The processor binds to the `StakedEvent` and `UnstakeRequestedEvent`, incrementing counters and logging event data when these events occur.

### Example Code Snippet
The library is meant to be uploaded to sentio hosted indexing, not to be run alone via self indexing. This can be done with the commands:
`yarn install` and `yarn build` -> compiles the typescript library
`yarn sentio upload` -> uploads relevant info to sentio



curl -L -X POST 'https://app.sentio.xyz/api/v1/analytics/evandekim/springsui_lsts/sql/execute' \
     -H 'api-key: r6y8MRpgjo4j9TQJhLg4w0R9aJMQTuXVe' \
     -H 'Content-Type: application/json' \
     --data-raw '{
  "sqlQuery": {
    "sql": "SELECT\n    event_date,\n    cumulative_circulation / 2 AS afsui_in_circulation\nFROM\n(\n    SELECT\n        event_date,\n        SUM(total_change) OVER (\n            ORDER BY event_date ASC\n            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n        ) AS cumulative_circulation\n    FROM\n    (\n        SELECT\n            event_date,\n            SUM(total_change) AS total_change\n        FROM\n        (\n            -- Aggregate Minted `afsui_amount` per day as positive changes\n            SELECT\n                toDate(timestamp) AS event_date,\n                toFloat64OrDefault(afsui_amount, 0.0) / 1e9 AS total_change\n            FROM StakedEvent\n\n            UNION ALL\n\n            -- Aggregate Burned `provided_afsui_amount` per day as negative changes\n            SELECT\n                toDate(timestamp) AS event_date,\n                toFloat64OrDefault(provided_afsui_amount, 0.0) * -1 / 1e9 AS total_change\n            FROM UnstakeRequestedEvent\n        )\n        GROUP BY event_date\n    )\n)\nORDER BY event_date;\n\n\n\n\n",
    "size": 1000
  }
}'