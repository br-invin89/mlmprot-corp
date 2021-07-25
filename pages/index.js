import Layout from "components/layouts/layout";
import MainSlider from "components/home.page/main-slider"
import HomeHtml from "components/home.page/home-html"

export default function Home() {
  return (
    <Layout>
      <MainSlider />
      <HomeHtml />
    </Layout>
  );
}
