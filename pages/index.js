import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import PodCard from "../components/PodCard";
import { useEffect, useState } from "react";
import axios from "axios";
import AddPodcastDialog from "../components/AddPodcastDialog";
import { getMiddlewareRouteMatcher } from "next/dist/shared/lib/router/utils/middleware-route-matcher";
export default function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // useEffect(async() => {
  //   const data = await axios.get("http://localhost:1337/api/podcasts");
  //   setPodcasts(data?.data);
  // }, []);

  useEffect(() => {
    getData()
  }, []);
  const getData = async() => {
    await axios.get(
      "http://localhost:1337/api/podcasts?populate=*",
    ).then(res=>{
      console.log(res.data)
      setPodcasts(res.attributes.name)
    }, [])
  }

  function showAddPodcastDialog() {
    setShowModal(!showModal)
  }
  return (
    <div>
      <Head className={styles.container}>
        <title>Podcast</title>
        <link rel="icon" href="favicon.ico"/>
      </Head>
      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <h2>Hello, Good Day</h2>
          <span>
            <button onClick={showAddPodcastDialog}>Add Podcast</button>
          </span>
        </div>
        <div className={styles.podcontainer}>
          <div className={styles.yourpodcasts}>
            <h3>Your Podcasts</h3>
          </div>
          <div>
            {podcasts.map((podcast, i) => (
              <PodCard key={i} podcast={podcast} />
            ))}
          </div>
        </div>
        {showModal ? (
          <AddPodcastDialog closeModal={showAddPodcastDialog} />
        ): null}
      </main>
    </div>
  )
}