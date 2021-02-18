import { Vector } from "../../core/vector";
import { Level } from "../level";

export class Level_5 extends Level {
    constructor() {
        super("level_5", 4);
    }

    getDimensions() {
        return new Vector(7, 6);
    }

    getTotalBuildingsNeeded() {
        let buildings = this.getBaseBuildingsNeeded();
        buildings.set("cutter.quad", { count: 1 });
        buildings.set("trash.default", { count: 2 });
        buildings.set("belt.default", { count: 2 });
        buildings.set("rotater.default", { count: 1 });
        buildings.set("balancer.splitter-inverse", { count: 1 });
        buildings.set("stacker.default", { count: 3 });
        buildings.set("rotater.rotate180", { count: 1 });

        return buildings;
    }

    setupLevel(root) {
        return [
            ["hub", new Vector(6, 1), "left", 0, 0, "default"],
            ["item_producer", new Vector(0, 1), "right", 0, 0, "default", "CuRuSuRu"],
            ["item_producer", new Vector(3, 0), "bottom", 0, 0, "default", "--Cu----"],
        ];
    }
}
