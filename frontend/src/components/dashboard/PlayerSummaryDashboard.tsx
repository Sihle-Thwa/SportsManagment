import { MoreHorizontal, Plus } from "lucide-react"
import { Button } from "../common/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { ChartBar } from "../common/Charts/ChartBar";

const PlayerSummaryDashboard = () => {


  return (
    <Card className="card">
      <CardHeader className="card-header flex flex-row items-start justify-between">
        <CardTitle className="card-header-title">
          Players Summary
        </CardTitle>
        <Button className="btn btn--primary btn--icon-only">
          <MoreHorizontal />
        </Button>
      </CardHeader>
      <CardContent className="card-body flex flex-col w-full overflow-y-auto">
        <ChartBar />
      </CardContent>
      <CardFooter className="card-footer flex flex-row items-end justify-center">
        <div className="flex flex-row w-fit h-fit gap-3">
          <Button
            variant="primary"
            size="md"
            withIcon={true}
            fullWidth={false}
          >
            <Plus />
            Add New Player
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PlayerSummaryDashboard