import { MoreHorizontal, Plus } from "lucide-react"
import { Button } from "../common/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { ChartBar } from "../common/Charts/ChartBar";

const PlayerSummaryDashboard = () => {


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
        <ChartBar />

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