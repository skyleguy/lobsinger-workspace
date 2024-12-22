import { Asset } from './asset.model';

export function isAssetValid(asset: Asset) {
  return asset.assetId && asset.assetName;
}
