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

      <main className="flex flex-col justify-center items-center">
        <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">A <span className="from-teal-500 to-blue-500 text-clip text-transparent bg-clip-text bg-gradient-to-tr animate-gradient-text">better</span> way to keep track of your challenges</h1>
      </main>
    </div>
  );
};

export default Home;
