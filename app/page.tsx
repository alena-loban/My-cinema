import styles from './page.module.css';

export default async function Home() {
  // const data = await fetch(
  //   'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2026&month=JANUARY',
  //   {
  //     method: 'GET',
  //     headers: {
  //       'X-API-KEY': 'c3bb0023-24bb-46c9-a62b-753265ceea95',
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // );
  // const movies = await data.json();
  // console.log(movies);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* <ul>
          {fetchMovie?.map(({ title }) => (
            <li>{title}</li>
          ))}
        </ul> */}
      </main>
    </div>
  );
}
// <Image
//   className={styles.logo}
//   src="/next.svg"
//   alt="Next.js logo"
//   width={100}
//   height={20}
//   priority
// />
