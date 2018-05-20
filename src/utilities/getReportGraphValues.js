// @flow

type IData = {
  delivered: number,
  undelivered: number
};

export const getReportGraphValue = (data: IData) => ({
  value: data.delivered,
  maxValue: data.delivered + data.undelivered
});
