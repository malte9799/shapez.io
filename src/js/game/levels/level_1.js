import { Vector } from "../../core/vector";
import { Level } from "../level";

export class Level_1 extends Level {
    constructor() {
        super("level_1", 0);
    }

    getDimensions() {
        return new Vector(5, 6);
    }

    // { root, origin, rotation, originalRotation, rotationVariant, variant }
    setupLevel(root) {
        return [
            ["hub", new Vector(4, 1), "left", 0, 0, "default"],
            ["item_producer", new Vector(0, 1), "right", 0, 0, "default", "RuRuRuRu"],
            ["item_producer", new Vector(0, 2), "right", 0, 0, "default", "RuRuRuRu"],
            ["item_producer", new Vector(0, 3), "right", 0, 0, "default", "RuRuRuRu"],
            ["item_producer", new Vector(0, 4), "right", 0, 0, "default", "RuRuRuRu"],
        ];
    }
}
