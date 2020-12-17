import { ItemProducerComponent } from "../components/item_producer";
import { GameSystemWithFilter } from "../game_system_with_filter";

import { globalConfig } from "../../core/config";
import { enumColors } from "../colors";
import { BaseItem } from "../base_item";
import { ColorItem, COLOR_ITEM_SINGLETONS } from "../items/color_item";
import { MapChunkView } from "../map_chunk_view";

export class ItemProducerSystem extends GameSystemWithFilter {
    constructor(root) {
        super(root, [ItemProducerComponent]);
    }

    update() {
        for (let i = 0; i < this.allEntities.length; ++i) {
            const entity = this.allEntities[i];
            const pinsComp = entity.components.WiredPins;
            const producerComp = entity.components.ItemProducer;
            const pin = pinsComp.slots[0];
            const network = pin.linkedNetwork;

            if ((!network || !network.hasValue()) && !producerComp.item) {
                continue;
            }

            const ejectorComp = entity.components.ItemEjector;
            const ejectItem = (producerComp.item) ? producerComp.item : network.currentValue;
            ejectorComp.tryEject(0, ejectItem);
        }
    }

    /**
     * Draws a given chunk
     * @param {import("../../core/draw_utils").DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(parameters, chunk) {
        const contents = chunk.containedEntitiesByLayer.regular;
        for (let i = 0; i < contents.length; ++i) {
            const entity = contents[i];
            if (entity && entity.components.ItemProducer) {
                const producerComp = entity.components.ItemProducer;
                const network = entity.components.WiredPins.slots[0].linkedNetwork;

                if ((!network || !network.hasValue()) && !producerComp.item) continue;

                const value = (producerComp.item) ? producerComp.item : network.currentValue;

                const origin = entity.components.StaticMapEntity.origin;
                value.drawItemCenteredClipped(
                    (origin.x + 0.5) * globalConfig.tileSize,
                    (origin.y + 0.5) * globalConfig.tileSize,
                    parameters,
                    25
                );
            }
        }
    }
}
