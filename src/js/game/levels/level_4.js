import { enumDirection, Vector } from "../../core/vector";
import { Level } from "../level";
import { MetaHubBuilding } from "../buildings/hub";
import { MetaItemProducerBuilding } from "../buildings/item_producer";

export class Level_4 extends Level {
    constructor() {
        super("level_4", 3);
    }

    getDimensions() {
        return new Vector(7, 6);
    }

    // { root, origin, rotation, originalRotation, rotationVariant, variant }
    setupLevel(root) {
        return [
            ["hub", new Vector(6, 4), "left", 0, 0, "default"],
            ["item_producer", new Vector(0, 1), "right", 0, 0, "default"],
            ["item_producer", new Vector(5, 2), "top", 0, 0, "default"],
            ["item_producer", new Vector(5, 3), "top", 0, 0, "default"],
            ["item_producer", new Vector(5, 4), "top", 0, 0, "default"],
        ]
    }
}
