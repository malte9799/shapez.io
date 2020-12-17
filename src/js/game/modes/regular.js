import { findNiceIntegerValue } from "../../core/utils";
import { GameMode } from "../game_mode";
import { ShapeDefinition } from "../shape_definition";
import { enumHubGoalRewards } from "../tutorial_goals";

const rocketShape = "CbCuCbCu:Sr------:--CrSrCr:CwCwCwCw";
const finalGameShape = "RuCw--Cw:----Ru--";
const preparementShape = "CpRpCp--:SwSwSwSw";
const blueprintShape = "CbCbCbRb:CwCwCwCw";


/**
 * Generates the level definitions
 * @param {boolean} limitedVersion
 */
export function generateLevelDefinitions(limitedVersion = false) {
    const levelDefinitions = [
        // Level 1
        {
            shape: "RuRu----:RuRu----:RuRuRuRu:RuRuRuRu",
            required: 10,
            reward: enumHubGoalRewards.level_1,
        },

        // Level 2
        {
            shape: "SwSwSwSw",
            required: 10,
            reward: enumHubGoalRewards.level_2,
        },

        // Level 3
        {
            shape: "RbCbRbCb",
            required: 10,
            reward: enumHubGoalRewards.level_3,
        },

        // Level 4
        {
            shape: "RbRbRbRb:RwRwRwRw",
            required: 10,
            reward: enumHubGoalRewards.level_4,
        },

        // Level 5
        {
            shape: "RuCuSuCu",
            required: 10,
            reward: enumHubGoalRewards.level_5,
        },

        // Level 6
        {
            shape: "WrWrWrWr",
            required: 6.5, // Per Second
            reward: enumHubGoalRewards.level_6,
            throughputOnly: true,
        },

        // Level 7
        {
            shape: "--RcCc--:CwRw----",
            required: 10,
            reward: enumHubGoalRewards.level_7,
        },

        // Level 8
        {
            shape: "CuCuCuCu:CuCuCu--:--CuCu--:----Cu--",
            required: 10,
            reward: enumHubGoalRewards.level_8,
        },

        // Level 9
        {
            shape: "WwWwWwWw:WbWrWyWg",
            required: 10,
            reward: enumHubGoalRewards.level_9,
        },

        // Level 10
        {
            shape: "--Sw--Sw:--Sr--Sr:--Sw--Sw:RuSrRuSr",
            required: 10,
            reward: enumHubGoalRewards.level_10,
        },

        // Level 11
        {
            shape: "CgScScCg",
            required: 1000,
            reward: enumHubGoalRewards.level_11,
        },

        // Level 12
        {
            shape: "CbCbCbRb:CwCwCwCw",
            required: 1000,
            reward: enumHubGoalRewards.level_12,
        },

        // Leve 13
        {
            shape: "RpRpRpRp:CwCwCwCw",
            required: 3800,
            reward: enumHubGoalRewards.level_13,
        },

        // DEMO STOPS HERE
        ...(limitedVersion
            ? [
                  {
                      shape: "RpRpRpRp:CwCwCwCw",
                      required: 0,
                      reward: enumHubGoalRewards.reward_demo_end,
                  },
              ]
            : [
                  // Level 14
                  {
                      shape: "--Cg----:--Cr----", // unused
                      required: 8, // Per second!
                      reward: enumHubGoalRewards.level_14,
                      throughputOnly: true,
                  },

                  // Level 15
                  {
                      shape: "SrSrSrSr:CyCyCyCy", // unused
                      required: 10000,
                      reward: enumHubGoalRewards.level_15,
                  },

                  // Level 16
                  {
                      shape: "SrSrSrSr:CyCyCyCy:SwSwSwSw", // belts t4 (two variants)
                      required: 6000,
                      reward: enumHubGoalRewards.level_16,
                  },

                  // Level 17
                  {
                      shape: "CbRbRbCb:CwCwCwCw:WbWbWbWb", // miner t4 (two variants)
                      required: 20000,
                      reward: enumHubGoalRewards.level_17,
                  },

                  // Level 18
                  {
                      shape: "Sg----Sg:CgCgCgCg:--CyCy--", // unused
                      required: 20000,
                      reward: enumHubGoalRewards.level_18,
                  },

                  // Level 19
                  {
                      shape: "CpRpCp--:SwSwSwSw",
                      required: 25000,
                      reward: enumHubGoalRewards.level_19,
                  },

                  // Level 20
                  {
                      shape: finalGameShape,
                      required: 25000,
                      reward: enumHubGoalRewards.level_20,
                  }
              ]),
    ];

    if (G_IS_DEV) {
        levelDefinitions.forEach(({ shape }) => {
            try {
                ShapeDefinition.fromShortKey(shape);
            } catch (ex) {
                throw new Error("Invalid tutorial goal: '" + ex + "' for shape" + shape);
            }
        });
    }

    return levelDefinitions;
}

const fullVersionLevels = generateLevelDefinitions(false);
const demoVersionLevels = generateLevelDefinitions(true);

export class RegularGameMode extends GameMode {
    constructor(root) {
        super(root);
    }

    getIsFreeplayAvailable() {
        return this.root.app.restrictionMgr.getHasExtendedLevelsAndFreeplay();
    }

    getBlueprintShapeKey() {
        return blueprintShape;
    }

    getLevelDefinitions() {
        return this.root.app.restrictionMgr.getHasExtendedLevelsAndFreeplay()
            ? fullVersionLevels
            : demoVersionLevels;
    }
}
