import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import Ticker from "components/Ticker";

const Home: NextPage = () => {
  const [text, setText] = React.useState("");
  React.useEffect(() => {
    const u = new URLSearchParams(location.search);
    const theText = u.get("text");
    if (theText) {
      setText(theText);
    }
  }, []);
  return (
    <div>
      <Head>
        <title>React LED Scroller</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen flex justify-center items-center bg-black">
        <Ticker text={text || undefined} />
      </div>
    </div>
  );
};

export default Home;
