import AiTools from "../components/AiTools";
import Best from "../components/Best";
import Description from "../components/Description";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Plan from "../components/Plan";
import ProgrammingSections from "../components/ProgrammingSections";
import Ready from "../components/Ready";
import Testimonial from "../components/Testimonial";
import ToolList from "../components/ToolList";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero /> <ToolList />
      <Description />
      <AiTools />
      <Best />
      <ProgrammingSections/>
         <Plan />
      <Faq />
      {/* <Testimonial /> */}
      <Ready />

      <Footer />
    </>
  );
};

export default Home;
