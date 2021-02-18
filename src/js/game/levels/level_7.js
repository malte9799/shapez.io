import { Vector } from "../../core/vector";
import { Level } from "../level";

export class Level_7 extends Level {
    constructor() {
        super("level_7", 6);
    }

    getDimensions() {
        return new Vector(8, 7);
    }

    getTotalBuildingsNeeded() {
        let buildings = this.getBaseBuildingsNeeded();
        buildings.set("rotater.default", { count: 1 });
        buildings.set("painter.default", { count: 2 });
        buildings.set("belt.default", { count: 10 });
        buildings.set("mixer.default", { count: 2 });
        buildings.set("cutter.default", { count: 1 });
        buildings.set("rotater.ccw", { count: 1 });
        buildings.set("underground_belt.default", { count: 4 });
        buildings.set("balancer.splitter-inverse", { count: 1 });
        buildings.set("stacker.default", { count: 1 });

        return buildings;
    }

    setupLevel(root) {
        return [
            ["hub", new Vector(7, 4), "left", 0, 0, "default"],
            ["item_producer", new Vector(1, 0), "bottom", 0, 0, "default", "RuRuCuCu"],
            ["item_producer", new Vector(2, 0), "bottom", 0, 0, "default", "red"],
            ["item_producer", new Vector(6, 0), "bottom", 0, 0, "default", "green"],
            ["item_producer", new Vector(4, 6), "top", 0, 0, "default", "blue"],
        ];
    }
}
