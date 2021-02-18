import { Vector } from "../../core/vector";
import { Level } from "../level";

export class Level_3 extends Level {
    constructor() {
        super("level_3", 2);
    }

    getDimensions() {
        return new Vector(4, 10);
    }

    getTotalBuildingsNeeded() {
        let buildings = this.getBaseBuildingsNeeded();
        buildings.set("stacker.default", { count: 1 });
        buildings.set("rotater.rotate180", { count: 1 });
        buildings.set("balancer.default", { count: 1 });
        buildings.set("trash.default", { count: 1 });
        buildings.set("cutter.default", { count: 1 });
        buildings.set("painter.default", { count: 1 });
        buildings.set("belt.default", { count: 5 });
        buildings.set("rotater.default", { count: 1 });

        return buildings;
    }

    setupLevel(root) {
        return [
            ["hub", new Vector(1, 0), "bottom", 0, 0, "default"],
            ["item_producer", new Vector(0, 6), "right", 0, 0, "default", "blue"],
            ["item_producer", new Vector(3, 6), "left", 0, 0, "default", "CuCuRuRu"],
        ];
    }
}
