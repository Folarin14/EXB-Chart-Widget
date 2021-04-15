/**
  Licensing

  Copyright 2021 Esri

  Licensed under the Apache License, Version 2.0 (the "License"); You
  may not use this file except in compliance with the License. You may
  obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
  implied. See the License for the specific language governing
  permissions and limitations under the License.


  A copy of the license is available in the repository's
  LICENSE file.
*/
import { React, IMDataSourceInfo, DataSource, DataRecordSet, DataSourceManager, DataSourceStatus, FeatureLayerQueryParams, AllWidgetProps, DataSourceComponent } from 'jimu-core';
import Plot from 'react-plotly.js';
import BarGraph from './BarGraph';
//<script src="https://cdn.jsdelivr.net/npm/chart.js@3.1.0/dist/chart.min.js"></script>
//<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.1.0/chart.esm.js" integrity="sha512-rX92e1gJcy6G+ivRwDY5NnrDdGz37qBHqhNgDB9b9oT83N+vcKOs7GCcDTvKz/mFanYSTz+EoRi8SGlMOd3MoQ==" crossorigin="anonymous"></script>
//const chartjs = require('https://cdn.jsdelivr.net/npm/chart.js@3.1.0/dist/chart.min.js')

interface State {
  query: FeatureLayerQueryParams;
  record1: DataRecordSet;
  record2: DataRecordSet
}

/**
 * This widget will show features from a configured feature layer
 */
export default class Widget extends React.PureComponent<AllWidgetProps<{}>, State>{
  state = { query: null, record1: {dataSource: null, fields: null, records: null}, record2: {dataSource: null, fields: null, records: null}}
  cityNameRef: React.RefObject<HTMLButtonElement> = React.createRef();
  mainRef = React.createRef<HTMLDivElement>(); 

  query = () => {
    if (!this.isDsConfigured()) {
      return;
    }
    const fieldName = this.props.useDataSources[0].fields[0];
    const w = this.cityNameRef.current && this.cityNameRef.current.value ?
      `${fieldName} like '%'` : '1=1'
    this.setState({
      query: {
        where: w,
        outFields: ['*'],
        pageSize: 10
      }
    });
  }
  
  isDsConfigured = () => {
    if (this.props.useDataSources &&
      this.props.useDataSources.length === 1 &&
      this.props.useDataSources[0].fields &&
      this.props.useDataSources[0].fields.length > 0) {
        return true;
      }
      return false;
    }
    
    dataRender = (ds: DataSource, info: IMDataSourceInfo) => {
      const fName = this.props.useDataSources[0].fields;
      return <>
      <div>
        <button ref={this.cityNameRef} onClick={this.query}>Plot Bar Chart</button>
      </div>
      {/* <div>Query state: {info.status}</div>
      <div>Count: {ds.count}</div> */}

      {this.setState({ record1: {dataSource: ds,
          fields: [fName[0]],
          records: ds && ds.getStatus() === DataSourceStatus.Loaded ? ds.getRecords().map((r) => {return r.getData()[fName[0]]})
          : null}, record2: {dataSource: ds,
            fields: [fName[1]],
            records: ds && ds.getStatus() === DataSourceStatus.Loaded ? ds.getRecords().map((r) => {return r.getData()[fName[1]]})
            : null}})}
    </>
  }
  // React Plotly library
  // barChartRender = () => {
    //   if (this.state.record2.records){
      
      //     const yField = this.state.record2.records
      //     console.log("yField",yField)
      
      //     const xField = this.state.record1.records
      //     console.log("xField",xField)
      
      //     return (<Plot 
      //               data={[
        //                 {
          //                   x: xField,
          //                   y: yField,
          //                   type: "bar"
          //                 }
          //               ]}
          //               layout={{width: 1200, height: 800, 
          //                 title: `Bar plot showing ${this.state.record1.fields[0]} vs ${this.state.record2.fields[0]}`,
          //                 xaxis:{title:`${this.state.record1.fields[0]}`},
          //                 yaxis:{title:`${this.state.record2.fields[0]}`}
          //               }}
          
          //     />)
          //   }
          // }
          
          // React Chart Js library
  barChartRender = () => {
            
  const state = {
      labels: ['January', 'February', 'March',
              'April', 'May'],
      datasets: [
            {
              label: 'Rainfall',
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: [65, 59, 80, 81, 56]
                }
              ]
            }
    return state
            
  }
          
  render() {
    console.log(this.state)
      if (!this.isDsConfigured()) {
        return <h3>
        This widget demonstrates how to use a feature layer as a data source.
        <br />
        Configure the data source.
      </h3>;
    }
    return <div className="widget-use-feature-layer" style={{ width: '100%', height: '100%', maxHeight: '800px', overflow: 'auto' }}>
      <h3>
      This widget shows how to use a feature layer as a data source.
      </h3>

      <DataSourceComponent useDataSource={this.props.useDataSources[0]} query={this.state.query} widgetId={this.props.id} queryCount>
        {
          this.dataRender
        }
      </DataSourceComponent>
      <div>
       
        <BarGraph />
        {/* {this.barChartRender()} */}
      </div>
    </div>;
  }
}



