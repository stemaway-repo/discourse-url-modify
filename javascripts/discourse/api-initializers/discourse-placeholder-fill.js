import { apiInitializer } from "discourse/lib/api";
import { ajax } from "discourse/lib/ajax";

export default apiInitializer("0.11.1", (api) => {
  const currentUser = api.getCurrentUser();
  personalEmail: null,
    api.decorateCookedElement(
      (el) => {
        if (currentUser) {
          const goglinks = el.querySelectorAll("a[href*='jotform']");
          goglinks.forEach(function (ele) {
            if (ele.href.includes("=USERNAME=")) {
              ele.href = ele.href.replace("=USERNAME=", currentUser.username);
            }
          });
          ajax(`/u/${currentUser.username}/emails.json`).then((data) => {
            el.innerHTML = el.innerHTML.replace("=EMAIL=", data.email);
          });
        }
      },
      { onlyStream: true }
    );
});
