import React, { useState, useEffect } from 'react';
import { Calculator, Sprout, Droplets, TrendingUp, AlertCircle } from 'lucide-react';
import { farmCalculations } from '../utils/farmCalculations';

const FarmCalculator = ({ weather }) => {
  const [farmData, setFarmData] = useState({
    farmSize: 10,
    cropType: 'corn',
    soilType: 'medium'
  });
  
  const [calculations, setCalculations] = useState({
    fertilizer: null,
    irrigation: null,
    recommendations: []
  });

  useEffect(() => {
    if (weather) {
      const fertilizerNeeds = farmCalculations.calculateFertilizerNeeds(
        farmData.farmSize, 
        farmData.cropType, 
        farmData.soilType
      );
      
      const irrigationNeeds = farmCalculations.calculateIrrigationNeeds(
        weather, 
        farmData.cropType, 
        farmData.farmSize
      );
      
      const plantingRecs = farmCalculations.getPlantingRecommendations(
        weather, 
        new Date().getMonth() + 1
      );

      setCalculations({
        fertilizer: fertilizerNeeds,
        irrigation: irrigationNeeds,
        recommendations: plantingRecs
      });
    }
  }, [farmData, weather]);

  const handleInputChange = (e) => {
    setFarmData({
      ...farmData,
      [e.target.name]: e.target.value
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Farm Settings */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-green-100 rounded-xl mr-4">
            <Calculator className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Farm Calculator</h3>
            <p className="text-gray-600">Calculate fertilizer and irrigation needs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Farm Size (hectares)
            </label>
            <input
              type="number"
              name="farmSize"
              value={farmData.farmSize}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Crop Type
            </label>
            <select
              name="cropType"
              value={farmData.cropType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="corn">Corn</option>
              <option value="wheat">Wheat</option>
              <option value="soybeans">Soybeans</option>
              <option value="rice">Rice</option>
              <option value="vegetables">Vegetables</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Soil Quality
            </label>
            <select
              name="soilType"
              value={farmData.soilType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="poor">Poor</option>
              <option value="medium">Medium</option>
              <option value="rich">Rich</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fertilizer Calculations */}
      {calculations.fertilizer && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 rounded-xl mr-4">
              <Sprout className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Fertilizer Requirements</h3>
              <p className="text-gray-600">Based on your farm size and crop type</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Nitrogen (N)</h4>
              <p className="text-2xl font-bold text-green-900">{calculations.fertilizer.nitrogen} kg</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Phosphorus (P)</h4>
              <p className="text-2xl font-bold text-blue-900">{calculations.fertilizer.phosphorus} kg</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Potassium (K)</h4>
              <p className="text-2xl font-bold text-purple-900">{calculations.fertilizer.potassium} kg</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Total Weight</h4>
              <p className="text-2xl font-bold text-orange-900">{calculations.fertilizer.totalWeight} kg</p>
            </div>
          </div>
        </div>
      )}

      {/* Irrigation Calculations */}
      {calculations.irrigation && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-cyan-100 rounded-xl mr-4">
              <Droplets className="h-6 w-6 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Irrigation Requirements</h3>
              <p className="text-gray-600">Weather-adjusted water needs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-xl border border-cyan-200">
              <h4 className="font-semibold text-cyan-800 mb-2">Daily Water Need</h4>
              <p className="text-2xl font-bold text-cyan-900">{calculations.irrigation.totalDailyWater} L</p>
              <p className="text-sm text-cyan-700 mt-1">Per day for entire farm</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Weekly Water Need</h4>
              <p className="text-2xl font-bold text-blue-900">{calculations.irrigation.weeklyWater} L</p>
              <p className="text-sm text-blue-700 mt-1">Per week for entire farm</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-2">Per Hectare</h4>
              <p className="text-2xl font-bold text-indigo-900">{calculations.irrigation.dailyWaterPerHectare} L</p>
              <p className="text-sm text-indigo-700 mt-1">Daily per hectare</p>
            </div>
          </div>

          {/* Irrigation Recommendation */}
          <div className={`p-6 rounded-xl border ${getPriorityColor(calculations.irrigation.recommendation.priority)}`}>
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-lg mb-2">{calculations.irrigation.recommendation.action}</h4>
                <p className="mb-2">{calculations.irrigation.recommendation.reason}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-50">
                  Priority: {calculations.irrigation.recommendation.priority}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Planting Recommendations */}
      {calculations.recommendations.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-green-100 rounded-xl mr-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Planting Recommendations</h3>
              <p className="text-gray-600">Based on current season and weather</p>
            </div>
          </div>

          <div className="space-y-4">
            {calculations.recommendations.map((rec, index) => (
              <div key={index} className={`p-6 rounded-xl border ${getPriorityColor(rec.priority)}`}>
                <div className="flex items-start space-x-3">
                  <Sprout className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">{rec.task}</h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <span><strong>Timing:</strong> {rec.timing}</span>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-50">
                        Priority: {rec.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmCalculator;