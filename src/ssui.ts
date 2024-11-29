import { events } from "./types/sui/0xb0575765166030556a6eafd3b1b970eba8183ff748860680245b9edd41c716e7.js";
import { liquid_staking } from "./types/sui/0xb0575765166030556a6eafd3b1b970eba8183ff748860680245b9edd41c716e7.js";
import { _0x1 } from '@typemove/sui/builtin';

export const SSUI_MINT_EVENT_TYPE = "0xb0575765166030556a6eafd3b1b970eba8183ff748860680245b9edd41c716e7::events::Event<0xb0575765166030556a6eafd3b1b970eba8183ff748860680245b9edd41c716e7::liquid_staking::MintEvent>"
export const SSUI_REDEEM_EVENT_TYPE = "0xb0575765166030556a6eafd3b1b970eba8183ff748860680245b9edd41c716e7::events::Event<0xb0575765166030556a6eafd3b1b970eba8183ff748860680245b9edd41c716e7::liquid_staking::RedeemEvent>"


export function initSsuiProcessor() {
    events.bind()
        .onEventEvent(async (event, ctx) => {
            const type = event.type
            if (type == SSUI_MINT_EVENT_TYPE) {
                const mintEvent = event.data_decoded.event as liquid_staking.MintEvent
                ctx.eventLogger.emit("stake", {
                    project: "ssui_lst",
                    mintEvent
                })
            }

            if (type == SSUI_REDEEM_EVENT_TYPE) {
                const redeemEvent = event.data_decoded.event as liquid_staking.RedeemEvent
                ctx.eventLogger.emit("unstake", {
                    project: "ssui_lst",
                    redeemEvent
                })
            }
        })

}