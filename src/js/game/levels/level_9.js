import { Vector } from "../../core/vector";
import { Level } from "../level";

export class Level_9 extends Level {
    constructor() {
        super("level_9", 8);
    }

    getDimensions() {
        return new Vector(8, 11);
    }

    getTotalBuildingsNeeded() {
        let buildings = this.getBaseBuildingsNeeded();
        buildings.set("balancer.splitter-inverse", { count: 2 });
        buildings.set("underground_belt.default", { count: 6 });
        buildings.set("belt.default", { count: 23 });
        buildings.set("mixer.default", { count: 2 });
        buildings.set("lever.default", { count: 1 });
        buildings.set("painter.quad", { count: 1 });
        buildings.set("balancer.splitter", { count: 2 });
        buildings.set("balancer.default", { count: 1 });
        buildings.set("stacker.default", { count: 1 });
        buildings.set("painter.mirrored", { count: 1 });

        return buildings;
    }

    setupLevel(root) {
        return [
            ["hub", new Vector(5, 10), "top", 0, 0, "default"],
            ["item_producer", new Vector(1, 0), "bottom", 0, 0, "default", "green"],
            ["item_producer", new Vector(3, 0), "bottom", 0, 0, "default", "red"],
            ["item_producer", new Vector(5, 0), "bottom", 0, 0, "default", "blue"],
            ["item_producer", new Vector(6, 0), "bottom", 0, 0, "default", "WuWuWuWu"],
        ];
    }
}
