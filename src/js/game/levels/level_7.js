import { enumDirection, Vector } from "../../core/vector";
import { Level } from "../level";
import { MetaHubBuilding } from "../buildings/hub";
import { MetaItemProducerBuilding } from "../buildings/item_producer";

export class Level_7 extends Level {
    constructor() {
        super("level_7", 6);
    }

    getDimensions() {
        return new Vector(8, 7);
    }

    // { root, origin, rotation, originalRotation, rotationVariant, variant }
    setupLevel(root) {
        return [
            ["hub", new Vector(7, 4), "left", 0, 0, "default"],
            ["item_producer", new Vector(0, 1), "bottom", 0, 0, "default"],
            ["item_producer", new Vector(0, 2), "bottom", 0, 0, "default"],
            ["item_producer", new Vector(0, 6), "bottom", 0, 0, "default"],
            ["item_producer", new Vector(6, 4), "top", 0, 0, "default"],
        ]
    }
}
