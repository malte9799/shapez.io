import { gLevelRegistry } from "../core/global_registries";
import { Level_1 } from "./levels/level_1";
import { Level_2 } from "./levels/level_2";
import { Level_3 } from "./levels/level_3";
import { Level_4 } from "./levels/level_4";
import { Level_5 } from "./levels/level_5";
import { Level_6 } from "./levels/level_6";
import { Level_7 } from "./levels/level_7";
import { Level_8 } from "./levels/level_8";

export function initLevelRegistry() {
    gLevelRegistry.register(Level_1);
    gLevelRegistry.register(Level_2);
    gLevelRegistry.register(Level_3);
    gLevelRegistry.register(Level_4);
    gLevelRegistry.register(Level_5);
    gLevelRegistry.register(Level_6);
    gLevelRegistry.register(Level_7);
    gLevelRegistry.register(Level_8);

    // IMPORTANT ^^^^^ UPDATE ENTITY COMPONENT STORAGE AFTERWARDS

    // Sanity check - If this is thrown, you (=me, lol) forgot to add a new component here

    assert(
        // @ts-ignore
        require.context("./levels", false, /.*\.js/i).keys().length ===
            gLevelRegistry.getNumEntries(),
        "Not all components are registered"
    );

    console.log("📦 There are", gLevelRegistry.getNumEntries(), "levels");
}
