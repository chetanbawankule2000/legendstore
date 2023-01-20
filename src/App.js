import "./App.css";
import { State } from "./State";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "@legendapp/state/react";

const App = () => {
  const loading = useSelector(() => State.users.loading.get());
  const users = useSelector(() => State.users.users.get());
  const error = useSelector(() => State.users.error.get());

  const getUers = () => {
    State.users.loading.set(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        State.users.set({
          loading: false,
          error: null,
          users: response.data,
        });
      })
      .catch((e) => {
        State.users.set({ loading: false, error: e.message, users: null });
      });
  };
  useEffect(() => {
    getUers();
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
      {/* <h4>Renders:{renderCount}</h4> */}
      {loading ? (
        <h1>Loading...</h1>
      ) : !loading && !error ? (
        <>
          {users?.map((item, index) => {
            return <h1 key={index}>{item.name}</h1>;
          })}
        </>
      ) : (
        <h1>Something went wrong:{error}</h1>
      )}
    </div>
  );
};

export default App;
