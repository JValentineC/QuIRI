import { Search } from "lucide-react";

function DemoHeader() {
  return (
    <>
      <header className="flex justify-between items-center p-4 bg-base-100 p-5 text-base-content">
        <div>
          <img src="src/assets/jvc2.png" alt="Logo" width={40} />
        </div>
        <a href="#">Blog</a>
        <a href="#">Free Tools</a>
        <a href="#">Resources</a>
        <a href="#">Solutions</a>
        <a href="#">About Us</a>

        <div className="flex justify-betweenv items-center">
          <div className="search-container">
            <Search size={24} className="text-base-content" />
          </div>
          <div className="btn btn-ghost btn-sm border-base-300 rounded-btn">
            Get Demo
          </div>
          <div className="btn btn-error btn-sm rounded-btn">
            Free Google Ads Grader
          </div>
        </div>
      </header>
    </>
  );
}

export default DemoHeader;
