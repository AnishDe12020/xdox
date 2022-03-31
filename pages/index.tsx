import { ArrowRightIcon } from "@radix-ui/react-icons";
import type { NextPage } from "next";
import Link from "next/link";
import FAQ from "../components/FAQ";

const Home: NextPage = () => {
  return (
    <div>
      <main className="mx-8 mt-16 mb-16 flex flex-col items-center justify-center md:mx-16 lg:mx-32">
        <a
          className="group mt-4 mb-8 flex flex-row items-center justify-center space-x-2 rounded-lg bg-gray-700 px-4 py-2 text-accent transition duration-200 hover:opacity-60"
          href="https://blog.anishde.dev/introducing-xdox-start-challenges-log-your-progress-and-show-them-off-to-the-world"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Read the announcement</span>
          <ArrowRightIcon className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
        </a>
        <h1 className="text-center text-3xl font-bold md:text-4xl lg:text-5xl">
          A{" "}
          <span className="bg-gradient-to-tr from-teal-500 to-blue-500 bg-clip-text text-transparent">
            better
          </span>{" "}
          way to keep track of your challenges
        </h1>
        <h2 className="mt-8 text-center text-xl font-semibold md:text-2xl lg:text-3xl">
          XdoX provides you a way to start challenges and log your progress
          everyday.
        </h2>
        <h3 className="text-normal mt-4 text-center text-lg md:text-xl lg:text-2xl">
          You even get a{" "}
          <span className="bg-gradient-to-br from-lime-500 to-green-500 bg-clip-text font-bold text-transparent">
            unique profile page
          </span>{" "}
          🤩
        </h3>
        <Link href="/sign-up" passHref>
          <a className="group mt-4 flex flex-row items-center justify-center space-x-2 rounded-lg bg-accent px-4 py-2 text-black transition duration-200 hover:opacity-60">
            <span>Sounds good, sign me up</span>
            <ArrowRightIcon className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
          </a>
        </Link>

        <section className="mt-64 flex flex-col space-y-4 self-start">
          <h2 className="text-xl font-semibold md:text-2xl lg:text-3xl">FAQ</h2>
          <FAQ
            title="What is XdoX?"
            content="XdoX is a web application that allows you to start challenges and
            log your progress."
          />
          <FAQ title="Is it free?" content="Yes, it is free." />
          <FAQ
            title="How do I use it?"
            content="You can sign up for an account and start challenges. Then you can log your progress from the dashboard."
          />
          <FAQ
            title="Do I need to log my progress everyday?"
            content="It is completely up to you. Ideally you would log your progress every day as these challenges are a specific days of a specific challenge. However, it is completely fine if you skip a day."
          />
        </section>
      </main>
    </div>
  );
};

export default Home;
