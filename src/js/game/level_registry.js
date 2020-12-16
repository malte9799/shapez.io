import { gComponentRegistry } from "../core/global_registries";
import { Level_1 } from "./levels/level_1";

export function initComponentRegistry() {
    gLevelRegistry.register(Level_1);

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
