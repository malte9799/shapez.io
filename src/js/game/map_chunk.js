import { globalConfig } from "../core/config";
import { createLogger } from "../core/logging";
import { RandomNumberGenerator } from "../core/rng";
import { clamp, fastArrayDeleteValueIfContained, make2DUndefinedArray } from "../core/utils";
import { Vector } from "../core/vector";
import { BaseItem } from "./base_item";
import { enumColors } from "./colors";
import { Entity } from "./entity";
import { COLOR_ITEM_SINGLETONS } from "./items/color_item";
import { GameRoot } from "./root";
import { enumSubShape } from "./shape_definition";
import { Rectangle } from "../core/rectangle";

const logger = createLogger("map_chunk");

export class MapChunk {
    /**
     *
     * @param {GameRoot} root
     * @param {number} x
     * @param {number} y
     */
    constructor(root, x, y) {
        this.root = root;
        this.x = x;
        this.y = y;
        this.tileX = x * globalConfig.mapChunkSize;
        this.tileY = y * globalConfig.mapChunkSize;

        /**
         * Stores the contents of the lower (= map resources) layer
         *  @type {Array<Array<?BaseItem>>}
         */
        this.lowerLayer = make2DUndefinedArray(globalConfig.mapChunkSize, globalConfig.mapChunkSize);

        /**
         * Stores the contents of the regular layer
         * @type {Array<Array<?Entity>>}
         */
        this.contents = make2DUndefinedArray(globalConfig.mapChunkSize, globalConfig.mapChunkSize);

        /**
         * Stores the contents of the wires layer
         *  @type {Array<Array<?Entity>>}
         */
        this.wireContents = make2DUndefinedArray(globalConfig.mapChunkSize, globalConfig.mapChunkSize);

        /** @type {Array<Entity>} */
        this.containedEntities = [];

        /**
         * World space rectangle, can be used for culling
         */
        this.worldSpaceRectangle = new Rectangle(
            this.tileX * globalConfig.tileSize,
            this.tileY * globalConfig.tileSize,
            globalConfig.mapChunkWorldSize,
            globalConfig.mapChunkWorldSize
        );

        /**
         * Tile space rectangle, can be used for culling
         */
        this.tileSpaceRectangle = new Rectangle(
            this.tileX,
            this.tileY,
            globalConfig.mapChunkSize,
            globalConfig.mapChunkSize
        );

        /**
         * Which entities this chunk contains, sorted by layer
         * @type {Record<Layer, Array<Entity>>}
         */
        this.containedEntitiesByLayer = {
            regular: [],
            wires: [],
        };

        /**
         * Store which patches we have so we can render them in the overview
         * @type {Array<{pos: Vector, item: BaseItem, size: number }>}
         */
        this.patches = [];

    }


    /**
     *
     * @param {number} worldX
     * @param {number} worldY
     * @returns {BaseItem=}
     */
    getLowerLayerFromWorldCoords(worldX, worldY) {
        const localX = worldX - this.tileX;
        const localY = worldY - this.tileY;
        assert(localX >= 0, "Local X is < 0");
        assert(localY >= 0, "Local Y is < 0");
        assert(localX < globalConfig.mapChunkSize, "Local X is >= chunk size");
        assert(localY < globalConfig.mapChunkSize, "Local Y is >= chunk size");
        return this.lowerLayer[localX][localY] || null;
    }

    /**
     * Returns the contents of this chunk from the given world space coordinates
     * @param {number} worldX
     * @param {number} worldY
     * @returns {Entity=}
     */
    getTileContentFromWorldCoords(worldX, worldY) {
        const localX = worldX - this.tileX;
        const localY = worldY - this.tileY;
        assert(localX >= 0, "Local X is < 0");
        assert(localY >= 0, "Local Y is < 0");
        assert(localX < globalConfig.mapChunkSize, "Local X is >= chunk size");
        assert(localY < globalConfig.mapChunkSize, "Local Y is >= chunk size");
        return this.contents[localX][localY] || null;
    }

    /**
     * Returns the contents of this chunk from the given world space coordinates
     * @param {number} worldX
     * @param {number} worldY
     * @param {Layer} layer
     * @returns {Entity=}
     */
    getLayerContentFromWorldCoords(worldX, worldY, layer) {
        const localX = worldX - this.tileX;
        const localY = worldY - this.tileY;
        assert(localX >= 0, "Local X is < 0");
        assert(localY >= 0, "Local Y is < 0");
        assert(localX < globalConfig.mapChunkSize, "Local X is >= chunk size");
        assert(localY < globalConfig.mapChunkSize, "Local Y is >= chunk size");
        if (layer === "regular") {
            return this.contents[localX][localY] || null;
        } else {
            return this.wireContents[localX][localY] || null;
        }
    }
    /**
     * Returns the contents of this chunk from the given world space coordinates
     * @param {number} worldX
     * @param {number} worldY
     * @returns {Array<Entity>}
     */
    getLayersContentsMultipleFromWorldCoords(worldX, worldY) {
        const localX = worldX - this.tileX;
        const localY = worldY - this.tileY;
        assert(localX >= 0, "Local X is < 0");
        assert(localY >= 0, "Local Y is < 0");
        assert(localX < globalConfig.mapChunkSize, "Local X is >= chunk size");
        assert(localY < globalConfig.mapChunkSize, "Local Y is >= chunk size");

        const regularContent = this.contents[localX][localY];
        const wireContent = this.wireContents[localX][localY];

        const result = [];
        if (regularContent) {
            result.push(regularContent);
        }
        if (wireContent) {
            result.push(wireContent);
        }
        return result;
    }

    /**
     * Returns the chunks contents from the given local coordinates
     * @param {number} localX
     * @param {number} localY
     * @returns {Entity=}
     */
    getTileContentFromLocalCoords(localX, localY) {
        assert(localX >= 0, "Local X is < 0");
        assert(localY >= 0, "Local Y is < 0");
        assert(localX < globalConfig.mapChunkSize, "Local X is >= chunk size");
        assert(localY < globalConfig.mapChunkSize, "Local Y is >= chunk size");

        return this.contents[localX][localY] || null;
    }

    /**
     * Sets the chunks contents
     * @param {number} tileX
     * @param {number} tileY
     * @param {Entity=} contents
     * @param {Layer} layer
     */
    setLayerContentFromWorldCords(tileX, tileY, contents, layer) {
        const localX = tileX - this.tileX;
        const localY = tileY - this.tileY;
        assert(localX >= 0, "Local X is < 0");
        assert(localY >= 0, "Local Y is < 0");
        assert(localX < globalConfig.mapChunkSize, "Local X is >= chunk size");
        assert(localY < globalConfig.mapChunkSize, "Local Y is >= chunk size");

        let oldContents;
        if (layer === "regular") {
            oldContents = this.contents[localX][localY];
        } else {
            oldContents = this.wireContents[localX][localY];
        }

        assert(contents === null || !oldContents, "Tile already used: " + tileX + " / " + tileY);

        if (oldContents) {
            // Remove from list (the old contents must be reigstered)
            fastArrayDeleteValueIfContained(this.containedEntities, oldContents);
            fastArrayDeleteValueIfContained(this.containedEntitiesByLayer[layer], oldContents);
        }

        if (layer === "regular") {
            this.contents[localX][localY] = contents;
        } else {
            this.wireContents[localX][localY] = contents;
        }

        if (contents) {
            if (this.containedEntities.indexOf(contents) < 0) {
                this.containedEntities.push(contents);
            }

            if (this.containedEntitiesByLayer[layer].indexOf(contents) < 0) {
                this.containedEntitiesByLayer[layer].push(contents);
            }
        }
    }
}
