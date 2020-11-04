import Head from 'next/head'
import Home from '../Home/Home'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Head>
      {/* <header className={styles.header}>                    
        <Header />
      </header> */}
      <main><Home /></main>
      {/* <Footer><Logo /></Footer> */}
    </div>
  )
}