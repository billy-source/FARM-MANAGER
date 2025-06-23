export const farmRecommendations = {
  // Irrigation recommendations based on weather
  getIrrigationRecommendation(weather, forecast) {
    const { temperature, humidity, condition } = weather;
    const upcomingRain = forecast.some(day => day.precipitation > 1);
    
    let recommendation = {
      action: 'normal',
      message: 'Normal irrigation schedule',
      waterAmount: 'Standard amount',
      priority: 'medium'
    };

    // High temperature and low humidity
    if (temperature > 30 && humidity < 50) {
      recommendation = {
        action: 'increase',
        message: 'Increase irrigation due to high temperature and low humidity',
        waterAmount: 'Increase by 30-40%',
        priority: 'high'
      };
    }
    // Rain expected
    else if (upcomingRain) {
      recommendation = {
        action: 'reduce',
        message: 'Reduce irrigation - rain expected in coming days',
        waterAmount: 'Reduce by 50% or skip',
        priority: 'low'
      };
    }
    // Hot and humid
    else if (temperature > 28 && humidity > 70) {
      recommendation = {
        action: 'monitor',
        message: 'Monitor soil moisture - high humidity may reduce water needs',
        waterAmount: 'Check soil before watering',
        priority: 'medium'
      };
    }
    // Cool weather
    else if (temperature < 20) {
      recommendation = {
        action: 'reduce',
        message: 'Reduce irrigation in cooler weather',
        waterAmount: 'Reduce by 20-30%',
        priority: 'low'
      };
    }

    return recommendation;
  },

  // Planting recommendations based on season and weather
  getPlantingRecommendations(weather, forecast) {
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const { temperature } = weather;
    const avgTemp = forecast.reduce((sum, day) => sum + day.temperature, 0) / forecast.length;
    
    const recommendations = [];

    // Spring planting (March-May)
    if (currentMonth >= 3 && currentMonth <= 5) {
      if (avgTemp > 15 && avgTemp < 25) {
        recommendations.push({
          crop: 'Corn',
          action: 'Plant Now',
          reason: 'Optimal temperature for corn planting',
          timing: 'Next 2 weeks',
          priority: 'high'
        });
        
        recommendations.push({
          crop: 'Soybeans',
          action: 'Prepare',
          reason: 'Good conditions approaching for soybeans',
          timing: 'In 3-4 weeks',
          priority: 'medium'
        });
      }
      
      if (avgTemp > 10) {
        recommendations.push({
          crop: 'Potatoes',
          action: 'Plant Now',
          reason: 'Good soil temperature for potato planting',
          timing: 'Next week',
          priority: 'high'
        });
      }
    }

    // Summer planting (June-August)
    if (currentMonth >= 6 && currentMonth <= 8) {
      if (avgTemp < 30) {
        recommendations.push({
          crop: 'Late Season Corn',
          action: 'Consider',
          reason: 'Temperature suitable for late planting',
          timing: 'This month',
          priority: 'medium'
        });
      }
      
      recommendations.push({
        crop: 'Fall Vegetables',
        action: 'Prepare',
        reason: 'Start planning for fall harvest',
        timing: 'Late summer',
        priority: 'low'
      });
    }

    // Fall planting (September-November)
    if (currentMonth >= 9 && currentMonth <= 11) {
      recommendations.push({
        crop: 'Winter Wheat',
        action: 'Plant Now',
        reason: 'Ideal time for winter wheat planting',
        timing: 'Next 2 weeks',
        priority: 'high'
      });
      
      recommendations.push({
        crop: 'Cover Crops',
        action: 'Plant Now',
        reason: 'Protect soil over winter',
        timing: 'Before frost',
        priority: 'medium'
      });
    }

    // Winter (December-February)
    if (currentMonth === 12 || currentMonth <= 2) {
      recommendations.push({
        crop: 'Planning',
        action: 'Plan Next Season',
        reason: 'Use winter months for crop planning',
        timing: 'Before spring',
        priority: 'medium'
      });
    }

    return recommendations;
  },

  // General farm activity recommendations
  getFarmActivityRecommendations(weather, forecast) {
    const activities = [];
    const { condition, temperature, humidity } = weather;
    const rainExpected = forecast.some(day => day.precipitation > 0.5);

    // Weather-based activities
    if (condition === 'Clear' && !rainExpected) {
      activities.push({
        activity: 'Field Work',
        recommendation: 'Excellent conditions for field operations',
        priority: 'high',
        timing: 'Today and tomorrow'
      });
    }

    if (rainExpected) {
      activities.push({
        activity: 'Equipment Maintenance',
        recommendation: 'Good time for indoor maintenance work',
        priority: 'medium',
        timing: 'During rainy days'
      });
    }

    if (temperature > 25 && humidity < 60) {
      activities.push({
        activity: 'Harvesting',
        recommendation: 'Good drying conditions for harvest',
        priority: 'high',
        timing: 'Next few days'
      });
    }

    return activities;
  }
};