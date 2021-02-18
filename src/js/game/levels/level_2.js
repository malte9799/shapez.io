import { Vector } from "../../core/vector";
import { Level } from "../level";

export class Level_2 extends Level {
    constructor() {
        super("level_2", 1);
    }

    getDimensions() {
        return new Vector(5, 5);
    }

    getTotalBuildingsNeeded() {
        let buildings = this.getBaseBuildingsNeeded();
        buildings.set("painter.default", { count: 1 });
        buildings.set("mixer.default", { count: 2 });
        buildings.set("belt.default", { count: 3 });

        return buildings;
    }

    setupLevel(root) {
        return [
            ["hub", new Vector(0, 1), "right", 0, 0, "default"],
            ["item_producer", new Vector(3, 0), "bottom", 0, 0, "default", "SuSuSuSu"],
            ["item_producer", new Vector(4, 2), "left", 0, 0, "default", "blue"],
            ["item_producer", new Vector(4, 3), "left", 0, 0, "default", "green"],
            ["item_producer", new Vector(1, 4), "top", 0, 0, "default", "red"],
        ];
    }
}
