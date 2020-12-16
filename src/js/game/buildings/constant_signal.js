import { enumDirection, Vector } from "../../core/vector";
import { enumPinSlotType, WiredPinsComponent } from "../components/wired_pins";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { GameRoot } from "../root";
import { ConstantSignalComponent } from "../components/constant_signal";
import { generateMatrixRotations } from "../../core/utils";

const overlayMatrix = generateMatrixRotations([0, 1, 0, 1, 1, 1, 1, 1, 1]);

export class MetaConstantSignalBuilding extends MetaBuilding {
    constructor() {
        super("constant_signal");
    }

    getSilhouetteColor() {
        return "#2b84fd";
    }

    /** @returns {"wires"} **/
    getLayer() {
        return "wires";
    }

    getDimensions() {
        return new Vector(1, 1);
    }

    getRenderPins() {
        return false;
    }

    getSpecialOverlayRenderMatrix(rotation) {
        return overlayMatrix[rotation];
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        entity.addComponent(
            new WiredPinsComponent({
                slots: [
                    {
                        pos: new Vector(0, 0),
                        direction: enumDirection.top,
                        type: enumPinSlotType.logicalEjector,
                    },
                ],
            })
        );
        entity.addComponent(new ConstantSignalComponent({}));
    }
}
