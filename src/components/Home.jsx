import React, { useEffect, useState } from "react";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");
        if (!res) {
          throw new Error("response error");
        }
        const data = await res.json();
        console.log(data);
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const filteredCountries = countries.filter((country) => {
    if (search === "") {
      return true;
    }
    return country.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <main className="w-[80%] mx-auto dark:text-white min-h-screen">
      {!selectedCountry && (
        <section className="flex flex-col sm:flex-row justify-between gap-3 my-3">
          <div className="relative w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 absolute left-4 top-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="border py-2 w-full rounded-lg pl-13 placeholder:text-sm"
              type="text"
              placeholder="Search for a country..."
            />
          </div>
          <div className="">
            <select
              onChange={(e) => setRegion(e.target.value)}
              className="p-3 text-sm shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-lg cursor-pointer dark:bg-[hsl(207,26%,22%)]"
              name="region"
              id="region"
            >
              <option value="">Filter by Region</option>
              <option value="africa">Africa</option>
              <option value="america">America</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>
          </div>
        </section>
      )}
      {!selectedCountry && (
        <section>
          <div className="my-10">
            {!search ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-15">
                {countries
                  .filter((country) => {
                    if (region === "") {
                      return true;
                    }
                    const regions = {
                      africa: "Africa",
                      america: "Americas",
                      asia: "Asia",
                      europe: "Europe",
                      oceania: "Oceania",
                    };
                    return country.region === regions[region];
                  })
                  .map((country, index) => (
                    <div
                      onClick={() => setSelectedCountry(country)}
                      className="shadow-[0_0_15px_rgba(0,0,0,0.2)] cursor-pointer"
                      key={index}
                    >
                      <div>
                        <img
                          className="rounded-t-lg w-full"
                          src={country.flags.png}
                          alt={country.name}
                        />
                      </div>
                      <div className="px-6 py-2">
                        <p className="my-3 font-extrabold text-grey950 dark:text-white">
                          {country.name}
                        </p>
                        <div className="text-sm text-grey950 dark:text-white">
                          <p className="my-0.5">
                            Population:{" "}
                            <span className="dark:text-white/80">
                              {country.population.toLocaleString()}
                            </span>
                          </p>
                          <p>
                            Region:{" "}
                            <span className="dark:text-white/80">
                              {country.region}
                            </span>
                          </p>
                          <p className="mt-0.5">
                            Capita:{" "}
                            <span className="dark:text-white/80">
                              {country.capital}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {filteredCountries.map((country, index) => (
                  <div
                    onClick={() => setSelectedCountry(country)}
                    className="shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                    key={index}
                  >
                    <div>
                      <img
                        className="rounded-lg w-full"
                        src={country.flags.png}
                        alt={country.name}
                      />
                    </div>
                    <div className="px-6 py-2">
                      <p className="mb-3 font-extrabold text-grey950">
                        {country.name}
                      </p>
                      <div className="text-sm text-grey950">
                        <p className="my-0.5">
                          Population:{" "}
                          <span>{country.population.toLocaleString()}</span>
                        </p>
                        <p>
                          Region: <span>{country.region}</span>
                        </p>
                        <p className="mt-0.5">
                          Capita: <span>{country.capital}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredCountries.length === 0 && (
                  <div className="my-10 col-span-4 place-items-center lg:text-2xl">
                    <p>Not found. Check the spellings and try again</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}
      {selectedCountry && (
        <section>
          <button
            onClick={() => setSelectedCountry(null)}
            className="flex items-center gap-2 my-10 shadow-[0_0_10px_rgba(0,0,0,0.2)] py-1.5 px-2.5 sm:px-4 dark:bg-[hsl(207,26%,22%)] cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            <p>Back</p>
          </button>
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
            <div className="mr-auto w-full lg:w-[60%]">
              <div className="w-full">
                <img
                  className="rounded-lg w-full"
                  src={selectedCountry.flags.png}
                  alt={selectedCountry}
                />
              </div>
            </div>
            <section className="lg:w-[70%] lg:pt-5">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="my-5">
                    <div className="text-sm sm:text-base flex flex-col gap-2">
                      <p className="font-extrabold text-xl sm:text-2xl mb-3">
                        {selectedCountry.name}
                      </p>
                      <p>
                        <span className="font-bold">Native Name</span>:{" "}
                        <span className="dark:text-white/70">
                          {selectedCountry.nativeName}
                        </span>
                      </p>
                      <p>
                        <span className="font-bold">Population</span>:{" "}
                        <span className="dark:text-white/70">
                          {selectedCountry.population}
                        </span>
                      </p>
                      <p>
                        <span className="font-bold">Region</span>:{" "}
                        <span className="dark:text-white/70">
                          {selectedCountry.region}
                        </span>
                      </p>
                      <p>
                        <span className="font-bold">Sub Region</span>:{" "}
                        <span className="dark:text-white/70">
                          {selectedCountry.subregion}
                        </span>
                      </p>
                      <p>
                        <span className="font-bold">Capital</span>:{" "}
                        <span className="dark:text-white/70">
                          {selectedCountry.capital}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-sm flex flex-col gap-2">
                    <p>
                      <span className="font-bold">Top Level Domain:</span>{" "}
                      <span className="dark:text-white/70">
                        {selectedCountry.topLevelDomain.join(", ")}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Currencies: </span>{" "}
                      <span className="dark:text-white/70">
                        {selectedCountry.currencies.map(
                          (currency) => currency.code
                        )}{" "}
                        {""}
                      </span>
                    </p>
                    <p className="mb-2">
                      <span className="font-bold">Languages:</span>{" "}
                      <span className="dark:text-white/70">
                        {selectedCountry.languages.map((lang, index) => (
                          <span key={index}>
                            {lang.name}
                            {", "}
                          </span>
                        ))}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-sm my-3 flex flex-col sm:flex-row sm:items-center">
                  <p className="font-bold mb-3 sm:w-[30%] lg:w-[40%]">
                    Border Countries:{" "}
                  </p>
                  <div className="dark:text-white/80">
                    {selectedCountry.borders?.map((borderCode) => {
                      const borderCountry = countries.find(
                        (country) => country.alpha3Code === borderCode
                      );
                      return (
                        <button
                          key={borderCode}
                          onClick={() => setSelectedCountry(borderCountry)}
                          className=" hover:underline p-2 shadow-[0_0_5px_rgba(0,0,0,0.2)] m-2 dark:bg-[hsl(207,26%,22%)] cursor-pointer"
                        >
                          {borderCountry.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
