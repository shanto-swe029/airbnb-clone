import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import SmallCard from "@/components/SmallCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ exploreData, cardsData }) {
  return (
    <div className={inter.className}>
      <Head>
        <title>Airbnb Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6 ">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData.map((item) => (
              <SmallCard
                key={item.img}
                img={item.img}
                distance={item.distance}
                location={item.location}
              />
            ))}
          </div>
        </section>

        <section className="pt-6 ">
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const exploreData = await fetch("https://www.jsonkeeper.com/b/4G1G").then(
      (res) => res.json()
    );
    const cardsData = await fetch("https://www.jsonkeeper.com/b/VHHT").then(
      (res) => res.json()
    );
    return {
      props: {
        exploreData,
        cardsData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        exploreData: [], // Provide a default value in case of an error
      },
    };
  }
}
