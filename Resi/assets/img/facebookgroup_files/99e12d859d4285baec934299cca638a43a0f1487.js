const redirectsData = [
  {
    fromURL: "https://support.buffer.com/legal",
    toURL: "https://buffer.com/legal",
  },
];

function redirects() {
  redirectsData.forEach((item, index) => {
    if (window.location.href === item.fromURL) {
      window.location.replace(item.toURL);
    }
  });
}

redirects();
