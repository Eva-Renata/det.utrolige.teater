import { useContext } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { SearchContent } from "./SearchData";
import styles from "./SearchBar.module.scss";

export const SearchBar = (props) => {
  const navigate = useNavigate();
  const { setSearchData } = useContext(SearchContent);
  const { register, handleSubmit } = useForm();

  const getResult = (data) => {
    setSearchData(data.SearchItem);
    navigate("/search", { replace: true });
  };

  return (
    <form className={styles.searchform} onSubmit={handleSubmit(getResult)}>
      <input
        type="text"
        placeholder={"INDTAST SØGEORD"}
        id="searchItem"
        {...register("SearchItem", { required: true })}
      />
      <button className={styles.searchbutton}>
        <BiSearch />
      </button>
    </form>
  );
};
