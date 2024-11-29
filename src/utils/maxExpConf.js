import data from "../data/reqExp.json";

export const maxExpConf = (level) => {
  console.log(data.exps.length);
  return data.exps[level - 1];
};
