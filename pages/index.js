import path from "path";
import fs from "fs/promises";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>
          <Link href={`/${item.id}`}> {item.title} </Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  console.log("Regenerate");
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const data = await fs.readFile(filePath);
  const jsonData = JSON.parse(data);

  return {
    props: {
      products: jsonData.products,
    },
    revalidate: 10,
    notFound: false,
  };
}

export default HomePage;
