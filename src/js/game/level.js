import { globalConfig } from "../core/config";
import { Loader } from "../core/loader";
import { AtlasSprite } from "../core/sprites";
import { Vector } from "../core/vector";
import { SOUNDS } from "../platform/sound";
import { StaticMapEntityComponent } from "./components/static_map_entity";
import { Entity } from "./entity";
import { GameRoot } from "./root";
import { getCodeFromBuildingData } from "./building_codes";
import { gMetaBuildingRegistry } from "../core/global_registries";

import trim from "trim";
import { enumColors } from "./colors";
import { BOOL_FALSE_SINGLETON, BOOL_TRUE_SINGLETON } from "./items/boolean_item";
import { COLOR_ITEM_SINGLETONS } from "./items/color_item";
import { ShapeDefinition } from "./shape_definition";


const rotation = {
    "top": 0,
    "right": 90,
    "bottom": 180,
    "left": 270
}

export class Level {
    /**
     *
     * @param {string} id Level id
     * @param {num} lvlNum Level number
     */
    constructor(id, lvlNum) {
        this.id = id;
        this.lvlNum = lvlNum;
    }

    /**
     * Returns the id of this Level
     */
    getId() {
        return this.id;
    }

    getOrigin() {
        const originChunk = new Vector((this.lvlNum % 5) * 2, Math.floor(this.lvlNum/5) * 2);
        const dimensions = this.getDimensions();
        const x = originChunk.x * globalConfig.mapChunkSize + globalConfig.mapChunkSize - Math.round(dimensions.x / 2)
        const y = originChunk.y * globalConfig.mapChunkSize + globalConfig.mapChunkSize - Math.round(dimensions.y / 2)
        return new Vector(x, y)
    }

    isLvlTiles(tile) {
        const lvlOrigin = this.getOrigin()
        const dimensions = this.getDimensions();

        if (tile.x < lvlOrigin.x + 1 || tile.y < lvlOrigin.y + 1 || tile.x > lvlOrigin.x + dimensions.x - 2 || tile.y > lvlOrigin.y + dimensions.y - 2) return false
        return true
    }

    /**
     * Should return the dimensions of the Level
     */
    getDimensions() {
        return new Vector(1, 1);
    }

    /**
     * Should setup the Level
     * @param {Level} level
     * @param {GameRoot} root
     */
    setupLevel(level, root) {
        abstract;
    }

    /**
     * Creates the Level and placing it
     * @param {object} param0
     * @param {GameRoot} param0.root
     */
    createLevel(root) {
        const origin = this.getOrigin()

        const lvlBuildings = this.setupLevel(root)
        for (let i in lvlBuildings) {
            const param = lvlBuildings[i]
            let entity = gMetaBuildingRegistry.findById(param[0]).createEntity({
                root: this.root,
                origin: new Vector(origin.x + param[1].x, origin.y + param[1].y),
                rotation: rotation[param[2]],
                originalRotation: param[3],
                rotationVariant: param[4],
                variant: param[5]
            })
            if (param.length >= 7 && param[0] == "item_producer") {
                entity.components.ItemProducer.item = this.parseSignalCode(root, param[6]);
            }
            root.map.placeStaticEntity(entity);
            root.entityMgr.registerEntity(entity);
        };

        const dimensions = this.getDimensions();
        for (var x = 0; x <= dimensions.x - 1; x++) {
            for (var y = 0; y <= dimensions.y - 1; y++) {
                if (y != 0 && y != dimensions.y - 1 && x != 0 && x != dimensions.x - 1) {
                    continue;
                }
                const tile = new Vector(x + origin.x, y + origin.y)
                if (!root.map.getTileContent(tile, "regular")) {
                    let entity = gMetaBuildingRegistry.findById("wall").createEntity({
                        root: this.root,
                        origin: tile,
                        rotation: 0,
                        originalRotation: 0,
                        rotationVariant: 0,
                        variant: "default"
                    });
                    root.map.placeStaticEntity(entity);
                    root.entityMgr.registerEntity(entity);
                }
            }
        }
    }

    /**
     * Tries to parse a signal code
     * @param {string} code
     * @returns {BaseItem}
     */
    parseSignalCode(root, code) {
        if (!root || !root.shapeDefinitionMgr) {
            // Stale reference
            return null;
        }

        code = trim(code);
        const codeLower = code.toLowerCase();

        if (enumColors[codeLower]) {
            return COLOR_ITEM_SINGLETONS[codeLower];
        }
        if (code === "1" || codeLower === "true") {
            return BOOL_TRUE_SINGLETON;
        }

        if (code === "0" || codeLower === "false") {
            return BOOL_FALSE_SINGLETON;
        }

        if (ShapeDefinition.isValidShortKey(code)) {
            return root.shapeDefinitionMgr.getShapeItemFromShortKey(code);
        }

        return null;
    };
}
