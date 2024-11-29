import { SuiContext } from '@sentio/sdk/sui';
import { events as afsui_events } from './types/sui/0x7f6ce7ade63857c4fd16ef7783fed2dfc4d7fb7e40615abdb653030b76aef0c6.js';
import { _0x1 } from '@typemove/sui/builtin';


export function initAfsuiProcessor() {
    afsui_events.bind()
        .onEventStakedEvent((event: afsui_events.StakedEventInstance, ctx: SuiContext) => {
            ctx.meter.Counter('staked_events').add(1);
            ctx.eventLogger.emit('afsui_StakedEvent', {
                distinctId: event.data_decoded.staker,
                staker: event.data_decoded.staker,
                validator: event.data_decoded.validator,
                staked_sui_id: event.data_decoded.staked_sui_id,
                sui_id: event.data_decoded.sui_id,
                sui_amount: event.data_decoded.sui_amount.toString(),
                afsui_id: event.data_decoded.afsui_id,
                afsui_amount: event.data_decoded.afsui_amount.toString(),
                validator_fee: event.data_decoded.validator_fee.toString(),
                referrer: event.data_decoded.referrer,
                epoch: event.data_decoded.epoch.toString(),
                is_restaked: event.data_decoded.is_restaked,
            });
        })
        .onEventUnstakeRequestedEvent((event: afsui_events.UnstakeRequestedEventInstance, ctx: SuiContext) => {
            ctx.meter.Counter('unstake_requested_events').add(1);
            ctx.eventLogger.emit('afsui_UnstakeRequestedEvent', {
                afsui_id: event.data_decoded.afsui_id,
                provided_afsui_amount: event.data_decoded.provided_afsui_amount.toString(),
                requester: event.data_decoded.requester,
                epoch: event.data_decoded.epoch.toString(),
            });
        });
}
