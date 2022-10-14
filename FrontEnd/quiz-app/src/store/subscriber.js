import store from "@/store";
import axios from "axios";

store.subscribe((mutation) => {
  switch (mutation.type) {
    case "auth/SET_TOKEN":
      if (mutation.payload.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${mutation.payload.token}`;

        localStorage.setItem("token", mutation.payload.token);
        localStorage.setItem("id", mutation.payload.id);
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("token");
        localStorage.removeItem("id");
      }
      break;
  }
});
