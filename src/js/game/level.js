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

    /**
     * Should return the dimensions of the Level
     */
    getDimensions(variant = defaultBuildingVariant) {
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
        const originChunk = new Vector(this.lvlNum % 5, Math.ceil(this.lvlnum/5) - 1);
        const dimensions = this.getDimensions();
        this.x = originChunk.x * globalConfig.mapChunkSize + globalConfig.mapChunkSize - Math.round(dimensions.x / 2)
        this.y = originChunk.y * globalConfig.mapChunkSize + globalConfig.mapChunkSize - Math.round(dimensions.y / 2)

        const lvlBuildings = this.setupLevel(root)
        for (let i in lvlBuildings) {
            const param = lvlBuildings[i]
            let test = gMetaBuildingRegistry.findById(param[0]).createEntity({
                root: this.root,
                origin: new Vector(this.x + param[1].x, this.y + param[1].y),
                rotation: rotation[param[2]],
                originalRotation: param[3],
                rotationVariant: param[4],
                variant: param[5]
            })
            root.map.placeStaticEntity(test);
            root.entityMgr.registerEntity(test);
        };


        // const entity = new Entity(root);
        // entity.addComponent(
        //     new StaticMapEntityComponent({
        //         origin: new Vector(this.x, this.y),
        //         rotation: 0,
        //         originalRotation: 0,
        //         tileSize: new Vector(1, 1),
        //         code: getCodeFromBuildingData(this, variant, rotationVariant),
        //     })
        // );
        // this.setupEntityComponents(entity, root);
        // this.updateVariants(entity, rotationVariant, variant);
        // return entity;
    }

    addBuilding() {

    }
}
