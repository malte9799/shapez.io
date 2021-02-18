import { Vector } from "../../core/vector";
import { Level } from "../level";

export class Level_10 extends Level {
    constructor() {
        super("level_10", 9);
    }

    getDimensions() {
        return new Vector(10, 7);
    }

    getTotalBuildingsNeeded() {
        let buildings = this.getBaseBuildingsNeeded();
        buildings.set("belt.default", { count: 12 });
        buildings.set("balancer.splitter", { count: 3 });
        buildings.set("balancer.merger-inverse", { count: 1 });
        buildings.set("rotater.default", { count: 2 });
        buildings.set("stacker.default", { count: 5 });
        buildings.set("painter.default", { count: 3 });
        buildings.set("underground_belt.default", { count: 2 });
        buildings.set("balancer.default", { count: 1 });

        return buildings;
    }

    setupLevel(root) {
        return [
            ["hub", new Vector(0, 5), "right", 0, 0, "default"],
            ["item_producer", new Vector(6, 0), "bottom", 0, 0, "default", "Ru--Ru--"],
            ["item_producer", new Vector(0, 3), "right", 0, 0, "default", "Su------"],
            ["item_producer", new Vector(0, 4), "right", 0, 0, "default", "----Su--"],
            ["item_producer", new Vector(9, 4), "left", 0, 0, "default", "red"],
            ["item_producer", new Vector(4, 0), "bottom", 0, 0, "default", "white"],
            ["item_producer", new Vector(4, 6), "top", 0, 0, "default", "white"],
            ["wall", new Vector(2, 3), "top", 0, 0, "default", "white"],
        ];
    }
}
