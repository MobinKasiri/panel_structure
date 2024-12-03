import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
  const [params, setParams] = useSearchParams();
  const setSearchParams = (key: string, value: string) => {
    params.set(key, value);
    setParams(params);
  };
  const getSearchParams = (key: string) => {
    return params.get(key);
  };
  const deleteSearchParams = (key: string) => {
    params.delete(key);
    setParams(params);
  };
  return { setSearchParams, getSearchParams, deleteSearchParams };
};

export default useQueryParams;
