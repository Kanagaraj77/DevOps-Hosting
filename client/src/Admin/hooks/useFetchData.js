import { useState, useEffect } from "react";
import { getData, getOneData } from "../services/apiRequest";

const useFetchData = (routeName, id, notFilter,dependecy) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (id) {
          response = await getOneData(routeName, id);
          setData(response?.data);
        } else {
          response = await getData(routeName);
          if (notFilter) {
            setData(response?.data);
          } else {
            setData(response?.data?.filter((item) => item?.status));
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [routeName , dependecy ? dependecy : null]);

  return { data, loading };
};

export default useFetchData;
