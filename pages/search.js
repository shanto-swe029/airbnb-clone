import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import React from "react";
import { format } from "date-fns";
import InfoCard from "@/components/InfoCard";

const debug = true;

function search({ searchResults }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const { location, startDate, endDate, noOfGuests } = router.query;
  let formattedStartDate = "";
  let formattedEndtDate = "";

  if (startDate && endDate) {
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    if (!isNaN(parsedStartDate) && !isNaN(parsedEndDate)) {
      formattedStartDate = format(parsedStartDate, "dd MMMM yy");
      formattedEndtDate = format(parsedEndDate, "dd MMMM yy");
    } else {
      console.error("Invalid startDate:", startDate);
      console.error("Invalid endDate:", endDate);
    }
  }

  const range = `${formattedStartDate} - ${formattedEndtDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {noOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div className="flex flex-col">
            {searchResults?.map(
              ({ img, location, total, description, star, price, title }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  total={total}
                  description={description}
                  star={star}
                  price={price}
                  title={title}
                />
              )
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default search;

export async function getServerSideProps() {
  try {
    const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then(
      (res) => res.json()
    );

    return {
      props: {
        searchResults,
      },
    };
  } catch (error) {
    console.error("Error fetching data: ", error);
    return {
      props: {
        searchResults: [],
      },
    };
  }
}
