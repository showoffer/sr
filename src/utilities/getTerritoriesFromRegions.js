// @flow
import Region from "../store/models/Region";

const concat = (x, y) => x.concat(y);

export const getTerritoriesByRegionName = (
  name: string,
  regions: Array<Region>
) => {
  const region = regions.find((r: Region) => r.name === name);
  if (typeof region !== "undefined") {
    return region.territories;
  }
  return [];
};

export const getTerritoriesFromRegions = (
  selectedRegions: string[],
  regions: Region[]
) => {
  const allSelectedRegions = selectedRegions
    .map(name => getTerritoriesByRegionName(name, regions))
    .reduce(concat, [])
    .filter(v => v !== "" && v !== undefined && v !== null);
  return [...new Set(allSelectedRegions)]; //return unique values
};
