function ThemeTest() {
  const switchTheme = (themeName: string) => {
    document.documentElement.setAttribute("data-theme", themeName);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Theme Test</h1>

      {/* Theme Switcher */}
      <div className="mb-4">
        <label className="mr-2">Switch Theme:</label>
        <button
          className="btn btn-sm mr-2"
          onClick={() => switchTheme("light")}
        >
          Light (Default)
        </button>
        <button
          className="btn btn-sm mr-2"
          onClick={() => switchTheme("mytheme")}
        >
          My Purple Theme
        </button>
        <button className="btn btn-sm" onClick={() => switchTheme("dark")}>
          Dark
        </button>
      </div>

      {/* Direct color test */}
      <div className="mb-4">
        <div
          className="p-4 mb-2"
          style={{ backgroundColor: "#592c82", color: "white" }}
        >
          Direct CSS: This should be purple (#592c82)
        </div>
        <div className="p-4 mb-2 bg-primary text-primary-content">
          DaisyUI: bg-primary text-primary-content
        </div>
        <div className="p-4 mb-2 bg-secondary text-secondary-content">
          DaisyUI: bg-secondary text-secondary-content
        </div>
      </div>

      {/* Button tests */}
      <div className="mb-4">
        <button className="btn mr-2">Default Button</button>
        <button className="btn btn-primary mr-2">Primary Button</button>
        <button className="btn btn-secondary mr-2">Secondary Button</button>
        <button className="btn btn-accent">Accent Button</button>
      </div>

      {/* Current theme info */}
      <div className="mb-4 p-4 bg-base-200 rounded">
        <p>
          <strong>Current theme:</strong>{" "}
          <span>
            {document.documentElement.getAttribute("data-theme") || "none"}
          </span>
        </p>
        <p>
          <strong>Expected:</strong> mytheme (for purple colors)
        </p>
      </div>
    </div>
  );
}

export default ThemeTest;
