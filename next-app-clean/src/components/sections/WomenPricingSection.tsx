"use client";

import { UnifiedPricingSection } from "./UnifiedPricingSection";

interface WomenPricingSectionProps {
  onPlanClick?: () => void;
}

export function WomenPricingSection({ onPlanClick }: WomenPricingSectionProps = {}) {
  return <UnifiedPricingSection onPlanClick={onPlanClick} />;
}

