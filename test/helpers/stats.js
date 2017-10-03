/* eslint-disable */
export function loader(stats) {
  const modules = stats.compilation.modules

  return {
    err: modules.map((module) => module.errors)[1],
    src: modules.map((module) => module._source._value)[1],
    map: modules.map((module) => module._source._sourceMap)[1],
    meta: modules.map((module) => module.meta),
    err: modules.map((module) => module.errors)[1],
    warnings: modules.map((module) => module.warnings)[1]
  };
}

export function loaders(stats, i) {
  const modules = stats.compilation.modules

  return i
    ? {
      err: modules.map((module) => module.errors)[i],
      src: modules.map((module) => module._source._value)[i],
      map: modules.map((module) => module._source._sourceMap)[i],
      meta: modules.map((module) => module.meta)[i],
      deps: modules.map((module) => module.dependencies)[i]
    }
    : {
      err: modules.map((module) => module.errors),
      src: modules.map((module) => module._source._value),
      map: modules.map((module) => module._source._sourceMap),
      meta: modules.map((module) => module.meta),
      deps: modules.map((module) => module.dependencies)
    }
};

export function assets(stats, i) {
  const asset = (asset) => {
    if (/map/.test(asset)) return false;
    return stats.compilation.assets[asset].sourceAndMap();
  };

  const assets = Object.keys(stats.compilation.assets)
    .map(asset)
    .filter(Boolean);

  return i ? assets[i] : assets;
}

export function errors(stats, i) {
  const { errors } = stats.compilation.errors;

  return i ? errors[i] : errors;
}

export function warnings(stats, i) {
  const { warnings } = stats.compilation.warnings;

  return i ? warnings[i] : warnings;
}

export default {
  loader,
  loaders,
  assets,
  errors,
  warnings,
};
