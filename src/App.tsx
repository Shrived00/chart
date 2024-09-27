import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { DonutChart } from './components/DonutChart'
import { Github } from "lucide-react";

export default function App() {
  return (
    <div className="bg-neutral-900 text-white relative py-10">
      <LineChart />
      <BarChart />
      <DonutChart />
      <div className="fixed top-5 left-5  ">
        <a href="https://github.com/Shrived00/chart.git" className="text-black hover:text-blue-400  bg-white rounded-full  border p-3 flex  ">
          <Github size={24} />
          <div className="">Github</div>
        </a>
      </div>
    </div>
  );
}