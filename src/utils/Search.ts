
export type SearchData = {
  name?: string;
  birthday_date?: string;
  email?: string;
  phone_number?: string;
  address?: string;
};

export const createSearchParams = (data: SearchData): URLSearchParams => {
  const params = new URLSearchParams();
  for (const key in data) {
    // @ts-ignore
    if (data[key]) {
      // @ts-ignore
      params.set(key, data[key]);
    }
  }
  return params;
};
