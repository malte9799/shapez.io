import { Vector } from "../../core/vector";
import { Level } from "../level";

export class Level_1 extends Level {
    constructor() {
        super("level_1", 0);
    }

    getDimensions() {
        return new Vector(5, 6);
    }

    getTotalBuildingsNeeded() {
        let buildings = this.getBaseBuildingsNeeded();
        buildings.set("cutter.default", { count: 1 });
        buildings.set("stacker.default", { count: 3 });
        buildings.set("rotater.rotate180", { count: 1 });

        return buildings;
    }

    setupLevel() {
        return [
            ["hub", new Vector(4, 1), "left", 0, 0, "default"],
            ["item_producer", new Vector(0, 1), "right", 0, 0, "default", "RuRuRuRu"],
            ["item_producer", new Vector(0, 2), "right", 0, 0, "default", "RuRuRuRu"],
            ["item_producer", new Vector(0, 3), "right", 0, 0, "default", "RuRuRuRu"],
            ["item_producer", new Vector(0, 4), "right", 0, 0, "default", "RuRuRuRu"],
        ];
    }
}
