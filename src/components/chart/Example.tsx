/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
"use client";
import React from 'react';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';

import ExampleControls from './ExampleControls';
import CustomChartBackground from './CustomChartBackground';

export interface XYChartProps {
  width: number;
  height: number;
}

type City = 'San Francisco' | 'New York' | 'Austin';

export default function Example ({ height }: XYChartProps) {
 
  return (
    <ExampleControls>
      {({
        accessors,
        animationTrajectory,
        annotationDataKey,
        annotationDatum,
        annotationLabelPosition,
        annotationType,
   
        config,
        curve,
        data,
        editAnnotationLabelPosition,
        numTicks,
     
        renderBarGroup,
        renderBarSeries,
      
        enableTooltipGlyph,
        renderTooltipGlyph,
        renderHorizontally,
        renderLineSeries,
        setAnnotationDataIndex,
     
        setAnnotationLabelPosition,
        sharedTooltip,
        showGridColumns,
        showGridRows,
        showHorizontalCrosshair,
      
        showVerticalCrosshair,
        snapTooltipToDatumX,
        snapTooltipToDatumY,
        stackOffset,
        theme,
        xAxisOrientation,
        yAxisOrientation,

        // components are animated or not depending on selection
        Annotation,
  
        Axis,
     
        Grid,
        LineSeries,
        AnnotationCircleSubject,
        AnnotationConnector,
        AnnotationLabel,
        AnnotationLineSubject,
        Tooltip,
        XYChart,
      }) => (
        <XYChart
          // theme={theme}
          xScale={config.x}
          yScale={config.y}
          height={Math.min(400, height)}
          captureEvents={!editAnnotationLabelPosition}
          onPointerUp={(d) => {
          
            setAnnotationDataIndex(d.index);
          }}
        >
          {/* <CustomChartBackground /> */}
          <Grid
            key={`grid-${animationTrajectory}`} // force animate on update
            rows={showGridRows}
            columns={showGridColumns}
            animationTrajectory={animationTrajectory}
            numTicks={numTicks}
          />
          
          {renderLineSeries ? <>
              <LineSeries
                dataKey="Dep. Rooms"
                data={data}
                xAccessor={accessors.x['Dep. Rooms']}
                yAccessor={accessors.y['Dep. Rooms']}
                curve={curve}
              />
              {!renderBarSeries && (
                <LineSeries
                  dataKey="Arr. Rooms"
                  data={data}
                  xAccessor={accessors.x['Arr. Rooms']}
                yAccessor={accessors.y['Arr. Rooms']}
                  curve={curve}
                />
              )}
              <LineSeries
                dataKey="Total Occ."
                data={data}
                xAccessor={accessors.x['Total Occ.']}
                yAccessor={accessors.y['Total Occ.']}
                curve={curve}
              />
            </> : null}
          
          <Axis
            key={`time-axis-${animationTrajectory}-${renderHorizontally}`}
            orientation={renderHorizontally ? yAxisOrientation : xAxisOrientation}
            numTicks={numTicks}
            animationTrajectory={animationTrajectory}
          />
          <Axis
            key={`temp-axis-${animationTrajectory}-${renderHorizontally}`}
            label={
              stackOffset === null
                ? 'Temperature (°F)'
                : stackOffset === 'expand'
                ? 'Fraction of total temperature'
                : ''
            }
            orientation={renderHorizontally ? xAxisOrientation : yAxisOrientation}
            numTicks={numTicks}
            animationTrajectory={animationTrajectory}
            // values don't make sense in stream graph
            tickFormat={stackOffset === 'wiggle' ? () => '' : undefined}
          />
          {annotationDataKey && annotationDatum ? <Annotation
              dataKey={annotationDataKey}
              datum={annotationDatum}
              dx={annotationLabelPosition.dx}
              dy={annotationLabelPosition.dy}
              editable={editAnnotationLabelPosition}
              canEditSubject={false}
              onDragEnd={({ dx, dy }) => { setAnnotationLabelPosition({ dx, dy }); }}
            >
              <AnnotationConnector />
              {annotationType === 'circle' ? (
                <AnnotationCircleSubject />
              ) : (
                <AnnotationLineSubject />
              )
              
              }
         
            </Annotation> : null}
          <Tooltip
              showHorizontalCrosshair={showHorizontalCrosshair}
              showVerticalCrosshair={showVerticalCrosshair}
              snapTooltipToDatumX={snapTooltipToDatumX}
              snapTooltipToDatumY={snapTooltipToDatumY}
              
              showDatumGlyph={(snapTooltipToDatumX || snapTooltipToDatumY) ? !renderBarGroup : null}
              showSeriesGlyphs={sharedTooltip ? !renderBarGroup : null}
              renderGlyph={enableTooltipGlyph ? renderTooltipGlyph : undefined}
              renderTooltip={({ tooltipData, colorScale }) => (
                <>
               
                  <br />
                  {/** date */}
                  Date:
                  {(
                    tooltipData?.nearestDatum?.datum &&
                    accessors.date(tooltipData?.nearestDatum?.datum)) ||
                    'No date'}
                  <br />
                  <br />
                  {/** temperatures */}
                  {(
                    (sharedTooltip
                      ? Object.keys(tooltipData?.datumByKey ?? {})
                      : [tooltipData?.nearestDatum?.key]
                    ).filter((city) => city) as City[]
                  ).map((city) => {

               
                    const temperature = tooltipData?.nearestDatum?.datum &&
                      accessors['y'][city]( tooltipData?.nearestDatum?.datum);

                    return (
                      <div key={city}>
                        <em
                          style={{
                            color: colorScale?.(city),
                            textDecoration:
                              tooltipData?.nearestDatum?.key === city ? 'underline' : undefined,
                          }}
                        >
                          {city}
                        </em>
                          :
                        {temperature}
                        <br />
                        <br />
                      </div>
                       
                    );
                  })}
                </>
              )}
            /> 
        </XYChart>
      )}
    </ExampleControls>
  );
}
