import css from "./SearchBar.module.css";
import toast from "react-hot-toast";
import ToasterMessage from "../Toaster/Toaster";

interface SearchBarProps {
  onSubmit: (topic: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const topic = formData.get("query") as string;
    if (topic === "") {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(topic);
  };
  return (
    <div>
      <header className={css.header}>
        <div className={css.container}>
          <a
            className={css.link}
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>
          <form className={css.form} action={handleSubmit}>
            <input
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={css.button} type="submit">
              Search
            </button>
          </form>
        </div>
        <ToasterMessage />
      </header>
    </div>
  );
}
