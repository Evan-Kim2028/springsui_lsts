import { SuiNetwork, SuiModulesProcessor, SuiContext } from '@sentio/sdk/sui';
import { events } from './types/sui/aftermath_staked1.js';

type StakedEvent = events.StakedEvent;
type UnstakeRequestedEvent = events.UnstakeRequestedEvent;

const CONTRACT_ADDRESSES = [
  '0x7f6ce7ade63857c4fd16ef7783fed2dfc4d7fb7e40615abdb653030b76aef0c6',
  '0x1575034d2729907aefca1ac757d6ccfcd3fc7e9e77927523c06007d8353ad836',
];

for (const address of CONTRACT_ADDRESSES) {
  // Use SuiProcessor to handle events from the contract address
  SuiModulesProcessor.bind({ address: address, network: SuiNetwork.MAIN_NET })
    .onEvent(
      (event: any, ctx: SuiContext) => {
        const typedEvent = event as StakedEvent;
        ctx.meter.Counter('staked_events').add(1);

        const {
          staker,
          validator,
          staked_sui_id,
          sui_id,
          sui_amount,
          afsui_id,
          afsui_amount,
          validator_fee,
          referrer,
          epoch,
          is_restaked,
        } = typedEvent;

        const staked_sui_id_str = staked_sui_id;
        const sui_id_str = sui_id;
        const afsui_id_str = afsui_id;

        // Handle Option<string> for referrer
        let referrer_str: string | null = null;
        if (referrer !== null && typeof referrer === 'object') {
          referrer_str = (referrer as { some: string }).some;
        } else {
          referrer_str = null;
        }

        ctx.eventLogger.emit('StakedEvent', {
          distinctId: staker,
          staker,
          validator,
          staked_sui_id: staked_sui_id_str,
          sui_id: sui_id_str,
          sui_amount: sui_amount.toString(),
          afsui_id: afsui_id_str,
          afsui_amount: afsui_amount.toString(),
          validator_fee: validator_fee.toString(),
          referrer: referrer_str,
          epoch: epoch.toString(),
          is_restaked,
        });
      },
      // { moveEventType: 'staked_sui_vault::StakedEvent' }
    )
    .onEvent(
      (event: any, ctx: SuiContext) => {
        const typedEvent = event as UnstakeRequestedEvent;
        ctx.meter.Counter('unstake_requested_events').add(1);

        const {
          afsui_id,
          provided_afsui_amount,
          requester,
          epoch,
        } = typedEvent;

        const afsui_id_str = afsui_id;

        ctx.eventLogger.emit('UnstakeRequestedEvent', {
          distinctId: requester,
          afsui_id: afsui_id_str,
          provided_afsui_amount: provided_afsui_amount.toString(),
          requester,
          epoch: epoch.toString(),
        });
      },
      // { moveEventType: 'staked_sui_vault::UnstakeRequestedEvent' }
    );
}
