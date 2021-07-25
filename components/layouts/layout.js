import Head from "next/head";
import { useSelector } from 'react-redux'
import ScrollToTop from "react-scroll-to-top";
import { useRouter } from 'next/router'
import styles from "styles/Layout.module.css"
import TopHeader from "./top-header";
import Header from "./header";
import Footer from "./footer";
import SideCart from "components/sidecart.module/side-cart"
import SelectCountryModal from 'components/enroller.module/select-country-modal'

export default function Layout({ children, pageTitle }) {
  const { pathname } = useRouter()
  const yourCountry = useSelector(state=>state.mlm.yourCountry)

  return (
    <>
      <Head>
        <title>{pageTitle ? pageTitle + " | " : ""}ALUVA</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/favicon.png"
        />
        <link rel="stylesheet" href="/css/aos.css" />
        <link rel="stylesheet" href="/fonts/stylesheet.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/image-gallery.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/aos.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA1J8gKf3Aej3K_Rb9XndyyOSPjLHZsBq0&libraries=places"></script>
      </Head>
      <TopHeader />      
      <div className='main-banner home-banner'>
        <Header />
        {children}
        <SideCart />
        <Footer />
      </div>
      {/*
      !yourCountry?
        <SelectCountryModal />
      : <></>
      */}
      
      <ScrollToTop 
        className={styles.scrollToTop}
        color='#888'
        viewBox={"0 0 256 224"}
      />
    </>
  );
}
