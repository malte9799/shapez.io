import { generateMatrixRotations } from "../../core/utils";
import { enumDirection, Vector } from "../../core/vector";
import { WallComponent } from "../components/wall";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";

const overlayMatrix = generateMatrixRotations([1, 1, 1, 1, 0, 1, 1, 1, 1]);

export class MetaWallBuilding extends MetaBuilding {
    constructor() {
        super("wall");
    }

    getIsRotateable() {
        return false;
    }

    getIsRemovable() {
        return false;
    }

    getSilhouetteColor() {
        return "#333";
    }

    getDimensions() {
        return new Vector(1, 1);
    }

    getSpecialOverlayRenderMatrix(rotation) {
        return overlayMatrix[rotation];
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        entity.addComponent(new WallComponent());
    }
}
