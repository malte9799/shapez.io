import { globalConfig } from "../../../core/config";
import { gMetaBuildingRegistry } from "../../../core/global_registries";
import { InputReceiver } from "../../../core/input_receiver";
import { makeDiv } from "../../../core/utils";
import { SOUNDS } from "../../../platform/sound";
import { T } from "../../../translations";
import { defaultBuildingVariant } from "../../meta_building";
import { enumHubGoalRewards } from "../../tutorial_goals";
import { enumHubGoalRewardsToContentUnlocked } from "../../tutorial_goals_mappings";
import { BaseHUDPart } from "../base_hud_part";
import { DynamicDomAttach } from "../dynamic_dom_attach";
import { enumNotificationType } from "./notifications";

export class HUDUnlockNotification extends BaseHUDPart {
    initialize() {
        this.visible = false;

        this.domAttach = new DynamicDomAttach(this.root, this.element, {
            timeToKeepSeconds: 0,
        });

        if (!(G_IS_DEV && globalConfig.debug.disableUnlockDialog)) {
            this.root.signals.storyGoalCompleted.add(this.showForLevel, this);
        }

        this.buttonShowTimeout = null;
    }

    createElements(parent) {
        this.inputReciever = new InputReceiver("unlock-notification");

        this.element = makeDiv(parent, "ingame_HUD_UnlockNotification", ["noBlur"]);

        const dialog = makeDiv(this.element, null, ["dialog"]);

        this.elemTitle = makeDiv(dialog, null, ["title"]);
        this.elemSubTitle = makeDiv(dialog, null, ["subTitle"], T.ingame.levelCompleteNotification.completed);

        this.elemContents = makeDiv(dialog, null, ["contents"]);
        const buttonContents = makeDiv(dialog, null, ["buttons"]);

        // Go to Level Select
        this.btnLevels = document.createElement("button");
        this.btnLevels.classList.add("levels", "styledButton");
        this.btnLevels.innerText = T.ingame.levelCompleteNotification.buttonLevelSelect;
        buttonContents.appendChild(this.btnLevels);
        this.trackClicks(this.btnLevels, this.requestLevelSelector);

        // Go to next Level
        this.btnNextLevel = document.createElement("button");
        this.btnNextLevel.classList.add("nextLevel", "styledButton");
        this.btnNextLevel.innerText = T.ingame.levelCompleteNotification.buttonNextLevel;
        buttonContents.appendChild(this.btnNextLevel);
        this.trackClicks(this.btnNextLevel, this.requestNextLevel);
    }

    /**
     * @param {number} level
     * @param {enumHubGoalRewards} reward
     */
    showForLevel(level, reward) {
        this.root.soundProxy.playUi(SOUNDS.levelComplete);

        const levels = this.root.gameMode.getLevelDefinitions();
        // Don't use getIsFreeplay() because we want the freeplay level up to show
        if (level > levels.length) {
            this.root.hud.signals.notification.dispatch(
                T.ingame.notifications.freeplayLevelComplete.replace("<level>", String(level)),
                enumNotificationType.success
            );
            return;
        }

        this.root.app.inputMgr.makeSureAttachedAndOnTop(this.inputReciever);
        this.elemTitle.innerText = T.ingame.levelCompleteNotification.levelTitle.replace(
            "<level>",
            ("" + level).padStart(2, "0")
        );

        const rewardName = T.storyRewards[reward].title;

        let html = `
        <div class="rewardName">
            ${T.ingame.levelCompleteNotification.unlockText.replace("<reward>", rewardName)}
        </div>

        <div class="rewardDesc">
            ${T.storyRewards[reward].desc}
        </div>

        `;

        html += "<div class='images'>";
        const gained = enumHubGoalRewardsToContentUnlocked[reward];
        if (gained) {
            gained.forEach(([metaBuildingClass, variant]) => {
                const metaBuilding = gMetaBuildingRegistry.findByClass(metaBuildingClass);
                html += `<div class="buildingExplanation" data-icon="building_tutorials/${
                    metaBuilding.getId() + (variant === defaultBuildingVariant ? "" : "-" + variant)
                }.png"></div>`;
            });
        }
        html += "</div>";

        this.elemContents.innerHTML = html;
        this.visible = true;

        if (this.buttonShowTimeout) {
            clearTimeout(this.buttonShowTimeout);
        }

        this.element.querySelector("button.nextLevel").classList.remove("unlocked");

        if (this.root.app.settings.getAllSettings().offerHints) {
            this.buttonShowTimeout = setTimeout(
                () => this.element.querySelector("button.nextLevel").classList.add("unlocked"),
                G_IS_DEV ? 100 : 5000
            );
        } else {
            this.element.querySelector("button.nextLevel").classList.add("unlocked");
        }
    }

    cleanup() {
        this.root.app.inputMgr.makeSureDetached(this.inputReciever);
        if (this.buttonShowTimeout) {
            clearTimeout(this.buttonShowTimeout);
            this.buttonShowTimeout = null;
        }
    }

    isBlockingOverlay() {
        return this.visible;
    }

    requestClose() {
        this.root.app.adProvider.showVideoAd().then(() => {
            this.close();

            this.root.hud.signals.unlockNotificationFinished.dispatch();
        });
    }

    close() {
        this.root.app.inputMgr.makeSureDetached(this.inputReciever);
        if (this.buttonShowTimeout) {
            clearTimeout(this.buttonShowTimeout);
            this.buttonShowTimeout = null;
        }
        this.visible = false;
    }

    requestNextLevel() {
        this.requestClose();
        this.root.hud.parts.levelSelector.onLevelRequested(this.root.hubGoals.level - 1);
    }

    requestLevelSelector() {
        this.requestClose();
        this.root.hud.parts.levelSelector.show();
    }

    update() {
        this.domAttach.update(this.visible);
        if (!this.visible && this.buttonShowTimeout) {
            clearTimeout(this.buttonShowTimeout);
            this.buttonShowTimeout = null;
        }
    }
}
