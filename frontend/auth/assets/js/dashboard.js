(function () {
  const userName = document.querySelector("#user-name");
  const userEmail = document.querySelector("#user-email");
  const avatar = document.querySelector("#user-avatar");
  const provider = document.querySelector("#user-provider");
  const logoutBtn = document.querySelector("#logout-btn");

  function isNativeRuntime() {
    const host = String(window.location.hostname || "").toLowerCase();
    const protocol = String(window.location.protocol || "").toLowerCase();
    const ua = String(navigator.userAgent || "");
    return (
      protocol === "app:" ||
      protocol === "file:" ||
      host === "appassets.androidplatform.net" ||
      /WorkReportiOSApp/i.test(ua)
    );
  }

  function nativeAwareHomeUrl(query) {
    const basePath = isNativeRuntime() ? "/app.html" : "/index.html";
    return `${basePath}${query || ""}`;
  }

  init();

  logoutBtn.addEventListener("click", async () => {
    try {
      await AuthApi.logout();
    } catch {
      // best effort
    }
    window.location.href = nativeAwareHomeUrl("?fromLogout=1");
  });

  async function init() {
    try {
      const me = await AuthApi.me();
      const user = me.user;

      userName.textContent = user.fullName;
      userEmail.textContent = user.email;
      provider.textContent = user.authProvider;

      if (user.avatarUrl) {
        const img = document.createElement("img");
        img.src = user.avatarUrl;
        img.alt = user.fullName;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        avatar.innerHTML = "";
        avatar.appendChild(img);
      } else {
        avatar.textContent = (user.fullName || "U").slice(0, 1).toUpperCase();
      }
    } catch {
      window.location.href = nativeAwareHomeUrl("");
    }
  }
})();
