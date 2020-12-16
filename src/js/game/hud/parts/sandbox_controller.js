import { makeDiv } from "../../../core/utils";
import { BaseHUDPart } from "../base_hud_part";
import { DynamicDomAttach } from "../dynamic_dom_attach";
import { enumNotificationType } from "./notifications";

export class HUDSandboxController extends BaseHUDPart {
    createElements(parent) {
        this.element = makeDiv(
            parent,
            "ingame_HUD_SandboxController",
            [],
            `
            <label>Sandbox Options</label>
            <span class="sandboxHint">Use F6 to toggle this overlay</span>

            <div class="buttons">
                <div class="levelToggle plusMinus">
                    <label>Level</label>
                    <button class="styledButton minus">-</button>
                    <button class="styledButton plus">+</button>
                </div>

                <div class="additionalOptions">
                    <button class="styledButton giveBlueprints">Fill blueprint shapes</button>
                    <button class="styledButton maxOutAll">Max out all</button>
                </div>
            </div>
        `
        );

        const bind = (selector, handler) => this.trackClicks(this.element.querySelector(selector), handler);

        bind(".giveBlueprints", this.giveBlueprints);
        bind(".levelToggle .minus", () => this.modifyLevel(-1));
        bind(".levelToggle .plus", () => this.modifyLevel(1));

    }

    giveBlueprints() {
        const shape = this.root.gameMode.getBlueprintShapeKey();
        if (!this.root.hubGoals.storedShapes[shape]) {
            this.root.hubGoals.storedShapes[shape] = 0;
        }
        this.root.hubGoals.storedShapes[shape] += 1e9;
    }

    modifyLevel(amount) {
        const hubGoals = this.root.hubGoals;
        hubGoals.level = Math.max(1, hubGoals.level + amount);
        hubGoals.computeNextGoal();

        // Clear all shapes of this level
        hubGoals.storedShapes[hubGoals.currentGoal.definition.getHash()] = 0;

        this.root.hud.parts.pinnedShapes.rerenderFull();

        // Compute gained rewards
        hubGoals.gainedRewards = {};
        const levels = this.root.gameMode.getLevelDefinitions();
        for (let i = 0; i < hubGoals.level - 1; ++i) {
            if (i < levels.length) {
                const reward = levels[i].reward;
                hubGoals.gainedRewards[reward] = (hubGoals.gainedRewards[reward] || 0) + 1;
            }
        }

        this.root.hud.signals.notification.dispatch(
            "Changed level to " + hubGoals.level
        );
    }

    initialize() {
        // Allow toggling the controller overlay
        this.root.gameState.inputReciever.keydown.add(key => {
            if (key.keyCode === 117) {
                // F6
                this.toggle();
            }
        });

        this.visible = !G_IS_DEV;
        this.domAttach = new DynamicDomAttach(this.root, this.element);
    }

    toggle() {
        this.visible = !this.visible;
    }

    update() {
        this.domAttach.update(this.visible);
    }
}
