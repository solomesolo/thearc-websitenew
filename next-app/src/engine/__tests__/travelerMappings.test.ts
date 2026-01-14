import { describe, it, expect } from '@jest/globals';
import { toSeverityTraveler } from '../travelerMappings';

describe('Traveler Mappings', () => {
  it('should map LikertFreq correctly', () => {
    expect(toSeverityTraveler("F1_wornOutAfternoon", "Never")).toBe(0);
    expect(toSeverityTraveler("F1_wornOutAfternoon", "Rarely")).toBe(1);
    expect(toSeverityTraveler("F1_wornOutAfternoon", "Sometimes")).toBe(2);
    expect(toSeverityTraveler("F1_wornOutAfternoon", "Often")).toBe(3);
    expect(toSeverityTraveler("F1_wornOutAfternoon", "Almost always")).toBe(4);
  });

  it('should reverse-code F3_refreshedOnWaking', () => {
    expect(toSeverityTraveler("F3_refreshedOnWaking", "Very refreshed")).toBe(0);
    expect(toSeverityTraveler("F3_refreshedOnWaking", "Somewhat refreshed")).toBe(1);
    expect(toSeverityTraveler("F3_refreshedOnWaking", "Neutral")).toBe(2);
    expect(toSeverityTraveler("F3_refreshedOnWaking", "Somewhat unrefreshed")).toBe(3);
    expect(toSeverityTraveler("F3_refreshedOnWaking", "Very unrefreshed")).toBe(4);
  });

  it('should map S3_bedtimeConsistency correctly', () => {
    expect(toSeverityTraveler("S3_bedtimeConsistency", "Very consistent")).toBe(0);
    expect(toSeverityTraveler("S3_bedtimeConsistency", "Somewhat consistent")).toBe(1);
    expect(toSeverityTraveler("S3_bedtimeConsistency", "Neutral")).toBe(2);
    expect(toSeverityTraveler("S3_bedtimeConsistency", "Somewhat inconsistent")).toBe(3);
    expect(toSeverityTraveler("S3_bedtimeConsistency", "Very inconsistent")).toBe(4);
  });

  it('should map PF1_difficultyStayActiveTravelDays correctly', () => {
    expect(toSeverityTraveler("PF1_difficultyStayActiveTravelDays", "Not difficult")).toBe(0);
    expect(toSeverityTraveler("PF1_difficultyStayActiveTravelDays", "Slightly difficult")).toBe(1);
    expect(toSeverityTraveler("PF1_difficultyStayActiveTravelDays", "Moderately difficult")).toBe(2);
    expect(toSeverityTraveler("PF1_difficultyStayActiveTravelDays", "Very difficult")).toBe(3);
    expect(toSeverityTraveler("PF1_difficultyStayActiveTravelDays", "Extremely difficult")).toBe(4);
  });

  it('should map BG10_sittingDuration correctly', () => {
    expect(toSeverityTraveler("BG10_sittingDuration", "<2 hours")).toBe(0);
    expect(toSeverityTraveler("BG10_sittingDuration", "2–4 hours")).toBe(1);
    expect(toSeverityTraveler("BG10_sittingDuration", "4–6 hours")).toBe(2);
    expect(toSeverityTraveler("BG10_sittingDuration", "6–8 hours")).toBe(3);
    expect(toSeverityTraveler("BG10_sittingDuration", ">8 hours")).toBe(4);
  });

  it('should reverse-code L2_20minMovement (protective behavior)', () => {
    expect(toSeverityTraveler("L2_20minMovement", "Almost always")).toBe(0);
    expect(toSeverityTraveler("L2_20minMovement", "Often")).toBe(1);
    expect(toSeverityTraveler("L2_20minMovement", "Sometimes")).toBe(2);
    expect(toSeverityTraveler("L2_20minMovement", "Rarely")).toBe(3);
    expect(toSeverityTraveler("L2_20minMovement", "Never")).toBe(4);
  });
});






