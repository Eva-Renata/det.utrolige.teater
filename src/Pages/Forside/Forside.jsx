import { Layout } from "../../App/Layout";
import { Forestillinger } from "../../Components/Forestillinger/Forestillinger";
import "./Forside.module.scss";

export const Forside = () => {
  return (
    <Layout title="Forside" description="Forsiden af Det utrolige teater">
      <>
        <section>
          <Forestillinger />
        </section>
      </>
    </Layout>
  );
};
