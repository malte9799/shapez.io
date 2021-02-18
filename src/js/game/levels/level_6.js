import { Vector } from "../../core/vector";
import { Level } from "../level";

export class Level_6 extends Level {
    constructor() {
        super("level_6", 5);
    }

    getDimensions() {
        return new Vector(7, 10);
    }

    getTotalBuildingsNeeded() {
        let buildings = this.getBaseBuildingsNeeded();
        buildings.set("balancer.splitter", { count: 4 });
        buildings.set("underground_belt.default", { count: 4 });
        buildings.set("belt.default", { count: 16 });
        buildings.set("balancer.splitter-inverse", { count: 2 });
        buildings.set("painter.double", { count: 2 });
        buildings.set("painter.mirrored", { count: 1 });
        buildings.set("balancer.merger-inverse", { count: 2 });

        return buildings;
    }

    setupLevel(root) {
        return [
            ["hub", new Vector(5, 0), "bottom", 0, 0, "default"],
            ["item_producer", new Vector(0, 1), "right", 0, 0, "default", "red"],
            ["item_producer", new Vector(0, 5), "right", 0, 0, "default", "WuWuWuWu"],
        ];
    }
}
