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
            ["item_producer", new Vector(0, 1), "right", 0, 0, "default", "RuRuRuRu"],
            ["item_producer", new Vector(2, 5), "top", 0, 0, "default", "blue"],
            ["item_producer", new Vector(3, 5), "top", 0, 0, "default", "green"],
            ["item_producer", new Vector(4, 5), "top", 0, 0, "default", "red"],
        ]
    }
}
