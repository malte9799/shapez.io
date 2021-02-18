import { InputReceiver } from "../../../core/input_receiver";
import { TrackedState } from "../../../core/tracked_state";
import { makeDiv } from "../../../core/utils";
import { KeyActionMapper, KEYMAPPINGS } from "../../key_action_mapper";
import { BaseHUDPart } from "../base_hud_part";
import { DynamicDomAttach } from "../dynamic_dom_attach";
import { T } from "../../../translations";
import { gLevelRegistry } from "../../../core/global_registries";

const tutorialVideos = [2, 3, 4, 5, 6, 7, 9, 10, 11];

export class HUDPartTutorialHints extends BaseHUDPart {
    constructor(root) {
        super(root);
        this.hint_number = 0;
    }

    createElements(parent) {
        this.element = makeDiv(
            parent,
            "ingame_HUD_TutorialHints",
            [],
            `
        <div class="header">
            <span>${T.ingame.tutorialHints.title}</span>
            <button class="styledButton showHint">
                <span class="hintText"></span>
            </button>
        </div>
        `
        );

        this.updateButtonText();
    }

    initialize() {
        this.trackClicks(this.element.querySelector(".showHint"), this.showHint);

        this.root.signals.entityDestroyed.add(this.updateHint, this);
        this.root.signals.entityManuallyPlaced.add(this.updateHint, this);

        this.visible = true;

        this.inputReciever = new InputReceiver("tutorial_hints");
        this.keyActionMapper = new KeyActionMapper(this.root, this.inputReciever);

        this.domAttach = new DynamicDomAttach(this.root, this.element);
    }

    showHint() {
        this.hint_number += 1;

        this.updateHint();
        this.updateButtonText();
    }

    updateHint() {
        const level = this.root.hubGoals.level;
        const buildings_needed = gLevelRegistry.entries[level - 1].getBuildingsNeeded();
        const total_buildings_needed = gLevelRegistry.entries[level - 1].getTotalBuildingsNeeded();

        this.root.hud.parts.buildingsToolbar.resetHints(total_buildings_needed);

        this.root.hud.parts.buildingsToolbar.showHint(this.hint_number, buildings_needed);
    }

    updateButtonText() {
        this.element.querySelector(".hintText").innerHTML = T.ingame.tutorialHints.showHint[this.hint_number];
    }

    reset() {
        this.hint_number = 0;
        this.updateButtonText();
        this.updateHint();
    }

    update() {
        this.domAttach.update(this.visible);
    }
}
