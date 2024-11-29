import { SuiContext } from '@sentio/sdk/sui';
import { events as afsui_events } from './types/sui/0x7f6ce7ade63857c4fd16ef7783fed2dfc4d7fb7e40615abdb653030b76aef0c6.js';
import { liquid_staking as spring_sui_events } from './types/sui/0xb0575765166030556a6eafd3b1b970eba8183ff748860680245b9edd41c716e7.js';
import { _0x1 } from '@typemove/sui/builtin';

// TODO - Refactor afsui_events and spring_sui_events into separate files 
// afsui events
// afsui_events
//   .bind()
//   .onEventStakedEvent((event: afsui_events.StakedEventInstance, ctx: SuiContext) => {
//     ctx.meter.Counter('staked_events').add(1);
//     ctx.eventLogger.emit('afsui_StakedEvent', {
//       distinctId: event.data_decoded.staker,
//       staker: event.data_decoded.staker,
//       validator: event.data_decoded.validator,
//       staked_sui_id: event.data_decoded.staked_sui_id,
//       sui_id: event.data_decoded.sui_id,
//       sui_amount: event.data_decoded.sui_amount.toString(),
//       afsui_id: event.data_decoded.afsui_id,
//       afsui_amount: event.data_decoded.afsui_amount.toString(),
//       validator_fee: event.data_decoded.validator_fee.toString(),
//       referrer: event.data_decoded.referrer,
//       epoch: event.data_decoded.epoch.toString(),
//       is_restaked: event.data_decoded.is_restaked,
//     });
//   })
//   .onEventUnstakeRequestedEvent((event: afsui_events.UnstakeRequestedEventInstance, ctx: SuiContext) => {
//     ctx.meter.Counter('unstake_requested_events').add(1);
//     ctx.eventLogger.emit('afsui_UnstakeRequestedEvent', {
//       afsui_id: event.data_decoded.afsui_id,
//       provided_afsui_amount: event.data_decoded.provided_afsui_amount.toString(),
//       requester: event.data_decoded.requester,
//       epoch: event.data_decoded.epoch.toString(),
//     });
//   });


// springsui events
spring_sui_events
  .bind()
  .onEventMintEvent((event: spring_sui_events.MintEventInstance, ctx: SuiContext) => {
    ctx.meter.Counter('mint_events').add(1);
    ctx.eventLogger.emit('spring_sui_Mint', {
      typename: event.data_decoded.typename.toString(),
      lst_amount_out: event.data_decoded.lst_amount_out.toString(),
      sui_amount_in: event.data_decoded.sui_amount_in.toString(),
      fee_amount: event.data_decoded.fee_amount,
    });
  })
  .onEventRedeemEvent((event: spring_sui_events.RedeemEventInstance, ctx: SuiContext) => {
    ctx.meter.Counter('mint_events').add(1);
    ctx.eventLogger.emit('spring_sui_Mint', {
      typename: event.data_decoded.typename.toString(),
      sui_amount_out: event.data_decoded.sui_amount_out.toString(),
      lst_amount_in: event.data_decoded.lst_amount_in.toString(),
      fee_amount: event.data_decoded.fee_amount,
    });
  });
