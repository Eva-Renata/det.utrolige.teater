import { useEffect } from "react";
import { Footer } from "../Components/Footer/Footer";
import { Header } from "../Components/Header/Header";

//function component Layout med props
export const Layout = (props) => {
  useEffect(() => {
    document.title = props.title;
    if (props.description) {
      document
        .querySelector('meta[name="description"]')
        .setAttribute("content", props.description);
    }
    //dependency array overvåger title og description
  }, [props.title, props.description]);

  return (
    <>
      {/* sætter header og footer i Layout fordi den er en fast element på hele siden */}
      <Header />
      <section>{props.children}</section>
      <Footer />
    </>
  );
};
