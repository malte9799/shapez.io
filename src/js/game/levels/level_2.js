import { enumDirection, Vector } from "../../core/vector";
import { Level } from "../level";
import { MetaHubBuilding } from "../buildings/hub";
import { MetaItemProducerBuilding } from "../buildings/item_producer";

export class Level_2 extends Level {
    constructor() {
        super("level_2", 1);
    }

    getDimensions() {
        return new Vector(5, 5);
    }

    // { root, origin, rotation, originalRotation, rotationVariant, variant }
    setupLevel(root) {
        return [
            ["hub", new Vector(0, 1), "right", 0, 0, "default"],
            ["item_producer", new Vector(0, 3), "bottom", 0, 0, "default"],
            ["item_producer", new Vector(4, 2), "right", 0, 0, "default"],
            ["item_producer", new Vector(4, 3), "right", 0, 0, "default"],
            ["item_producer", new Vector(1, 4), "top", 0, 0, "default"],
        ]
    }
}
