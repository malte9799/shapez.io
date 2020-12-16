import { enumDirection, Vector } from "../../core/vector";
import { Level } from "../level";
import { MetaHubBuilding } from "../buildings/hub";
import { MetaItemProducerBuilding } from "../buildings/item_producer";

export class Level_3 extends Level {
    constructor() {
        super("level_3", 2);
    }

    getDimensions() {
        return new Vector(4, 10);
    }

    // { root, origin, rotation, originalRotation, rotationVariant, variant }
    setupLevel(root) {
        return [
            ["hub", new Vector(1, 0), "bottom", 0, 0, "default"],
            ["item_producer", new Vector(0, 6), "right", 0, 0, "default", "blue"],
            ["item_producer", new Vector(3, 6), "left", 0, 0, "default", "CuCuRuRu"],
        ]
    }
}
