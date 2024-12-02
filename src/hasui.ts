import { SuiContext } from '@sentio/sdk/sui';
import { staking } from './types/sui/0x1d56b8ec33c3fae897eb7bb1acb79914e8152faed614868928e684c25c8b198d.js';
import { _0x1 } from '@typemove/sui/builtin';


export function initHaSuiProcessor() {
    staking.bind()
        .onEventUserStaked((event: staking.UserStakedInstance, ctx: SuiContext) => {
            ctx.meter.Counter('hasui_staked_event').add(1);
            ctx.eventLogger.emit('hasui_StakedEvent', {
                owner: event.data_decoded.owner,
                sui_amount: event.data_decoded.sui_amount.toString(),
                st_amount: event.data_decoded.st_amount.toString(),
                validator: event.data_decoded.validator
            });
        })
        .onEventUserNormalUnstaked((event: staking.UserNormalUnstakedInstance, ctx: SuiContext) => {
            ctx.meter.Counter('hasui_system_unstaked_event').add(1);
            ctx.eventLogger.emit('hasui_SystemUnstakedEvent', {
                owner: event.data_decoded.owner,
                epoch: event.data_decoded.epoch,
                epoch_timestamp_ms: event.data_decoded.epoch_timestamp_ms.toString(),
                sui_amount: event.data_decoded.sui_amount.toString(),
                st_amount: event.data_decoded.st_amount.toString()
            });
        })
        .onEventUserInstantUnstaked((event: staking.UserInstantUnstakedInstance, ctx: SuiContext) => {
            ctx.meter.Counter('hasui_instant_unstaked_event').add(1);
            ctx.eventLogger.emit('hasui_InstantUnstakedEvent', {
                owner: event.data_decoded.owner,
                sui_amount: event.data_decoded.sui_amount.toString(),
                st_amount: event.data_decoded.st_amount.toString()
            });
        });
}