import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import "./localOrgIndex.css"
import LocalOrgApp from "./localOrgApp.tsx";


// createRoot(document.getElementById("root")!).render(userType === "organization" ? <LocalOrgApp /> : <App />);
//  createRoot(document.getElementById("root")!).render(<LocalOrgApp />);
createRoot(document.getElementById("root")!).render(<App />);