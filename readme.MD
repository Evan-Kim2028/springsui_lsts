# SpringsUI LST Example Repo

## Overview

SpringsUI LSTs is a Sentio processor that extracts events from staking contracts. Specifically this repository extracts stake and unstake events from the aftermath afSui events. It leverages the Sentio SDK to bind to specific contract events, allowing developers to monitor and respond to staking activities in real-time.

## Functionality

The library tracks staking events across multiple Sui liquid staking protocols:

1. **afSUI Protocol**
   - StakedEvent: Tracks new stakes including validator details and referral info
   - UnstakeRequestedEvent: Monitors unstake requests and associated amounts

2. **haSUI Protocol**
   - UserStaked: Records user staking activities
   - UserNormalUnstaked: Tracks standard unstaking operations
   - UserInstantUnstaked: Monitors instant unstaking events

3. **sSUI Protocol**
   - MintEvent: Captures new staking/minting operations
   - RedeemEvent: Tracks unstaking/redemption requests

4. **vSUI Protocol**
   - StakedEvent: Monitors staking operations with certificate amounts
   - UnstakedEvent: Tracks unstaking activities and associated certificates

## Key Code Architecture

### Processor Organization

The codebase is organized into protocol-specific processors, each handling their respective events:

1. **Main Processor (`src/processor.ts`)**
   - Central initialization point that bootstraps all protocol processors
   - Coordinates the event processing across different protocols

2. **Protocol-Specific Processors**
   - `afsui.ts`: Handles afSUI protocol events with detailed staking metadata
   - `hasui.ts`: Processes haSUI events including instant unstaking capabilities
   - `ssui.ts`: Manages sSUI protocol's mint and redeem events
   - `vsui.ts`: Handles vSUI protocol's staking certificate system

### Event Processing Pattern

Each processor follows a consistent pattern:
- Binds to specific contract events
- Increments protocol-specific counters for monitoring
- Emits standardized events with relevant transaction data
- Handles protocol-specific data transformations

### Example Code Snippet
The library is meant to be uploaded to sentio hosted indexing, not to be run alone via self indexing. This can be done with the commands:
`yarn sentio add --chain sui_mainnet contract_address` -> adds the contract to sentio
`yarn sentio build` -> compiles the typescript library
`yarn sentio upload` -> uploads relevant info to sentio