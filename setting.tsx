/**
  Licensing

  Copyright 2020 Esri

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

import {React, Immutable, FormattedMessage, UseDataSource, IMFieldSchema} from 'jimu-core';
import { Switch } from "jimu-ui";
import {AllWidgetSettingProps} from 'jimu-for-builder';
import {DataSourceTypes} from 'jimu-arcgis';
import {SettingSection, SettingRow} from 'jimu-ui/advanced/setting-components';
import {DataSourceSelector, AllDataSourceTypes, FieldSelector} from 'jimu-ui/advanced/data-source-selector';
import {IMConfig} from '../config';
import defaultI18nMessages from './translations/default'
import defaultMessages from "./translations/default";

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig>, any>{
  supportedTypes = Immutable([DataSourceTypes.WebMap, AllDataSourceTypes.FeatureLayer]);

  onFieldChange = (allSelectedFields: IMFieldSchema[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: [{...this.props.useDataSources[0], ...{fields: allSelectedFields.map(f => f.jimuName)}}]
    })
    //console.log(allSelectedFields)
  }

  onToggleUseDataEnabled = (useDataSourcesEnabled: boolean) => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSourcesEnabled
    });
  }

  onDataSourceSelected = (useDataSources: UseDataSource[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: useDataSources
    });
  }

  onZoomToLayerPropertyChange = (evt: React.FormEvent<HTMLInputElement>) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set("zoomToLayer", evt.currentTarget.checked)
    });
  };

  
render(){

  return <div className="sample-map-view-setting p-2">
    <DataSourceSelector
      types={this.supportedTypes}
      mustUseDataSource
      useDataSourcesEnabled={this.props.useDataSourcesEnabled}
      onToggleUseDataEnabled={this.onToggleUseDataEnabled}
      useDataSources={this.props.useDataSources}
      onChange={this.onDataSourceSelected}
      widgetId={this.props.id}
    />
      {
        this.props.useDataSources && this.props.useDataSources.length > 0 &&

        <FieldSelector
          useDataSources={this.props.useDataSources}
          onChange={this.onFieldChange}
          isMultiple
          selectedFields={this.props.useDataSources[0].fields}
        />
      }
    {/* <SettingSection>
      <SettingRow label={<FormattedMessage id="p1" defaultMessage={defaultI18nMessages.p1}/>}> <input defaultValue={this.props.config.p1} onChange={this.onP1Change}/></SettingRow>
      <SettingRow label={<FormattedMessage id="p2" defaultMessage={defaultI18nMessages.p2}/>}> <input defaultValue={this.props.config.p2} onChange={this.onP2Change}/></SettingRow>
    </SettingSection> */}
    <SettingSection
            title={this.props.intl.formatMessage({
              id: "settingsLabel",
              defaultMessage: defaultMessages.settings
            })}
          >
            <SettingRow>
              <div className="w-100 addLayers">
                <div className="checkbox-row">
                  <label>
                    <FormattedMessage
                      id="zoomToLayer"
                      defaultMessage={defaultMessages.zoomToLayer}
                    />
                  </label>
                  <Switch
                    checked={
                      (this.props.config && this.props.config.zoomToLayer) ||
                      false
                    }
                    onChange={this.onZoomToLayerPropertyChange}
                  />
                </div>
              </div>
            </SettingRow>
          </SettingSection>
  </div>
}
}
