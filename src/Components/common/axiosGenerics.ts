import axios from 'axios';

export const getData = async <T>(url: string): Promise<T> => {
  const response = await axios.get(url);
  const result = await response.data;
  return result;
};

export const postData = async <T,U>(url: string,data:U): Promise<T> => {
  const response = await axios.post(url,data);
  const result = await response.data;
  return result;
};

export const putData = async <T,U>(url:string,data:U):Promise<T>=>{
    const response = await axios.put(url,data)
    const result = await response.data
    return result
}
