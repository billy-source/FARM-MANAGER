import React from 'react';
import { 
  Droplets, 
  Sprout, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp
} from 'lucide-react';

const RecommendationCard = ({ irrigationRec, plantingRecs, activityRecs }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'medium':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Irrigation Recommendations */}
      {irrigationRec && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Droplets className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Irrigation Recommendation</h3>
          </div>
          
          <div className={`p-4 rounded-lg border ${getPriorityColor(irrigationRec.priority)}`}>
            <div className="flex items-start space-x-3">
              {getPriorityIcon(irrigationRec.priority)}
              <div className="flex-1">
                <h4 className="font-medium mb-2">{irrigationRec.action.toUpperCase()}: {irrigationRec.message}</h4>
                <p className="text-sm mb-2">
                  <strong>Water Amount:</strong> {irrigationRec.waterAmount}
                </p>
                <p className="text-sm">
                  <strong>Priority:</strong> {irrigationRec.priority.charAt(0).toUpperCase() + irrigationRec.priority.slice(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Planting Recommendations */}
      {plantingRecs && plantingRecs.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Sprout className="h-6 w-6 text-green-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Planting Recommendations</h3>
          </div>
          
          <div className="space-y-3">
            {plantingRecs.map((rec, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}>
                <div className="flex items-start space-x-3">
                  {getPriorityIcon(rec.priority)}
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{rec.crop} - {rec.action}</h4>
                    <p className="text-sm mb-1">{rec.reason}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span><strong>Timing:</strong> {rec.timing}</span>
                      <span><strong>Priority:</strong> {rec.priority}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Farm Activity Recommendations */}
      {activityRecs && activityRecs.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-purple-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Farm Activity Recommendations</h3>
          </div>
          
          <div className="space-y-3">
            {activityRecs.map((rec, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}>
                <div className="flex items-start space-x-3">
                  {getPriorityIcon(rec.priority)}
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{rec.activity}</h4>
                    <p className="text-sm mb-1">{rec.recommendation}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span><strong>Timing:</strong> {rec.timing}</span>
                      <span><strong>Priority:</strong> {rec.priority}</span>
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

export default RecommendationCard;