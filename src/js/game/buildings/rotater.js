import { formatItemsPerSecond, generateMatrixRotations } from "../../core/utils";
import { enumDirection, Vector } from "../../core/vector";
import { T } from "../../translations";
import { ItemAcceptorComponent } from "../components/item_acceptor";
import { ItemEjectorComponent } from "../components/item_ejector";
import { enumItemProcessorTypes, ItemProcessorComponent } from "../components/item_processor";
import { Entity } from "../entity";
import { defaultBuildingVariant, MetaBuilding } from "../meta_building";
import { GameRoot } from "../root";

/** @enum {string} */
export const enumRotaterVariants = { ccw: "ccw", rotate180: "rotate180" };

const overlayMatrices = {
    [defaultBuildingVariant]: generateMatrixRotations([0, 1, 1, 1, 1, 0, 0, 1, 1]),
    [enumRotaterVariants.ccw]: generateMatrixRotations([1, 1, 0, 0, 1, 1, 1, 1, 0]),
    [enumRotaterVariants.rotate180]: generateMatrixRotations([1, 1, 0, 1, 1, 1, 0, 1, 1]),
};

export class MetaRotaterBuilding extends MetaBuilding {
    constructor() {
        super("rotater");
    }

    getSilhouetteColor() {
        return "#7dc6cd";
    }

    /**
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {string} variant
     * @param {Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, variant, entity) {
        const matrix = overlayMatrices[variant];
        if (matrix) {
            return matrix[rotation];
        }
        return null;
    }

    /**
     * @param {GameRoot} root
     * @param {string} variant
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(root, variant) {
        switch (variant) {
            case defaultBuildingVariant: {
                const speed = root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.rotater);
                return [[T.ingame.buildingPlacement.infoTexts.speed, formatItemsPerSecond(speed)]];
            }
            case enumRotaterVariants.ccw: {
                const speed = root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.rotaterCCW);
                return [[T.ingame.buildingPlacement.infoTexts.speed, formatItemsPerSecond(speed)]];
            }
            case enumRotaterVariants.rotate180: {
                const speed = root.hubGoals.getProcessorBaseSpeed(enumItemProcessorTypes.rotater180);
                return [[T.ingame.buildingPlacement.infoTexts.speed, formatItemsPerSecond(speed)]];
            }
        }
    }

    /**
     *
     * @param {GameRoot} root
     */
    getAvailableVariants(root) {
        return [
            defaultBuildingVariant,
            enumRotaterVariants.ccw,
            enumRotaterVariants.rotate180
        ];
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        entity.addComponent(
            new ItemProcessorComponent({
                inputsPerCharge: 1,
                processorType: enumItemProcessorTypes.rotater,
            })
        );

        entity.addComponent(
            new ItemEjectorComponent({
                slots: [{ pos: new Vector(0, 0), direction: enumDirection.top }],
            })
        );
        entity.addComponent(
            new ItemAcceptorComponent({
                slots: [
                    {
                        pos: new Vector(0, 0),
                        directions: [enumDirection.bottom],
                        filter: "shape",
                    },
                ],
            })
        );
    }

    /**
     *
     * @param {Entity} entity
     * @param {number} rotationVariant
     * @param {string} variant
     */
    updateVariants(entity, rotationVariant, variant) {
        switch (variant) {
            case defaultBuildingVariant: {
                entity.components.ItemProcessor.type = enumItemProcessorTypes.rotater;
                break;
            }
            case enumRotaterVariants.ccw: {
                entity.components.ItemProcessor.type = enumItemProcessorTypes.rotaterCCW;
                break;
            }
            case enumRotaterVariants.rotate180: {
                entity.components.ItemProcessor.type = enumItemProcessorTypes.rotater180;
                break;
            }
            default:
                assertAlways(false, "Unknown rotater variant: " + variant);
        }
    }
}
