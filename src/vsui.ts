import { SuiContext } from '@sentio/sdk/sui';
import { native_pool } from './types/sui/0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55.js';
import { _0x1 } from '@typemove/sui/builtin';


export function initVSuiProcessor() {
    native_pool.bind()
        .onEventStakedEvent((event: native_pool.StakedEventInstance, ctx: SuiContext) => {
            ctx.meter.Counter('vsui_staked_event').add(1);
            ctx.eventLogger.emit('vsui_StakedEvent', {
                staker: event.data_decoded.staker,
                sui_amount: event.data_decoded.sui_amount.toString(),
                cert_amount: event.data_decoded.cert_amount.toString(),
            });
        })
        .onEventUnstakedEvent((event: native_pool.UnstakedEventInstance, ctx: SuiContext) => {
            ctx.meter.Counter('vsui_system_unstaked_event').add(1);
            ctx.eventLogger.emit('vsui_SystemUnstakedEvent', {
                staker: event.data_decoded.staker,
                sui_amount: event.data_decoded.sui_amount.toString(),
                cert_amount: event.data_decoded.cert_amount.toString(),
            });
        })
}