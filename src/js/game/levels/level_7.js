import { Vector } from "../../core/vector";
import { Level } from "../level";

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
            ["item_producer", new Vector(1, 0), "bottom", 0, 0, "default", "RuRuCuCu"],
            ["item_producer", new Vector(2, 0), "bottom", 0, 0, "default", "red"],
            ["item_producer", new Vector(6, 0), "bottom", 0, 0, "default", "green"],
            ["item_producer", new Vector(4, 6), "top", 0, 0, "default", "blue"],
        ];
    }
}
