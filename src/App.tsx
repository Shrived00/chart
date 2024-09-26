
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { DonutChart } from './components/DonutChart'


export default function App() {


  return (
    <div className="bg-neutral-900 text-white">
      <LineChart />
      <BarChart />
      <DonutChart />

    </div>
  );
}
