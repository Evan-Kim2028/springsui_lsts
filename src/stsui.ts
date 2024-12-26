import { events } from "./types/sui/0x059f94b85c07eb74d2847f8255d8cc0a67c9a8dcc039eabf9f8b9e23a0de2700.js";
import { liquid_staking } from "./types/sui/0x059f94b85c07eb74d2847f8255d8cc0a67c9a8dcc039eabf9f8b9e23a0de2700.js";
import { _0x1 } from '@typemove/sui/builtin';

// Define event type constants using the contract address
export const STSUI_MINT_EVENT_TYPE = "0x059f94b85c07eb74d2847f8255d8cc0a67c9a8dcc039eabf9f8b9e23a0de2700::events::Event<0x059f94b85c07eb74d2847f8255d8cc0a67c9a8dcc039eabf9f8b9e23a0de2700::liquid_staking::MintEvent>"
export const STSUI_REDEEM_EVENT_TYPE = "0x059f94b85c07eb74d2847f8255d8cc0a67c9a8dcc039eabf9f8b9e23a0de2700::events::Event<0x059f94b85c07eb74d2847f8255d8cc0a67c9a8dcc039eabf9f8b9e23a0de2700::liquid_staking::RedeemEvent>"

export function initStSuiProcessor() {
    events.bind()
        .onEventEvent(async (event, ctx) => {
            const type = event.type
            
            // Handle Mint events
            if (type == STSUI_MINT_EVENT_TYPE) {
                const mintEvent = event.data_decoded.event as liquid_staking.MintEvent
                ctx.meter.Counter('stsui_staked_events').add(1);
                ctx.eventLogger.emit("stsui_StakedEvent", {
                    project: "stsui_lst",
                    mintEvent
                })
            }

            // Handle Redeem events
            if (type == STSUI_REDEEM_EVENT_TYPE) {
                const redeemEvent = event.data_decoded.event as liquid_staking.RedeemEvent
                ctx.meter.Counter('stsui_unstake_requested_events').add(1);
                ctx.eventLogger.emit("stsui_UnstakeRequestedEvent", {
                    project: "stsui_lst",
                    redeemEvent
                })
            }
        })
}