import { enumDirection, Vector } from "../../core/vector";
import { Level } from "../level";
import { MetaHubBuilding } from "./buildings/hub";
import { MetaItemProducerBuilding } from "./buildings/item_producer";


export class Level_1 extends Level {
    constructor() {
        super("level_1");
    }

    getDimensions() {
        return new Vector(5, 6);
    }
    createEntity({ root, origin, rotation, originalRotation, rotationVariant, variant }) {
    setupLevel(level) {
        new MetaHubBuilding.createEntity(root, new Vector(4, 1), );

        level.addBuilding(new MetaItemProducerBuilding({pos: new vector(0, 1), direction: enumDirection.left}));
        level.addBuilding(new MetaItemProducerBuilding({pos: new vector(0, 2), direction: enumDirection.left}));
        level.addBuilding(new MetaItemProducerBuilding({pos: new vector(0, 3), direction: enumDirection.left}));
        level.addBuilding(new MetaItemProducerBuilding({pos: new vector(0, 4), direction: enumDirection.left}));
    }
}
