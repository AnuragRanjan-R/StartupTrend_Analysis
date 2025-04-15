import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Filter } from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

// Sample data for the charts
const fundingTrendsData = [
  { year: 2018, global: 220, india: 42 },
  { year: 2019, global: 257, india: 55 },
  { year: 2020, global: 295, india: 63 },
  { year: 2021, global: 621, india: 98 },
  { year: 2022, global: 467, india: 85 },
  { year: 2023, global: 390, india: 72 },
  { year: 2024, global: 435, india: 89 },
];

const sectorData = [
  { name: 'Fintech', value: 28 },
  { name: 'Edtech', value: 19 },
  { name: 'Healthtech', value: 15 },
  { name: 'AI/SaaS', value: 22 },
  { name: 'E-commerce', value: 12 },
  { name: 'ClimateTech', value: 4 },
];

const growthPredictionData = [
  { year: 2024, actual: 435, predicted: 435 },
  { year: 2025, actual: null, predicted: 498 },
  { year: 2026, actual: null, predicted: 572 },
  { year: 2027, actual: null, predicted: 635 },
  { year: 2028, actual: null, predicted: 682 },
];

const survivalRateData = [
  { year: 1, survival: 87 },
  { year: 2, survival: 69 },
  { year: 3, survival: 52 },
  { year: 4, survival: 41 },
  { year: 5, survival: 30 },
];

const impactIndexData = [
  { sector: 'Fintech', economic: 7.8, social: 5.6 },
  { sector: 'Edtech', economic: 6.5, social: 8.2 },
  { sector: 'Healthtech', economic: 7.2, social: 8.7 },
  { sector: 'AI/SaaS', economic: 8.5, social: 6.9 },
  { sector: 'E-commerce', economic: 7.1, social: 5.8 },
  { sector: 'ClimateTech', economic: 6.3, social: 9.2 },
];

const cityData = [
  { name: 'Bangalore', startups: 4500, funding: 89, growth: 18 },
  { name: 'Delhi NCR', startups: 3800, funding: 76, growth: 15 },
  { name: 'Mumbai', startups: 2900, funding: 65, growth: 12 },
  { name: 'Hyderabad', startups: 1800, funding: 42, growth: 20 },
  { name: 'Pune', startups: 1200, funding: 28, growth: 17 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const BUBBLE_COLORS = {
  high: '#ff6b6b',
  medium: '#feca57',
  low: '#1dd1a1'
};

export default function StartupDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedSector, setSelectedSector] = useState('All');
  
  const sectors = ['All', 'Fintech', 'Edtech', 'Healthtech', 'AI/SaaS', 'E-commerce', 'ClimateTech'];
  
  // Filter data based on selected sector (dummy implementation for demo)
  const filteredSectorData = selectedSector === 'All' 
    ? sectorData 
    : sectorData.filter(item => item.name === selectedSector);
  
  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <header className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-bold">Startup Boom Analysis – Curated by Anurag Ranjan</h1>
        <div className="flex gap-4">
          <div className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            <select 
              className={`p-2 rounded-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
            >
              {sectors.map((sector) => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>
          <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>
      
      <main className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {/* Funding Trends */}
        <Card className={darkMode ? 'bg-gray-800' : 'bg-white'}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Funding Trends</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={fundingTrendsData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#555' : '#ccc'} />
                  <XAxis dataKey="year" stroke={darkMode ? '#aaa' : '#666'} />
                  <YAxis stroke={darkMode ? '#aaa' : '#666'} />
                  <Tooltip
                    contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', borderColor: darkMode ? '#555' : '#ddd' }}
                    labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="global" stroke="#8884d8" name="Global ($B)" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="india" stroke="#82ca9d" name="India ($B)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Sector-wise Analysis */}
        <Card className={darkMode ? 'bg-gray-800' : 'bg-white'}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Sector-wise Analysis</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={filteredSectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}B`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Growth Predictions */}
        <Card className={darkMode ? 'bg-gray-800' : 'bg-white'}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Growth Predictions</h2>
            <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">Logistic/CAGR model forecast till 2028</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={growthPredictionData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#555' : '#ccc'} />
                  <XAxis dataKey="year" stroke={darkMode ? '#aaa' : '#666'} />
                  <YAxis stroke={darkMode ? '#aaa' : '#666'} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', borderColor: darkMode ? '#555' : '#ddd' }}
                    labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                  />
                  <Area type="monotone" dataKey="actual" stroke="#8884d8" fill="#8884d8" name="Actual ($B)" />
                  <Area type="monotone" dataKey="predicted" stroke="#82ca9d" fill="#82ca9d" name="Predicted ($B)" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Survival Rate */}
        <Card className={darkMode ? 'bg-gray-800' : 'bg-white'}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Survival Rate</h2>
            <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">Startup mortality vs. unicorn probability</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={survivalRateData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#555' : '#ccc'} />
                  <XAxis dataKey="year" stroke={darkMode ? '#aaa' : '#666'} label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                  <YAxis stroke={darkMode ? '#aaa' : '#666'} label={{ value: 'Survival %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', borderColor: darkMode ? '#555' : '#ddd' }}
                    labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                  />
                  <Bar dataKey="survival" fill="#ff8042" name="Survival Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Impact Index */}
        <Card className={darkMode ? 'bg-gray-800' : 'bg-white'}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Impact Index</h2>
            <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">Economic vs Social impact by sector</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={impactIndexData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#555' : '#ccc'} />
                  <XAxis type="number" stroke={darkMode ? '#aaa' : '#666'} />
                  <YAxis dataKey="sector" type="category" stroke={darkMode ? '#aaa' : '#666'} />
                  <Tooltip
                    contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', borderColor: darkMode ? '#555' : '#ddd' }}
                    labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                  />
                  <Legend />
                  <Bar dataKey="economic" fill="#8884d8" name="Economic Impact" barSize={20} />
                  <Bar dataKey="social" fill="#82ca9d" name="Social Impact" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Urban & Policy Layer */}
        <Card className={darkMode ? 'bg-gray-800' : 'bg-white'}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Urban & Policy Layer</h2>
            <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">Startup ecosystem by major Indian cities</p>
            <div className="h-80"> {/* Increased height to ensure all data is visible */}
              <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={cityData}
            margin={{ top: 10, right: 30, left: 20, bottom: 50 }} // Added bottom margin for better spacing
          >
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#555' : '#ccc'} />
            <XAxis 
              dataKey="name" 
              stroke={darkMode ? '#aaa' : '#666'} 
              interval={0} 
              angle={-45} 
              textAnchor="end" 
            /> {/* Rotated labels for better visibility */}
            <YAxis stroke={darkMode ? '#aaa' : '#666'} />
            <Tooltip
              contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', borderColor: darkMode ? '#555' : '#ddd' }}
              labelStyle={{ color: darkMode ? '#fff' : '#000' }}
            />
            <Legend />
            <Bar dataKey="startups" fill="#8884d8" name="Number of Startups (x100)" />
            <Bar dataKey="funding" fill="#82ca9d" name="Total Funding ($B)" />
          </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <footer className={`p-4 border-t ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-600'} text-center`}>
        <p className="text-sm">Data based on research from 2018-2024. Predictions use combined CAGR & logistic modeling.</p>
        <p className="text-sm mt-2">© 2025 Startup Boom Analysis Dashboard</p>
      </footer>
    </div>
  );
}