import { useEffect, useState } from "react";
import useSWR from "swr";
import { serialize } from "swr/_internal";
const fetcher = (...args) => fetch(...args).then(res => res.json())
function LastSales(props) {
  const [sales, setSales] = useState(props.sales);
  const { data, error, isLoading } = useSWR(
    "https://realtime-database-react-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    const transformData = [];

    for (const key in data) {
      transformData.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }

    setSales(transformData);
  }, [data]);

  console.log(data, "data");

  if (!sales && !data) {
    return <div>Data loading...</div>;
  }

  if (error) {
    return <div>Error in data fetch...</div>;
  }

  return (
    <div>
      {sales.map((item) => (
        <h1 key={item.id}>
          {item.username} - ${item.volume}
        </h1>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(
    `https://realtime-database-react-default-rtdb.firebaseio.com/sales.json`
  );
  const data = await response.json();
  console.log(data);

  const transformData = [];

  for (const key in data) {
    transformData.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  console.log(transformData);
  return {
    props: { sales: transformData },
  };
}

export default LastSales;
