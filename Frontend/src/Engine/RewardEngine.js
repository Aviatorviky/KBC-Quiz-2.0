import { getTier } from "./TierEngine";

class RewardEngine {

    getCurrentPrize(level) {

        const tier = getTier(level);

        return tier ? tier.reward : 0;

    }

    getGuaranteedPrize(level) {

        let guaranteed = 0;

        for (let i = 1; i <= level; i++) {

            const tier = getTier(i);

            if (tier && tier.guaranteed > guaranteed) {

                guaranteed = tier.guaranteed;

            }

        }

        return guaranteed;

    }

    getWalkAwayPrize(level) {

        if (level <= 1) {

            return 0;

        }

        const previousTier = getTier(level - 1);

        return previousTier ? previousTier.reward : 0;

    }

    getWrongAnswerPrize(level) {

        return this.getGuaranteedPrize(level);

    }

}

export default new RewardEngine();