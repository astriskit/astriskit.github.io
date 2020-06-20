async function getUser() {
  try {
    const res = await fetch("https://api.github.com/users/astriskit");
    const json = await res.json();
    return json;
  } catch (er) {
    console.error(er.message || "User-fetch error!!");
    return null;
  }
}
async function getRepos() {
  try {
    const res = await fetch(
      "https://api.github.com/users/astriskit/repos?sort=created"
    );
    const json = await res.json();
    const repos = json.filter(({ name }) => name !== "astriskit.github.io");
    return repos;
  } catch (er) {
    console.error(er.message || "User-repo-fetch error!!");
    return null;
  }
}

function e(...args) {
  return document.getElementById(args);
}

function q(...args) {
  return document.querySelector(args);
}

function setInfo(
  {
    avatar_url = "",
    name = "S H",
    bio = "",
    html_url = "#",
    location = "",
    hireable = false,
  },
  repos = []
) {
  e("avatar").setAttribute("href", html_url);
  q("#avatar img").setAttribute("src", avatar_url);
  e("name").innerText = name;
  e("bio").innerText = bio;
  e("location").innerText = location || "Somewhere in mystery-land :P";
  let h = e("hiring");
  if (hireable) {
    h.innerText = "I'm open for good opportunities!";
  } else {
    h.style.display = "none";
  }
  let tbody = q("#repos table tbody");
  let rows = "";
  repos.forEach(({ name, html_url, description, homepage }, ind) => {
    rows += `<tr><td>(${
      ind + 1
    })</td><td><a href="${html_url}" target="_blank">${name}</a></td><td>${
      description || "-"
    }</td><td>${
      homepage ? `<a href=${homepage} target="_blank">View</a>` : "-"
    }</td></tr>`;
  });
  tbody.innerHTML = rows;
  e("root").style.display = "flex";
  e("loading-alert").style.display = "none";
}

(async () => {
  let user = await getUser();
  let repos = await getRepos();
  setInfo(user, repos);
})();
