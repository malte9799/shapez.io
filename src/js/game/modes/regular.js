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
            shape: "RuRuRuRu:RuRuRuRu:RuRuRuRu:RuRuRuRu", // belts t1
            required: 10,
            reward: enumHubGoalRewards.reward_cutter_and_trash,
        },

        // Level 2
        {
            shape: "SwSwSwSw", //
            required: 10,
            reward: enumHubGoalRewards.no_reward,
        },

        // Level 3
        {
            shape: "RbCbRbCb", // miners t1
            required: 10,
            reward: enumHubGoalRewards.reward_balancer,
        },

        // Level 4
        {
            shape: "RbRbRbRb:RwRwRwRw", // processors t2
            required: 10,
            reward: enumHubGoalRewards.reward_rotater,
        },

        // Level 5
        {
            shape: "RuCuSuCu", // belts t2
            required: 10,
            reward: enumHubGoalRewards.reward_tunnel,
        },

        // Level 6
        {
            shape: "WrWrWrWr", // miners t2
            required: 5, // Per Second
            reward: enumHubGoalRewards.reward_painter,
            throughputOnly: true,
        },

        // Level 7
        {
            shape: "--RcCc--:CwRw----", // unused
            required: 10,
            reward: enumHubGoalRewards.reward_rotater_ccw,
        },

        // Level 8
        {
            shape: "CuCuCuCu:--CuCuCu:----CuCu:------Cu", // painter t2
            required: 10,
            reward: enumHubGoalRewards.reward_mixer,
        },

        // Level 9
        {
            shape: "CpCpCpCp", // belts t3
            required: 600,
            reward: enumHubGoalRewards.reward_merger,
        },

        // Level 10
        {
            shape: "ScScScSc", // miners t3
            required: 800,
            reward: enumHubGoalRewards.reward_stacker,
        },

        // Level 11
        {
            shape: "CgScScCg", // processors t3
            required: 1000,
            reward: enumHubGoalRewards.reward_miner_chainable,
        },

        // Level 12
        {
            shape: "CbCbCbRb:CwCwCwCw",
            required: 1000,
            reward: enumHubGoalRewards.reward_blueprints,
        },

        // Leve 13
        {
            shape: "RpRpRpRp:CwCwCwCw", // painting t3
            required: 3800,
            reward: enumHubGoalRewards.reward_underground_belt_tier_2,
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
                  // 14
                  // Belt reader
                  {
                      shape: "--Cg----:--Cr----", // unused
                      required: 8, // Per second!
                      reward: enumHubGoalRewards.reward_belt_reader,
                      throughputOnly: true,
                  },

                  // 15
                  // Storage
                  {
                      shape: "SrSrSrSr:CyCyCyCy", // unused
                      required: 10000,
                      reward: enumHubGoalRewards.reward_storage,
                  },

                  // 16
                  // Quad Cutter
                  {
                      shape: "SrSrSrSr:CyCyCyCy:SwSwSwSw", // belts t4 (two variants)
                      required: 6000,
                      reward: enumHubGoalRewards.reward_cutter_quad,
                  },

                  // 17
                  // Double painter
                  {
                      shape: "CbRbRbCb:CwCwCwCw:WbWbWbWb", // miner t4 (two variants)
                      required: 20000,
                      reward: enumHubGoalRewards.reward_painter_double,
                  },

                  // 18
                  // Rotater (180deg)
                  {
                      shape: "Sg----Sg:CgCgCgCg:--CyCy--", // unused
                      required: 20000,
                      reward: enumHubGoalRewards.reward_rotater_180,
                  },

                  // 19
                  // Compact splitter
                  {
                      shape: "CpRpCp--:SwSwSwSw",
                      required: 25000,
                      reward: enumHubGoalRewards.reward_splitter,
                  },

                  // 20
                  // WIRES
                  {
                      shape: finalGameShape,
                      required: 25000,
                      reward: enumHubGoalRewards.reward_wires_painter_and_levers,
                  },

                  // 21
                  // Filter
                  {
                      shape: "CrCwCrCw:CwCrCwCr:CrCwCrCw:CwCrCwCr",
                      required: 25000,
                      reward: enumHubGoalRewards.reward_filter,
                  },

                  // 22
                  // Constant signal
                  {
                      shape: "Cg----Cr:Cw----Cw:Sy------:Cy----Cy",
                      required: 25000,
                      reward: enumHubGoalRewards.reward_constant_signal,
                  },

                  // 23
                  // Display
                  {
                      shape: "CcSyCcSy:SyCcSyCc:CcSyCcSy",
                      required: 25000,
                      reward: enumHubGoalRewards.reward_display,
                  },

                  // 24 Logic gates
                  {
                      shape: "CcRcCcRc:RwCwRwCw:Sr--Sw--:CyCyCyCy",
                      required: 25000,
                      reward: enumHubGoalRewards.reward_logic_gates,
                  },

                  // 25 Virtual Processing
                  {
                      shape: "Rg--Rg--:CwRwCwRw:--Rg--Rg",
                      required: 25000,
                      reward: enumHubGoalRewards.reward_virtual_processing,
                  },

                  // 26 Freeplay
                  {
                      shape: "CbCuCbCu:Sr------:--CrSrCr:CwCwCwCw",
                      required: 50000,
                      reward: enumHubGoalRewards.reward_freeplay,
                  },
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
