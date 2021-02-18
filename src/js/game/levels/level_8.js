import { Vector } from "../../core/vector";
import { Level } from "../level";

export class Level_8 extends Level {
    constructor() {
        super("level_8", 7);
    }

    getDimensions() {
        return new Vector(12, 6);
    }

    getTotalBuildingsNeeded() {
        let buildings = this.getBaseBuildingsNeeded();
        buildings.set("cutter.default", { count: 1 });
        buildings.set("rotater.rotate180", { count: 2 });
        buildings.set("belt.default", { count: 9 });
        buildings.set("balancer.splitter-inverse", { count: 2 });
        buildings.set("balancer.splitter", { count: 1 });
        buildings.set("trash.default", { count: 1 });
        buildings.set("stacker.default", { count: 6 });
        buildings.set("balancer.default", { count: 3 });
        buildings.set("rotater.default", { count: 2 });

        return buildings;
    }

    setupLevel(root) {
        return [
            ["hub", new Vector(11, 1), "left", 0, 0, "default"],
            ["item_producer", new Vector(0, 1), "right", 0, 0, "default", "Cu----Cu"],
        ];
    }
}
