export type RadiationType = 'alpha' | 'beta' | 'gamma' | 'x';

export interface RadiationInfo {
  factor: number;
  percentage: number;
}

export const radiationTypes: Record<RadiationType, RadiationInfo> = {
  alpha: { factor: 20, percentage: 0.75 },
  beta: { factor: 1, percentage: 0.10 },
  gamma: { factor: 1, percentage: 0.05 },
  x: { factor: 1, percentage: 0.10 },
};

const enrichedUranium = {
  activity: 1.8e5,
  averageEnergy: 4.68,
  qualityFactor: 20,
};
const irradiatedUranium = {
  activity: 3.7e13,
  averageEnergy: 0.75,
  qualityFactor: 1,
};