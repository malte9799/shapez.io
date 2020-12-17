import { enumDirection, Vector } from "../../core/vector";
import { Level } from "../level";
import { MetaHubBuilding } from "../buildings/hub";
import { MetaItemProducerBuilding } from "../buildings/item_producer";

export class Level_9 extends Level {
    constructor() {
        super("level_9", 8);
    }

    getDimensions() {
        return new Vector(8, 11);
    }

    // { root, origin, rotation, originalRotation, rotationVariant, variant }
    setupLevel(root) {
        return [
            ["hub", new Vector(5, 10), "top", 0, 0, "default"],
            ["item_producer", new Vector(1, 0), "bottom", 0, 0, "default", "green"],
            ["item_producer", new Vector(3, 0), "bottom", 0, 0, "default", "red"],
            ["item_producer", new Vector(5, 0), "bottom", 0, 0, "default", "blue"],
            ["item_producer", new Vector(6, 0), "bottom", 0, 0, "default", "WuWuWuWu"],
        ]
    }
}
