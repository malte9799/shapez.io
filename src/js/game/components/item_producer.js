import { gItemRegistry } from "../../core/global_registries";
import { types } from "../../savegame/serialization";
import { Component } from "../component";
import { BaseItem } from "../base_item";
import { typeItemSingleton } from "../item_resolver";

export class ItemProducerComponent extends Component {
    static getId() {
        return "ItemProducer";
    }

    static getSchema() {
        return {
            item: types.nullable(typeItemSingleton),
        };
    }

    /**
     *
     * @param {object} param0
     * @param {BaseItem=} param0.item The signal to store
     */
    constructor({ item = null }) {
        super();
        this.item = item;
    }
}
