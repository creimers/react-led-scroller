import type { NextPage } from "next";
import Head from "next/head";

import Ticker from "components/Ticker";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>React LED Scroller</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen flex justify-center items-center bg-black">
        <Ticker />
      </div>
    </div>
  );
};

export default Home;
