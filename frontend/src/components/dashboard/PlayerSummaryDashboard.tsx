import { MoreHorizontal, Plus } from "lucide-react"
import { Button } from "../common/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { ChartBar } from "../common/Charts/ChartBar";

const PlayerSummaryDashboard = () => {


  return (
    <Card className="card-base ">
      <CardHeader className="card-header flex flex-row items-start justify-between">
        <CardTitle className="card-title">
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
          fullWidth={false}>
          Add New Player
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PlayerSummaryDashboard