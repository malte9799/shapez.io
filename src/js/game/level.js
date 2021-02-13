import { globalConfig } from "../core/config";
import { Vector } from "../core/vector";
import { GameRoot } from "./root";
import { gMetaBuildingRegistry } from "../core/global_registries";

import trim from "trim";
import { enumColors } from "./colors";
import { BOOL_FALSE_SINGLETON, BOOL_TRUE_SINGLETON } from "./items/boolean_item";
import { COLOR_ITEM_SINGLETONS } from "./items/color_item";
import { ShapeDefinition } from "./shape_definition";
import { BaseItem } from "../game/base_item";

const rotation = {
    top: 0,
    right: 90,
    bottom: 180,
    left: 270,
};

export class Level {
    /**
     *
     * @param {string} id Level id
     * @param {number} lvlNum Level number
     */
    constructor(id, lvlNum) {
        this.id = id;
        this.lvlNum = lvlNum;
        this.root = null;
    }

    /**
     * Returns the id of this Level
     */
    getId() {
        return this.id;
    }

    /**
     * Returns the Origin chunk tile of the level
     */
    getOriginChunk() {
        return new Vector((this.lvlNum % 5) * 2, Math.floor(this.lvlNum / 5) * 2);
    }

    /**
     * Returns the Origin tile of the level (upper left corner)
     */
    getOrigin() {
        const center = this.getCenterTile();
        const dimensions = this.getDimensions();
        const x = center.x - Math.round(dimensions.x / 2);
        const y = center.y - Math.round(dimensions.y / 2);
        return new Vector(x, y);
    }

    /**
     * Returns the Center tile of a level
     */
    getCenterTile() {
        const originChunk = this.getOriginChunk();
        return new Vector(
            originChunk.x * globalConfig.mapChunkSize + globalConfig.mapChunkSize,
            originChunk.y * globalConfig.mapChunkSize + globalConfig.mapChunkSize
        );
    }

    /**
     * Returns the Real Center of a level (might be of by half a tile)
     */
    getRealCenter() {
        const origin = this.getOrigin();
        const dim = this.getDimensions();
        return new Vector(origin.x + dim.x / 2, origin.y + dim.y / 2);
    }

    /**
     * Tests if the tile is inside a level
     * @param {Vector} tile
     */
    isLvlTiles(tile) {
        const lvlOrigin = this.getOrigin();
        const dimensions = this.getDimensions();

        if (
            tile.x < lvlOrigin.x + 1 ||
            tile.y < lvlOrigin.y + 1 ||
            tile.x > lvlOrigin.x + dimensions.x - 2 ||
            tile.y > lvlOrigin.y + dimensions.y - 2
        )
            return false;
        return true;
    }

    isLvlLoaded() {
        return this.root.map.getTileContent(this.getOrigin(), "regular") != null;
    }

    /**
     * Should setup/load the Level and move Camera to it
     * @param {GameRoot} root
     */
    load(root) {
        this.root = root;
        if (!this.isLvlLoaded()) this.createLevel();
        root.camera.setDesiredCenter(this.getRealCenter().toWorldSpace());
        root.camera.setDesiredZoom(1);
    }

    /**
     * Should return the dimensions of the Level
     */
    getDimensions() {
        return new Vector(1, 1);
    }

    /**
     * Should setup the Level
     * @param {GameRoot} root
     * @returns {any}
     */
    setupLevel(root) {
        abstract;
    }

    /**
     * Creates the Level and placing it
     */
    createLevel() {
        const origin = this.getOrigin();

        // place special buildings
        const lvlBuildings = this.setupLevel(this.root);
        for (let i in lvlBuildings) {
            const param = lvlBuildings[i];
            let entity = gMetaBuildingRegistry.findById(param[0]).createEntity({
                root: this.root,
                origin: new Vector(origin.x + param[1].x, origin.y + param[1].y),
                rotation: rotation[param[2]],
                originalRotation: param[3],
                rotationVariant: param[4],
                variant: param[5],
            });
            if (param.length >= 7 && param[0] == "item_producer") {
                entity.components.ItemProducer.item = this.parseSignalCode(this.root, param[6]);
            }
            this.root.map.placeStaticEntity(entity);
            this.root.entityMgr.registerEntity(entity);
        }

        // place walls
        const dimensions = this.getDimensions();
        for (var x = 0; x <= dimensions.x - 1; x++) {
            for (var y = 0; y <= dimensions.y - 1; y++) {
                if (y != 0 && y != dimensions.y - 1 && x != 0 && x != dimensions.x - 1) {
                    continue;
                }
                const tile = new Vector(x + origin.x, y + origin.y);
                if (!this.root.map.getTileContent(tile, "regular")) {
                    let entity = gMetaBuildingRegistry.findById("wall").createEntity({
                        root: this.root,
                        origin: tile,
                        rotation: 0,
                        originalRotation: 0,
                        rotationVariant: 0,
                        variant: "default",
                    });
                    this.root.map.placeStaticEntity(entity);
                    this.root.entityMgr.registerEntity(entity);
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
    }
}
