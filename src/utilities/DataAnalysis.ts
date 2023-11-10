import { DataContextInterface, fieldInfos } from "../types";


export const basicDataAnalysis = (dataContext: DataContextInterface, dataDispatch: any, analysisField: string) => {

  let stats: {fields: fieldInfos[], count: number, avg: number, min: number, max: number, sum: number} = 
             {fields: [], count: 0, avg: 0, min: 0, max: 0, sum: 0};
  Object.keys(dataContext.GeoJSONfeatureCollection.features[0].properties).forEach((d: string) => 
             stats.fields.push({ fieldName: d, label: d }))  

  dataContext.GeoJSONfeatureCollection.features.forEach((d, i) => {
    const val = d.properties[analysisField];
    stats.count++;
    stats.sum += val;
    i === 0 
      ? stats.min = val
      : stats.min = val < stats.min 
        ? val 
        : stats.min;
    stats.max = val > stats.max ? val : stats.max;
    stats.avg = stats.sum/stats.count;
    console.log(stats.min, val)
  })
  dataDispatch({ type: 'info', payload: {
    fields: stats.fields, 
    analysisField: analysisField,
    count: stats.count, 
    avg: stats.avg,
    min: stats.min,
    max: stats.max
  }});

} 

