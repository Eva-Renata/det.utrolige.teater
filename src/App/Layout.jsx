import { useEffect } from "react";
import { Footer } from "../Components/Footer/Footer";
import { Navigation } from "../Components/Nav/Navigation";

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
      {/* sætter navigation og footer i Layout fordi den er en fast element på hele siden */}
      <Navigation />
      <section>{props.children}</section>
      <Footer />
    </>
  );
};
