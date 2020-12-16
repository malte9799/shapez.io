import { T } from "../translations";
import { enumBalancerVariants, MetaBalancerBuilding } from "./buildings/balancer";
import { MetaConstantSignalBuilding } from "./buildings/constant_signal";
import { enumCutterVariants, MetaCutterBuilding } from "./buildings/cutter";
import { MetaDisplayBuilding } from "./buildings/display";
import { MetaFilterBuilding } from "./buildings/filter";
import { MetaLogicGateBuilding } from "./buildings/logic_gate";
import { enumMinerVariants, MetaMinerBuilding } from "./buildings/miner";
import { MetaMixerBuilding } from "./buildings/mixer";
import { enumPainterVariants, MetaPainterBuilding } from "./buildings/painter";
import { MetaReaderBuilding } from "./buildings/reader";
import { enumRotaterVariants, MetaRotaterBuilding } from "./buildings/rotater";
import { MetaStackerBuilding } from "./buildings/stacker";
import { MetaStorageBuilding } from "./buildings/storage";
import { enumUndergroundBeltVariants, MetaUndergroundBeltBuilding } from "./buildings/underground_belt";
import { defaultBuildingVariant, MetaBuilding } from "./meta_building";
/** @typedef {Array<[typeof MetaBuilding, string]>} TutorialGoalReward */
import { enumHubGoalRewards } from "./tutorial_goals";

/**
 * Helper method for proper types
 *  @returns {TutorialGoalReward}
 */
const typed = x => x;

/**
 * Stores which reward unlocks what
 * @enum {TutorialGoalReward?}
 */
export const enumHubGoalRewardsToContentUnlocked = {
    [enumHubGoalRewards.level_1]: null,
    [enumHubGoalRewards.level_2]: null,
    [enumHubGoalRewards.level_3]: null,
    [enumHubGoalRewards.level_4]: null,
    [enumHubGoalRewards.level_5]: null,
    [enumHubGoalRewards.level_6]: null,
    [enumHubGoalRewards.level_7]: null,
    [enumHubGoalRewards.level_8]: null,
    [enumHubGoalRewards.level_9]: null,
    [enumHubGoalRewards.level_10]: null,
    [enumHubGoalRewards.level_11]: null,
    [enumHubGoalRewards.level_12]: null,
    [enumHubGoalRewards.level_13]: null,
    [enumHubGoalRewards.level_14]: null,
    [enumHubGoalRewards.level_15]: null,
    [enumHubGoalRewards.level_16]: null,
    [enumHubGoalRewards.level_17]: null,
    [enumHubGoalRewards.level_18]: null,
    [enumHubGoalRewards.level_19]: null,
    [enumHubGoalRewards.level_20]: null,

    [enumHubGoalRewards.reward_demo_end]: null,
};

if (G_IS_DEV) {
    // Sanity check
    for (const rewardId in enumHubGoalRewards) {
        const mapping = enumHubGoalRewardsToContentUnlocked[rewardId];

        if (typeof mapping === "undefined") {
            assertAlways(
                false,
                "Please define a mapping for the reward " + rewardId + " in tutorial_goals_mappings.js"
            );
        }

        const translation = T.storyRewards[rewardId];
        if (!translation || !translation.title || !translation.desc) {
            assertAlways(false, "Translation for reward " + rewardId + "missing");
        }
    }
}
