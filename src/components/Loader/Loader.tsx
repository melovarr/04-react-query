import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div>
      <p className={css.text}>lLoading movies, please wait...</p>
    </div>
  );
}
