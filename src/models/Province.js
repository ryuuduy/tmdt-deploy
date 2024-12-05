const provinces_url = "https://provinces.open-api.vn/api/"

export const getProvinces = async () => {
    try {
      const response = await fetch(`${provinces_url}p/`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching provinces:', error);
      return [];
    }
  };
  
  export const getDistricts = async (provinceId) => {
    try {
      const response = await fetch(`${provinces_url}p/${provinceId}?depth=2`);
      const data = await response.json();
      return data.districts || [];
    } catch (error) {
      console.error('Error fetching districts:', error);
      return [];
    }
  };
  
  export const getWards = async (districtId) => {
    try {
      const response = await fetch(`${provinces_url}d/${districtId}?depth=2`);
      const data = await response.json();
      return data.wards || [];
    } catch (error) {
      console.error('Error fetching wards:', error);
      return [];
    }
  };
  