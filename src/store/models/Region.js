// @flow

export type IRegion = {
  name: string,
  territories: string[]
};

export default class Region {
  constructor(data: IRegion) {
    if (data) {
      this.name = data.name;
      this.territories = data.territories;
    }
  }

  name: string;
  territories: string[];
}
