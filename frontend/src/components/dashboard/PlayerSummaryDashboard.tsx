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
        <Button className="btn-base btn-tertiary">
          <MoreHorizontal className="icon-base icon-tertiary" />
        </Button>
      </CardHeader>
      <CardContent className="card-body flex flex-col w-full overflow-y-auto">
        <ChartBar />
      </CardContent>
      <CardFooter className="card-footer">

        <Button className="btn-base btn-primary"
          withIcon={true}
          iconPosition="left"
          icon={<Plus />}
          fullWidth={true}
          size="sm"
          variant="primary"
        >
          <span>Add New Player</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PlayerSummaryDashboard