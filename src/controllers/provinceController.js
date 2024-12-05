import { getProvinces, getDistricts, getWards } from '../models/Province';

export const fetchProvinces = async () => {
  return await getProvinces();
};

export const fetchDistricts = async (provinceId) => {
  return await getDistricts(provinceId);
};

export const fetchWards = async (districtId) => {
  return await getWards(districtId);
};
