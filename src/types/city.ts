export type CityId = string;

export type City = {
  id: CityId;
  name: string;
  region: string;
  heroImageUrl?: string;
  temperatureC?: number;
  weatherLabel?: string;
  populationLabel?: string;
};

