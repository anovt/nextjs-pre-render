import path from "path";
import fs from "fs/promises";


function ProductDetail(props) {
  const { loadedProduct } = props;

  if(!loadedProduct)
  {
      return <p>Page Loading...</p> //for fallback true
  }

  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </div>
  );
}

async function getProductData() {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const data = await fs.readFile(filePath);
  const jsonData = JSON.parse(data);
  return jsonData;
}

export async function getStaticPaths() {
  const data = await getProductData();

  const ids = data.products.map((product) => product.id);

  const paramsWithValues = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: paramsWithValues,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  console.log("Regenerate");
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const data = await fs.readFile(filePath);
  const jsonData = JSON.parse(data);
  const product = jsonData.products.find((item) => item.id == productId);

  if(!product)
  {
    return {
        notFound: true,
  }
  }
  return {
    props: {
      loadedProduct: product,
    },
    revalidate: 10,
   
  };
}

export default ProductDetail;
