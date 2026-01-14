"use client";

import { UnifiedPricingSection } from "./UnifiedPricingSection";

interface TravelerPricingSectionProps {
  onPlanClick?: () => void;
}

export function TravelerPricingSection({ onPlanClick }: TravelerPricingSectionProps = {}) {
  return <UnifiedPricingSection onPlanClick={onPlanClick} />;
}

