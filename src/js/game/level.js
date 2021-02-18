import { globalConfig } from "../core/config";
import { Vector } from "../core/vector";
import { GameRoot } from "./root";
import { gMetaBuildingRegistry } from "../core/global_registries";
import { getBuildingDataFromCode } from "./building_codes";

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
     * @returns {Vector}
     */
    getOriginChunk() {
        return new Vector((this.lvlNum % 5) * 2, Math.floor(this.lvlNum / 5) * 2);
    }

    /**
     * Returns the Origin tile of the level (upper left corner)
     * @returns {Vector}
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
     * @returns {Vector}
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
     * @returns {Vector}
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
     * @returns {Vector} Dimensions
     */
    getDimensions() {
        return new Vector(1, 1);
    }

    getBaseBuildingsNeeded() {
        let buildings = new Map();
        buildings.set("belt.default", { count: 0 });
        buildings.set("balancer.splitter", { count: 0 });
        buildings.set("underground_belt.tier2", { count: 0 });
        buildings.set("rotater.default", { count: 0 });
        buildings.set("mixer.default", { count: 0 });
        buildings.set("painter.default", { count: 0 });
        buildings.set("painter.mirrored", { count: 0 });
        buildings.set("painter.quad", { count: 0 });
        buildings.set("balancer.default", { count: 0 });
        buildings.set("balancer.splitter-inverse", { count: 0 });
        buildings.set("miner.chainable", { count: 0 });
        buildings.set("rotater.ccw", { count: 0 });
        buildings.set("underground_belt.default", { count: 0 });
        buildings.set("cutter.default", { count: 0 });
        buildings.set("rotater.rotate180", { count: 0 });
        buildings.set("trash.default", { count: 0 });
        buildings.set("painter.double", { count: 0 });
        buildings.set("balancer.merger", { count: 0 });
        buildings.set("stacker.default", { count: 0 });
        buildings.set("balancer.merger-inverse", { count: 0 });
        buildings.set("cutter.quad", { count: 0 });

        return buildings;
    }

    /**
     * Should return all buildings needed to complete this level
     * @returns {Map} List of Building
     */
    getTotalBuildingsNeeded() {
        return new Map();
    }

    /**
     * Should return all buildings needed to complete this level based of the buildings placed
     * @returns {Map} List of Building
     */
    getBuildingsNeeded() {
        const totalBuildings = this.getTotalBuildingsNeeded();
        const placedBuildings = this.getBuildingsPlaced();

        totalBuildings.forEach((value, key) => {
            if (placedBuildings.has(key)) {
                const count = placedBuildings.get(key)["count"];
                if (value["count"] - count == 0) {
                    totalBuildings.delete(key);
                } else {
                    totalBuildings.set(key, { count: value["count"] - count });
                }
            } else {
                if (value["count"] == 0) totalBuildings.delete(key);
            }
        });

        return totalBuildings;
    }

    /**
     * Should return the buildings already placed in the level
     * @returns {Map} List of Building
     */
    getBuildingsPlaced() {
        const origin = this.getOrigin();
        const dim = this.getDimensions();
        let selectedUids = [];
        let arr = [];
        let counts = new Map();

        for (let x = origin.x + 1; x <= origin.x + dim.x - 2; ++x) {
            for (let y = origin.y + 1; y <= origin.y + dim.y - 2; ++y) {
                const contents = this.root.map.getLayerContentXY(x, y, this.root.currentLayer);
                if (contents && !selectedUids.includes(contents.uid)) {
                    selectedUids.push(contents.uid);
                }
            }
        }

        for (let i = 0; i < selectedUids.length; ++i) {
            const StaticMapEntity = this.root.entityMgr.findByUid(selectedUids[i]).components.StaticMapEntity;
            const buildingData = getBuildingDataFromCode(StaticMapEntity.code);
            arr.push(buildingData.metaInstance.id + "." + buildingData.variant);
        }

        arr.forEach(function (x) {
            let newCount = 1;
            if (counts.has(x)) {
                newCount = counts.get(x)["count"] + 1;
            }
            counts.set(x, { count: newCount });
        });

        return counts;
    }

    /**
     * Should setup the Level
     * { buildingName, origin, rotation, originalRotation, rotationVariant, variant, extra }
     * @returns {any}
     */
    setupLevel() {
        abstract;
    }

    /**
     * Creates the Level and placing it
     */
    createLevel() {
        const origin = this.getOrigin();

        // place special buildings
        const lvlBuildings = this.setupLevel();
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
