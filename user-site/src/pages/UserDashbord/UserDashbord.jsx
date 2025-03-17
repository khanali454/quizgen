import { Link } from "react-router-dom";
import { DocumentIcon, CloudArrowUpIcon, ArrowDownTrayIcon, BoltIcon } from "@heroicons/react/24/outline";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip);

// Enhanced Doughnut Chart Component
const DoughnutChart = ({ used, total }) => {
  const percentageUsed = ((used / total) * 100).toFixed(1);

  const data = {
    labels: ['Used Credits', 'Remaining Credits'],
    datasets: [{
      data: [used, total - used],
      backgroundColor: ['#059669', '#A7F3D0'],
      borderColor: ['#fff', '#fff'],
      borderWidth: 2,
      hoverOffset: 8,
      spacing: 2,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} Credits`
        }
      },
    }
  };

  return (
    <div className="relative w-40 h-40 mx-auto">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-emerald-800">{percentageUsed}%</span>
        <span className="text-sm text-emerald-700">Used</span>
      </div>
    </div>
  );
};

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">

      {/* Card 1 - Total MCQs Generated */}
      <Link to="/mcqs" className="flex flex-col justify-between bg-gradient-to-r from-[#FF9800] to-[#FF5722] 
        shadow-lg rounded-xl p-6 text-white hover:scale-105 transition-transform min-h-[150px] h-auto">
        <DocumentIcon className="h-10 w-10 opacity-80" />
        <h2 className="text-lg font-semibold mt-2">MCQs Generated</h2>
        <p className="text-2xl font-bold">1,230</p>
        <div className="border-t border-gray-100 border-dotted my-4"></div>
        <span className="text-sm opacity-80">All Time</span>
      </Link>

      {/* Card 2 - Total Files Uploaded */}
      <Link to="/files" className="flex flex-col justify-between bg-gradient-to-r from-[#673AB7] to-[#3F51B5] 
        shadow-lg rounded-xl p-6 text-white hover:scale-105 transition-transform min-h-[150px] h-auto">
        <CloudArrowUpIcon className="h-10 w-10 opacity-80" />
        <h2 className="text-lg font-semibold mt-2">Files Uploaded</h2>
        <p className="text-2xl font-bold">245</p>
        <div className="border-t border-gray-100 border-dotted my-4"></div>
        <span className="text-sm opacity-80">All Time</span>
      </Link>

      {/* Card 3 - Total Downloaded Files */}
      <Link to="/mcqs" className="flex flex-col justify-between bg-gradient-to-r from-[#2196F3] to-[#03A9F4] 
        shadow-lg rounded-xl p-6 text-white hover:scale-105 transition-transform min-h-[150px] h-auto">
        <ArrowDownTrayIcon className="h-10 w-10 opacity-80" />
        <h2 className="text-lg font-semibold mt-2">Downloaded Files</h2>
        <p className="text-2xl font-bold">530</p>
        <div className="border-t border-gray-100 border-dotted my-4"></div>
        <span className="text-sm opacity-80">All Time</span>
      </Link>

      {/* Card 4 - Enhanced Credits Overview */}
      <Link to="/manage-subscription" className="flex flex-col justify-between bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] 
        shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 min-h-[200px] h-auto group
        hover:ring-2 hover:ring-emerald-100">

        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <BoltIcon className="h-8 w-8 text-emerald-600 mb-2 group-hover:animate-pulse" />
            <h2 className="text-lg font-semibold text-emerald-900">Credits Overview</h2>
          </div>
          <span className="text-xs opacity-80">Total Credits: 500</span>
        </div>

        {/* Main Chart Section */}
        <DoughnutChart used={250} total={500} />

      </Link>
    </div>
  );
}
