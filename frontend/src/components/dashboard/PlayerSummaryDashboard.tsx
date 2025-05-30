import { MoreHorizontal, Plus } from "lucide-react"
import { Button } from "../common/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"

const PlayerSummaryDashboard = () => {
  const boysCount = 111;
  const girlsCount = 109;
  const totalPlayers = boysCount + girlsCount;
  const boysPercentage = Math.round((boysCount / totalPlayers) * 100);
  const girlsPercentage = Math.round((girlsCount / totalPlayers) * 100);

  return (
    <Card className="card-base ">
      <CardHeader className="card-header flex flex-row items-start justify-between p-auto">
        <CardTitle className="card-title ">
          Players Summary
        </CardTitle>
        <Button className=" btn-tertiary">
          <MoreHorizontal className="h-6 w-6 text-slate-600" />
        </Button>
      </CardHeader>
      <CardContent className="card-body flex flex-row w-full overflow-y-auto">
        <div className=" h-full w-full gap-1">
          {/* Boys Donut Chart */}
          <div className="flex flex-row shrink-0 h-full w-full items-start">
            <div className="flex items-center justify-center h-[25%] w-[25%]">
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
                  strokeDasharray={`${boysPercentage} 200`}
                  strokeDashoffset="50"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <div className="flex items-center">
                  <svg className="h-[24px] w-[24px] mr-1" viewBox="0 0 24 24" fill="#1E3A5F">
                    <path d="M12 2C11.2 2 10.5 2.7 10.5 3.5V11H7L12 16L17 11H13.5V3.5C13.5 2.7 12.8 2 12 2Z" />
                    <path d="M12 17C9.2 17 7 19.2 7 22H17C17 19.2 14.8 17 12 17Z" />
                  </svg>
                  <span className="font-bold text-lg">{boysPercentage}%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-auto">
              <div className="h-2 w-2 rounded-full bg-blue-900 mr-2"></div>
              <span className="text-sm text-slate-700">{boysCount} ( Boys )</span>
            </div>
          </div>

          {/* Girls Donut Chart */}
          <div className="flex flex-row shrink-0 h-full w-full items-end">
            <div className="flex flex-col h-[25%] w-[25%]">
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
            <div className="flex items-center mt-auto">
              <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-sm text-slate-700">{girlsCount} ( Girls )</span>
            </div>
          </div>
        </div>


      </CardContent>
      <CardFooter className="card-footer ">

        <Button className="btn-primary"
          withIcon={true}
          iconPosition="left"
          icon={<Plus />}
          fullWidth={false}>
          Add New Player
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PlayerSummaryDashboard