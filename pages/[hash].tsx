import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import Ticker from "components/Ticker";

const Home: NextPage = () => {
  const router = useRouter();
  const { hash } = router.query;

  const [text, setText] = React.useState("");

  React.useEffect(() => {
    async function action() {
      try {
        const response = await fetch(`/api/hello?hash=${hash}`);
        const result = await response.json();
        if (result.message) {
          setText(result.message);
        } else {
          setText("Ding dong...");
        }
      } catch (error) {}
    }
    if (hash) {
      action();
    }
  }, [hash]);

  return (
    <div>
      <Head>
        <title>React LED Scroller</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen flex justify-center items-center bg-black">
        {text && <Ticker text={text} />}
      </div>
    </div>
  );
};

export default Home;
