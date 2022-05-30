import { FETCH_CHART_DATA } from "../../../utils/Constants"

export const fetchChartDataAction = (viewType, dataDuration) => {

    return {
        type: `${FETCH_CHART_DATA}_${viewType}`,
        dataDuration: dataDuration,
        viewType: viewType
    }

}