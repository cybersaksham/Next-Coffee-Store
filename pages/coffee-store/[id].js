import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStores from "../../data/coffee-store.json";

export async function getStaticProps({ params }) {
  console.log(params);
  return {
    props: {
      coffeeStore: coffeeStores.find((store) => store.id === Number(params.id)),
    },
  };
}

export function getStaticPaths() {
  // Used for static rendering of dynamic routes
  // Provide all paths to render statically
  // Provide fallback false to give 404 error on paths not included here
  // If fallback is true then on first request it will be loaded and then on further request it got statically stored
  return {
    paths: [
      { params: { id: "0" } },
      { params: { id: "1" } },
      { params: { id: "2" } },
    ],
    fallback: true,
  };
}

const CoffeeStore = () => {
  const router = useRouter();
  const { id } = router.query;

  // If fallback is true then it taked some time to load data and push statically if not present
  // So show loading state till then otherwise will give error
  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div>
      <p>{id}</p>
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </div>
  );
};

export default CoffeeStore;
