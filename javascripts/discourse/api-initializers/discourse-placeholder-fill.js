import { apiInitializer } from "discourse/lib/api";
import { ajax } from "discourse/lib/ajax";

export default apiInitializer("0.11.1", (api) => {
  const currentUser = api.getCurrentUser();

  api.decorateCookedElement(
    (el) => {
      if (currentUser) {
        const goglinks = el.querySelectorAll("a[href*='jotform']");
        goglinks.forEach(function (ele) {
          if (ele.href.includes("=USERNAME=")) {
            ele.href = ele.href.replace("=USERNAME=", currentUser.username);
          }
          if (ele.href.includes("=EMAIL=")) {
            ajax(`/u/${currentUser.username}/emails.json`).then((data) => {
              ele.href = ele.href.replace("=EMAIL=", data.email);
            });
          }
        });
      }
    },
    { onlyStream: true }
  );
});
