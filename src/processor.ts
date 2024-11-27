import { SuiNetwork, SuiContext } from '@sentio/sdk/sui';
import { events } from './types/sui/0x7f6ce7ade63857c4fd16ef7783fed2dfc4d7fb7e40615abdb653030b76aef0c6.js';

type StakedEvent = events.StakedEvent;
type UnstakeRequestedEvent = events.UnstakeRequestedEvent;

const CONTRACT_ADDRESSES = [
  // '0x7f6ce7ade63857c4fd16ef7783fed2dfc4d7fb7e40615abdb653030b76aef0c6', # old afsui vault address
  '0x1575034d2729907aefca1ac757d6ccfcd3fc7e9e77927523c06007d8353ad836',
];

for (const address of CONTRACT_ADDRESSES) {
  events
    .bind()
    .onEventStakedEvent((event: events.StakedEventInstance, ctx: SuiContext) => {
      ctx.meter.Counter('staked_events').add(1);

      ctx.eventLogger.emit('StakedEvent', {
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
    .onEventUnstakeRequestedEvent((event: events.UnstakeRequestedEventInstance, ctx: SuiContext) => {
      ctx.meter.Counter('unstake_requested_events').add(1);

      ctx.eventLogger.emit('UnstakeRequestedEvent', {
        afsui_id: event.data_decoded.afsui_id,
        provided_afsui_amount: event.data_decoded.provided_afsui_amount.toString(),
        requester: event.data_decoded.requester,
        epoch: event.data_decoded.epoch.toString(),
      });
    });
}
