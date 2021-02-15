import { InputReceiver } from "../../../core/input_receiver";
import { makeDiv } from "../../../core/utils";
import { T } from "../../../translations";
import { KeyActionMapper, KEYMAPPINGS } from "../../key_action_mapper";
import { BaseHUDPart } from "../base_hud_part";
import { DynamicDomAttach } from "../dynamic_dom_attach";
import { gLevelRegistry } from "../../../core/global_registries";

export class HUDLevelSetector extends BaseHUDPart {
    createElements(parent) {
        // this.background = makeDiv(parent, "ingame_HUD_LevelSelector", ["ingameDialog"]);
        this.background = makeDiv(parent, "ingame_HUD_LevelSelector", ["ingameDialog"]);

        // DIALOG Inner / Wrapper
        this.dialogInner = makeDiv(this.background, null, ["dialogInner"]);
        this.title = makeDiv(this.dialogInner, null, ["title"], T.ingame.levelSelector.title);
        this.closeButton = makeDiv(this.title, null, ["closeButton"]);
        this.trackClicks(this.closeButton, this.close);
        this.contentDiv = makeDiv(this.dialogInner, null, ["content"]);

        this.levels = makeDiv(this.contentDiv, null, ["levels"]);

        // Create button to enter the level
        for (let level = 0; level < gLevelRegistry.entries.length; level++) {
            this.levelButton = document.createElement("button");
            this.levelButton.classList.add("styledButton", "level");
            this.levelButton.innerText = (level + 1).toString();
            this.levels.appendChild(this.levelButton);

            this.trackClicks(this.levelButton, () => this.onLevelRequested(level));
        }
    }

    initialize() {
        this.domAttach = new DynamicDomAttach(this.root, this.background, {
            attachClass: "visible",
        });

        this.inputReciever = new InputReceiver("level_selector");
        this.keyActionMapper = new KeyActionMapper(this.root, this.inputReciever);

        this.keyActionMapper.getBinding(KEYMAPPINGS.general.back).add(this.close, this);

        this.close();
    }

    show() {
        this.visible = true;
        this.root.app.inputMgr.makeSureAttachedAndOnTop(this.inputReciever);
    }

    isBlockingOverlay() {
        return this.visible;
    }

    /**
     * Called when the loading a Level was requested
     */
    onLevelRequested(level) {
        this.close();
        this.load(level);
    }

    load(level) {
        gLevelRegistry.entries[level].load(this.root);
    }

    /**
     * Closes the dialog
     */
    close() {
        this.visible = false;
        this.root.app.inputMgr.makeSureDetached(this.inputReciever);
        this.update();
    }

    update() {
        this.domAttach.update(this.visible);
    }
}
