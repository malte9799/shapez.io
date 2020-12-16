/* typehints:start */
import { enumHubGoalRewards } from "./tutorial_goals";
/* typehints:end */

import { GameRoot } from "./root";

/** @typedef {{
 *   shape: string,
 *   required: number,
 *   reward: enumHubGoalRewards,
 *   throughputOnly?: boolean
 * }} LevelDefinition */

export class GameMode {
    /**
     *
     * @param {GameRoot} root
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * Returns the blueprint shape key
     * @returns {string}
     */
    getBlueprintShapeKey() {
        abstract;
        return null;
    }

    /**
     * Returns the goals for all levels including their reward
     * @returns {Array<LevelDefinition>}
     */
    getLevelDefinitions() {
        abstract;
        return null;
    }

    /**
     * Should return whether free play is available or if the game stops
     * after the predefined levels
     * @returns {boolean}
     */
    getIsFreeplayAvailable() {
        return true;
    }
}
