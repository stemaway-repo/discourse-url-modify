import { apiInitializer } from "discourse/lib/api";
import { ajax } from "discourse/lib/ajax";

export default apiInitializer("0.11.1", (api) => {
  const currentUser = api.getCurrentUser();

  api.decorateCookedElement(
    (el) => {
      if (currentUser) {
        const goglinks = el.querySelectorAll("a[href*='jotform']");
        goglinks.forEach(function (ele) {
          if (ele.includes("=USERNAME=")) {
            ele.href = ele.href.replace("=USERNAME=", currentUser.username);
          }
          if (ele.href.includes("=NAME=")) {
            ele.href = ele.href.replace("=NAME=", currentUser.name);
          }
          if (ele.href.includes("=EMAIL=")) {
            ajax(`/u/${currentUser.username}/emails.json`).then((data) => {
              ele.href = ele.href.replace("=EMAIL=", data.email);
            });
          }
        });
        const userFields = el.querySelectorAll("iframe");
        userFields.forEach(function (userField) {
          if (userField.src.includes("=USERNAME=")) {
            userField.src = userField.src.replace(
              "=USERNAME=",
              currentUser.username
            );
          }
          if (userField.src.includes("=NAME=")) {
            userField.src = userField.src.replace("=NAME=", currentUser.name);
          }
          if (userField.src.includes("=EMAIL=")) {
            ajax(`/u/${currentUser.username}/emails.json`).then((data) => {
              userField.src = userField.src.replace("=EMAIL=", data.email);
            });
          }
        });
      } else {
        const goglinks = el.querySelectorAll("a[href*='jotform']");
        goglinks.forEach(function (ele) {
          if (ele.includes.includes("?")) {
            ele.href = ele.href.split("?")[0];
          }
        });
        const userFields = el.querySelectorAll("iframe");
        userFields.forEach(function (userField) {
          if (userField.src.includes("=USERNAME=")|| userField.src.includes("=NAME=") ||userField.src.includes("=EMAIL=") ) {
            userField.src = "";
          }
        }

      }
    },
    { onlyStream: true }
  );
});
