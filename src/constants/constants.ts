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
