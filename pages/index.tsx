import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Electronic.AF</title>
      </Head>
      <div className="flex flex-col justify-center items-center h-screen">
        <Image width={600} height={600} src="/logo600.png" alt="Logo" />
        <p className="text-3xl text-slate-800 my-4">
          This site is still under development...
        </p>
      </div>
    </div>
  );
};

export default Home;
