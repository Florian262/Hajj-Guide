import type { HajjStage } from '../data/hajjData';

/**
 * Filter Hajj stages dynamically based on the pilgrim's Hajj typology.
 * Steps with `hajjTypeFilter` set will only return if the profile's Hajj type matches.
 */
export const getVisibleStages = (
  allStages: HajjStage[],
  hajjType: 'tamattu' | 'qiran' | 'ifrad' | null
): HajjStage[] => {
  const effectiveType = hajjType ?? 'tamattu';
  return allStages.filter((stage) => {
    if (!stage.hajjTypeFilter) return true;
    return stage.hajjTypeFilter.includes(effectiveType);
  });
};
