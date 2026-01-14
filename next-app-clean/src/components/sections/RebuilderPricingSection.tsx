"use client";

import { UnifiedPricingSection } from "./UnifiedPricingSection";

interface RebuilderPricingSectionProps {
  onPlanClick?: () => void;
}

export function RebuilderPricingSection({ onPlanClick }: RebuilderPricingSectionProps = {}) {
  return <UnifiedPricingSection onPlanClick={onPlanClick} />;
}

