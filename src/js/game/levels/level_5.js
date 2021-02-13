import { Vector } from "../../core/vector";
import { Level } from "../level";

export class Level_5 extends Level {
    constructor() {
        super("level_5", 4);
    }

    getDimensions() {
        return new Vector(7, 6);
    }

    // { root, origin, rotation, originalRotation, rotationVariant, variant }
    setupLevel(root) {
        return [
            ["hub", new Vector(6, 1), "left", 0, 0, "default"],
            ["item_producer", new Vector(0, 1), "right", 0, 0, "default", "CuRuSuRu"],
            ["item_producer", new Vector(3, 0), "bottom", 0, 0, "default", "--Cu----"],
        ];
    }
}
