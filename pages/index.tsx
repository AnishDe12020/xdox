import { ArrowRightIcon } from "@radix-ui/react-icons";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import FAQ from "../components/FAQ";

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

      <main className="mt-16 flex flex-col items-center justify-center mx-8 flex md:mx-16 lg:mx-32">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
          A{" "}
          <span className="bg-gradient-to-tr from-teal-500 to-blue-500 bg-clip-text text-transparent">
            better
          </span>{" "}
          way to keep track of your challenges
        </h1>
        <h2 className="mt-8 font-semibold text-xl md:text-2xl lg:text-3xl">
          XdoX provides you a way to start challenges and log your progress
          everyday. 
        </h2>
        <h3 className="text-lg md:text-xl lg:text-2xl text-normal mt-4">You even get a{" "}
          <span className="bg-gradient-to-br from-lime-500 to-green-500 bg-clip-text text-transparent font-bold">
            unique profile page
          </span>{" "}
          🤩</h3>
        <Link href="/sign-up" passHref><a className="bg-accent text-black rounded-lg px-4 py-2 transition duration-200 hover:opacity-60 mt-4 flex flex-row space-x-2 group justify-center items-center"><span>Sounds good, sign me up</span><ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition duration-200" /></a></Link>

        <section className="flex flex-col space-y-4 mt-64 self-start">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">FAQ</h2>
          <FAQ title="What is XdoX?" content="XdoX is a web application that allows you to start challenges and
            log your progress." />
          <FAQ title="Is it free?" content="Yes, it is free." />
          <FAQ title="How do I use it?" content="You can sign up for an account and start challenges. Then you can log your progress from the dashboard." />
          <FAQ title="Do I need to log my progress everyday?" content="It is completely up to you. Ideally you would log your progress every day as these challenges are a specific days of a specific challenge. However, it is completely fine if you skip a day." />
        </section>
      </main>
    </div>
  );
};

export default Home;
