import { createRoot } from "react-dom/client";
import CountdownTimer from "./countdown-timer";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<CountdownTimer />);
