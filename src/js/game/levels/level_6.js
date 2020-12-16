import { enumDirection, Vector } from "../../core/vector";
import { Level } from "../level";
import { MetaHubBuilding } from "../buildings/hub";
import { MetaItemProducerBuilding } from "../buildings/item_producer";

export class Level_6 extends Level {
    constructor() {
        super("level_6", 5);
    }

    getDimensions() {
        return new Vector(7, 10);
    }

    // { root, origin, rotation, originalRotation, rotationVariant, variant }
    setupLevel(root) {
        return [
            ["hub", new Vector(5, 0), "bottom", 0, 0, "default"],
            ["item_producer", new Vector(0, 1), "right", 0, 0, "default", "red"],
            ["item_producer", new Vector(0, 5), "right", 0, 0, "default", "CuCuCuCu"],
        ]
    }
}
