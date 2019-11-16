async function getUser() {
  try {
    let res = await fetch("https://api.github.com/users/astriskit");
    let json = await res.json();
    return json;
  } catch (er) {
    console.error(er.message || "User-fetch error!!");
    return null;
  }
}
async function getRepos() {
  try {
    let res = await fetch(
      "https://api.github.com/users/astriskit/repos?sort=created"
    );
    let json = await res.json();
    return json;
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
    hireable = false
  },
  repos = []
) {
  e("avatar").setAttribute("src", avatar_url);
  e("name").innerHTML = `<a href="${html_url}">${name}</a>`;
  e("bio").innerText = bio;
  e("location").innerText = location;
  let h = e("hiring");
  if (hireable) {
    h.innerText = "I'm open for good opportunities!";
  } else {
    h.style.display = "none";
  }
  let tbody = q("#repos table tbody");
  let rows = "";
  repos.forEach(({ name, html_url, description, homepage }, ind) => {
    rows += `<tr><td>(${ind +
      1})</td><td><a href="${html_url}" target="_blank">${name}</a></td><td>${description ||
      "-"}</td><td>${
      homepage ? `<a href=${homepage} target="_blank">View</a>` : "-"
    }</td></tr>`;
  });
  tbody.innerHTML = rows;
  e("repos").style.display = "unset";
  e("loading-alert").style.display = "none";
}

(async () => {
  let user = await getUser();
  let repos = await getRepos();
  setInfo(user, repos);
})();
