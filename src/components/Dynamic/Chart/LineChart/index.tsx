import { Line, LineConfig } from '@ant-design/plots'

type Props = {
  config: LineConfig
}

const LineChart: React.FC<Props> = ({ config }) => {
  return <Line {...config} />
}

export default LineChart
