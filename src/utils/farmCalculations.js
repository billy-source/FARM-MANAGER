// Farm calculation utilities
export const farmCalculations = {
  // Calculate fertilizer needed based on farm size and crop type
  calculateFertilizerNeeds(farmSize, cropType, soilType = 'medium') {
    const fertilizerRates = {
      corn: { nitrogen: 150, phosphorus: 60, potassium: 40 },
      wheat: { nitrogen: 120, phosphorus: 50, potassium: 30 },
      soybeans: { nitrogen: 20, phosphorus: 40, potassium: 60 },
      rice: { nitrogen: 100, phosphorus: 30, potassium: 30 },
      vegetables: { nitrogen: 100, phosphorus: 80, potassium: 100 },
      default: { nitrogen: 100, phosphorus: 50, potassium: 50 }
    };

    const soilMultiplier = {
      poor: 1.3,
      medium: 1.0,
      rich: 0.7
    };

    const rates = fertilizerRates[cropType.toLowerCase()] || fertilizerRates.default;
    const multiplier = soilMultiplier[soilType] || 1.0;

    return {
      nitrogen: Math.round((rates.nitrogen * farmSize * multiplier) / 1000 * 100) / 100,
      phosphorus: Math.round((rates.phosphorus * farmSize * multiplier) / 1000 * 100) / 100,
      potassium: Math.round((rates.potassium * farmSize * multiplier) / 1000 * 100) / 100,
      totalWeight: Math.round(((rates.nitrogen + rates.phosphorus + rates.potassium) * farmSize * multiplier) / 1000 * 100) / 100
    };
  },

  // Calculate irrigation needs based on weather and crop
  calculateIrrigationNeeds(weather, cropType, farmSize) {
    const cropWaterNeeds = {
      corn: 600, // mm per season
      wheat: 450,
      soybeans: 500,
      rice: 1200,
      vegetables: 400,
      default: 500
    };

    const baseWaterNeed = cropWaterNeeds[cropType.toLowerCase()] || cropWaterNeeds.default;
    
    // Adjust based on temperature and humidity
    let adjustmentFactor = 1.0;
    if (weather.temperature > 30) adjustmentFactor += 0.2;
    if (weather.temperature < 20) adjustmentFactor -= 0.1;
    if (weather.humidity < 50) adjustmentFactor += 0.15;
    if (weather.humidity > 80) adjustmentFactor -= 0.1;

    const dailyWaterNeed = (baseWaterNeed / 120) * adjustmentFactor; // Assuming 120-day growing season
    const totalWaterNeeded = dailyWaterNeed * farmSize; // liters per day

    return {
      dailyWaterPerHectare: Math.round(dailyWaterNeed),
      totalDailyWater: Math.round(totalWaterNeeded),
      weeklyWater: Math.round(totalWaterNeeded * 7),
      recommendation: this.getIrrigationRecommendation(adjustmentFactor, weather)
    };
  },

  getIrrigationRecommendation(adjustmentFactor, weather) {
    if (adjustmentFactor > 1.2) {
      return {
        action: 'Increase irrigation',
        reason: 'High temperature and low humidity detected',
        priority: 'high'
      };
    } else if (adjustmentFactor < 0.9) {
      return {
        action: 'Reduce irrigation',
        reason: 'Cool weather and high humidity',
        priority: 'low'
      };
    } else {
      return {
        action: 'Maintain current irrigation',
        reason: 'Weather conditions are optimal',
        priority: 'medium'
      };
    }
  },

  // Calculate planting recommendations
  getPlantingRecommendations(weather, currentMonth) {
    const recommendations = [];
    
    const plantingCalendar = {
      1: ['Plan for spring crops', 'Prepare equipment'],
      2: ['Start seedlings indoors', 'Soil preparation'],
      3: ['Plant cool-season crops', 'Prepare fields'],
      4: ['Plant corn and soybeans', 'Continue spring planting'],
      5: ['Complete spring planting', 'Monitor early crops'],
      6: ['Plant summer crops', 'First cultivation'],
      7: ['Monitor crop growth', 'Pest management'],
      8: ['Continue monitoring', 'Plan fall crops'],
      9: ['Harvest early crops', 'Plant winter wheat'],
      10: ['Fall harvest', 'Plant cover crops'],
      11: ['Complete harvest', 'Field cleanup'],
      12: ['Equipment maintenance', 'Plan next year']
    };

    const monthlyTasks = plantingCalendar[currentMonth] || [];
    
    monthlyTasks.forEach(task => {
      recommendations.push({
        task,
        timing: 'This month',
        priority: 'medium'
      });
    });

    // Weather-based recommendations
    if (weather.temperature > 15 && currentMonth >= 3 && currentMonth <= 5) {
      recommendations.push({
        task: 'Optimal planting conditions',
        timing: 'Next 2 weeks',
        priority: 'high'
      });
    }

    return recommendations;
  }
};