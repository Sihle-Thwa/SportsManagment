import { MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const PlayerSummaryDashboard = () => {
  const boysCount = 111;
  const girlsCount = 109;
  const totalPlayers = boysCount + girlsCount;
  const boysPercentage = Math.round((boysCount / totalPlayers) * 100);
  const girlsPercentage = Math.round((girlsCount / totalPlayers) * 100);

  return (
    <Card className="flex flex-col w-full max-w-lg shadow-sm rounded-lg overflow-hidden bg-white">
      <CardHeader className="flex flex-row items-start justify-between p-3">
        <CardTitle className="text-xl font-semibold text-slate-800">
          Players Summary
        </CardTitle>
        <Button variant="ghost" className=" hover:bg-slate-100">
          <MoreHorizontal className="h-6 w-6 text-slate-600" />
        </Button>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex flex-row items-start gap-3 p-3">
          {/* Boys Donut Chart */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center h-24 w-24">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#1E3A5F"
                  strokeWidth="12"
                  strokeDasharray={`${2.51 * boysPercentage} 251`}
                  strokeDashoffset="62.75"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <div className="flex items-center">
                  <svg className="h-4 w-3 mr-1" viewBox="0 0 24 24" fill="#1E3A5F">
                    <path d="M12 2C11.2 2 10.5 2.7 10.5 3.5V11H7L12 16L17 11H13.5V3.5C13.5 2.7 12.8 2 12 2Z" />
                    <path d="M12 17C9.2 17 7 19.2 7 22H17C17 19.2 14.8 17 12 17Z" />
                  </svg>
                  <span className="font-bold text-lg">{boysPercentage}%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="h-2 w-2 rounded-full bg-blue-900 mr-2"></div>
              <span className="text-sm text-slate-700">{boysCount} ( Boys )</span>
            </div>
          </div>

          {/* Girls Donut Chart */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center h-24 w-24">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="12"
                  strokeDasharray={`${2.51 * girlsPercentage} 251`}
                  strokeDashoffset="62.75"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <div className="flex items-center">
                  <svg className="h-4 w-3 mr-1" viewBox="0 0 24 24" fill="#F59E0B">
                    <path d="M12 2C11.2 2 10.5 2.7 10.5 3.5V11H7L12 16L17 11H13.5V3.5C13.5 2.7 12.8 2 12 2Z" />
                    <path d="M12 17C9.2 17 7 19.2 7 22H17C17 19.2 14.8 17 12 17Z" />
                  </svg>
                  <span className="font-bold text-lg">{girlsPercentage}%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-sm text-slate-700">{girlsCount} ( Girls )</span>
            </div>
          </div>
        </div>

        {/* Add New Player Button */}
        <Button 
          className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-md flex items-center justify-center"
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14m-7-7h14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Add New Player
        </Button>
      </CardContent>
    </Card>
  )
}

export default PlayerSummaryDashboard