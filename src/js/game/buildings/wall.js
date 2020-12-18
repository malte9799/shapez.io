import { enumDirection, Vector } from "../../core/vector";
import { WallComponent } from "../components/wall";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";

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
        return "#444";
    }

    getDimensions() {
        return new Vector(1, 1);
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        entity.addComponent(new WallComponent());
    }
}
