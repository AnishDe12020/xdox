import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>X Days of X</title>
        <meta
          name="description"
          content="An application for keeping track of your x days of x stuff progress"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-xl lg:text-2xl xl:text-3xl">Secret lol</h1>
      </main>
    </div>
  );
};

export default Home;
