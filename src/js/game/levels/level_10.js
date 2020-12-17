import { enumDirection, Vector } from "../../core/vector";
import { Level } from "../level";
import { MetaHubBuilding } from "../buildings/hub";
import { MetaItemProducerBuilding } from "../buildings/item_producer";

export class Level_10 extends Level {
    constructor() {
        super("level_10", 9);
    }

    getDimensions() {
        return new Vector(10, 7);
    }

    // { root, origin, rotation, originalRotation, rotationVariant, variant }
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
        ]
    }
}
