class ColorSchemeSwitcher {
    mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    default = this.mediaQuery.matches ? "dark" : "light";
    saved = window.localStorage.getItem("color-scheme");

    constructor() {
        this.updateDocument();
        this.mediaQuery.addEventListener("change", event => {
            this.default = event.matches ? "dark" : "light";
            this.updateDocument();
        });
    }

    updateDocument() {
        const root = document.documentElement;
        root.setAttribute("data-color-scheme", this.saved || this.default);
    }

    set(scheme) {
        if (scheme === "auto") {
            window.localStorage.removeItem("color-scheme");
            this.saved = null;
            this.updateDocument();
        } else {
            window.localStorage.setItem("color-scheme", scheme);
            this.saved = scheme;
            this.updateDocument();
        }
    }
    get() {
        return this.saved || "auto";
    }
}

// Globally available
window.colorScheme = new ColorSchemeSwitcher();
