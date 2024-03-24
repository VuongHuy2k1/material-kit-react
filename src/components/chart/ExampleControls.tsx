
import React, { useCallback, useMemo, useState} from 'react';

import { lightTheme, darkTheme, type XYChartTheme } from '@visx/xychart';
import { PatternLines } from '@visx/pattern';
import { type GlyphProps } from '@visx/xychart/lib/types';
import { type AnimationTrajectory } from '@visx/react-spring/lib/types';
import cityTemperature, { type CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { GlyphCross, GlyphDot, GlyphStar } from '@visx/glyph';
import { curveLinear, curveStep, curveCardinal } from '@visx/curve';
import { type RenderTooltipGlyphProps } from '@visx/xychart/lib/components/Tooltip';
import dataChart from "../../Data/dataChart.json"
import userPrefersReducedMotion from './userPrefersReducedMotion';
import getAnimatedOrUnanimatedComponents from './getAnimatedOrUnanimatedComponents';
interface ChartData {
    Date: Date;

    // Các thuộc tính khác nếu cần
}


const dateScaleConfig = { type: 'band', paddingInner: 0.3 } as const;
const temperatureScaleConfig = { type: 'linear' } as const;
const numTicks = 12;
const data = dataChart

const getDate = (d: ChartData) => d.Date;
const getSfTemperature = (d: CityTemperature) => (d['Dep. Rooms']);
const getNegativeSfTemperature = (d: CityTemperature) => -getSfTemperature(d);
const getNyTemperature = (d: CityTemperature) => Number(d['Arr. Rooms']);
const getAustinTemperature = (d: CityTemperature) => Number(d['Total Occ.']);
const defaultAnnotationDataIndex = 13;
const selectedDatumPatternId = 'xychart-selected-datum';

type Accessor = (d: CityTemperature) => number | string;

interface Accessors {
  'Total Occ.': Accessor;
  'Arr. Rooms': Accessor;
  'Dep. Rooms': Accessor;
}

type DataKey = keyof Accessors;

interface SimpleScaleConfig { type: 'band' | 'linear'; paddingInner?: number }

type ProvidedProps = {
  accessors: {
    x: Accessors;
    y: Accessors;
    date: Accessor;
  };
  animationTrajectory?: AnimationTrajectory;
  annotationDataKey: DataKey | null;
  annotationDatum?: CityTemperature;
  annotationLabelPosition: { dx: number; dy: number };
  annotationType?: 'line' | 'circle';
  colorAccessorFactory: (key: DataKey) => (d: CityTemperature) => string | null;
  config: {
    x: SimpleScaleConfig;
    y: SimpleScaleConfig;
  };
  curve: typeof curveLinear | typeof curveCardinal  ;
  data: CityTemperature[];
  editAnnotationLabelPosition: boolean;
  numTicks: number;
  setAnnotationDataIndex: (index: number) => void;
  setAnnotationDataKey: (key: DataKey | null) => void;
  setAnnotationLabelPosition: (position: { dx: number; dy: number }) => void;
  renderAreaSeries: boolean;
  renderAreaStack: boolean;
  renderBarGroup: boolean;
  renderBarSeries: boolean;
  renderBarStack: boolean;
  renderGlyph: React.FC<GlyphProps<CityTemperature>>;
  renderGlyphSeries: boolean;
  enableTooltipGlyph: boolean;
  renderTooltipGlyph: React.FC<RenderTooltipGlyphProps<CityTemperature>>;
  renderHorizontally: boolean;
  renderLineSeries: boolean;
  sharedTooltip: boolean;
  showGridColumns: boolean;
  showGridRows: boolean;
  showHorizontalCrosshair: boolean;
  showTooltip: boolean;
  showVerticalCrosshair: boolean;
  snapTooltipToDatumX: boolean;
  snapTooltipToDatumY: boolean;
  stackOffset?: 'wiggle' | 'expand' | 'diverging' | 'silhouette';
  theme: XYChartTheme;
  xAxisOrientation: 'top' | 'bottom';
  yAxisOrientation: 'left' | 'right';
} & ReturnType<typeof getAnimatedOrUnanimatedComponents>;

interface ControlsProps {
  children: (props: ProvidedProps) => React.ReactNode;
}

export default function ExampleControls({ children }: ControlsProps) {

 
   
  const useAnimatedComponents = true;
  const theme= lightTheme
  const animationTrajectory = 'min'
  const gridProps = [false, false];
  const [showGridRows, showGridColumns] = gridProps;
  const xAxisOrientation= 'bottom';
  const yAxisOrientation ='left'
  const renderHorizontally = false;
  const showTooltip=true;
  const annotationDataKey = null;
  const annotationType = 'circle'
  const showVerticalCrosshair= true;
  const showHorizontalCrosshair=false;
  const snapTooltipToDatumX=true;
  const snapTooltipToDatumY = true;
  const sharedTooltip = true;
  const renderBarStackOrGroup = 'none';
 
  const renderAreaLineOrStack = 'line' ;
  const stackOffset = ['stackOffset'];
  const renderGlyphSeries= false;
  const editAnnotationLabelPosition= false;
  const annotationLabelPosition= { dx: -40, dy: -20 };
  const annotationDataIndex= defaultAnnotationDataIndex;
  const negativeValues = false;
  const fewerDatum = false ;
  const missingValues = false;
  const glyphComponent=  'circle' ;
  const curveType ='cardinal' ;
  const glyphOutline = theme.gridStyles.stroke;
  const renderGlyph = useCallback(
    
    ({
      x,
      y,
      size,
      color,
      onPointerMove,
      onPointerOut,
      onPointerUp,
    }: GlyphProps<CityTemperature>) => {
      const handlers = { onPointerMove, onPointerOut, onPointerUp };
   
      if (glyphComponent === 'circle') {
        return (
          <GlyphDot
            left={x}
            top={y}
            stroke={glyphOutline}
            fill={color}
            r={size / 2}
            {...handlers}
          />
        );
      }
   
      return (
        <text x={x} y={y} dx="-0.75em" dy="0.25em" fontSize={14} {...handlers}>
          🍍
        </text>
      );
    },
    [glyphComponent, glyphOutline],
  );
  const enableTooltipGlyph = false;
  const tooltipGlyphComponent = 'star';
  const renderTooltipGlyph = useCallback(
    ({
      x,
      y,
      size,
      color,
      onPointerMove,
      onPointerOut,
      onPointerUp,
      isNearestDatum,
    }: RenderTooltipGlyphProps<CityTemperature>) => {
      const handlers = { onPointerMove, onPointerOut, onPointerUp };
      if (tooltipGlyphComponent === 'star') {
        return (
          <GlyphStar
            left={x}
            top={y}
            stroke={glyphOutline}
            fill={color}
            size={size * 10}
            {...handlers}
          />
        );
      }
      if (tooltipGlyphComponent === 'circle') {
        return (
          <GlyphDot left={x} top={y} stroke={glyphOutline} fill={color} r={size} {...handlers} />
        );
      }
      if (tooltipGlyphComponent === 'cross') {
        return (
          <GlyphCross
            left={x}
            top={y}
            stroke={glyphOutline}
            fill={color}
            size={size * 10}
            {...handlers}
          />
        );
      }
      return (
        <text x={x} y={y} dx="-0.75em" dy="0.25em" fontSize={14} {...handlers}>
          {isNearestDatum ? '🍍' : '🍌'}
        </text>
      );
    },
    [tooltipGlyphComponent, glyphOutline],
  );
  // for series that support it, return a colorAccessor which returns a custom color if the datum is selected
  const colorAccessorFactory = useCallback(
    (dataKey: DataKey) => (d: CityTemperature) =>
      annotationDataKey === dataKey && d === data[annotationDataIndex]
        ? `url(#${selectedDatumPatternId})`
        : null,
    [annotationDataIndex, annotationDataKey],
  );

  const accessors = useMemo(
    () => ({
      x: {
        'Total Occ.':   getDate,
        'Arr. Rooms': getDate ,
        'Dep. Rooms':  getDate,
      },
      y: {
        'Total Occ.':  getSfTemperature,
          'Arr. Rooms': getNyTemperature,
          'Dep. Rooms':  getAustinTemperature,
      },
      date: getDate,
    }),
    [renderHorizontally, negativeValues],
  );
  
  const config = useMemo(
    () => ({
      x: renderHorizontally ? temperatureScaleConfig : dateScaleConfig,
      y: renderHorizontally ? dateScaleConfig : temperatureScaleConfig,
    }),
    [renderHorizontally],
  );

  // cannot snap to a stack position

  return (
    <>
      {children({
        accessors,
        animationTrajectory,
        annotationDataKey,
        annotationDatum: data[annotationDataIndex],
        annotationLabelPosition,
        annotationType,
        colorAccessorFactory,
        config,
        curve:
          (curveType === 'cardinal' && curveCardinal) ||
         
          curveLinear,
        data: data,
        editAnnotationLabelPosition,
        numTicks,
  
        renderGlyphSeries,
        renderGlyph,
        enableTooltipGlyph,
        renderTooltipGlyph,
        renderHorizontally,
     
        renderLineSeries: renderAreaLineOrStack === 'line',
      
        sharedTooltip,
        showGridColumns,
        showGridRows,
        showHorizontalCrosshair,
        showTooltip,
        showVerticalCrosshair,
        snapTooltipToDatumX: snapTooltipToDatumX,
        snapTooltipToDatumY: snapTooltipToDatumY,
        stackOffset,
        theme,
        xAxisOrientation,
        yAxisOrientation,
        ...getAnimatedOrUnanimatedComponents(useAnimatedComponents),
      })}
      {/** This style is used for annotated elements via colorAccessor. */}
      <svg className="pattern-lines">
        <PatternLines
          id={selectedDatumPatternId}
          width={6}
          height={6}
          orientation={['diagonalRightToLeft']}
          stroke={theme?.axisStyles.x.bottom.axisLine.stroke}
          strokeWidth={1.5}
        />
      </svg>
  
      
        
      {/* <style jsx>{`
        .controls {
          font-size: 13px;
          line-height: 1.5em;
        }
        .controls > div {
          margin-bottom: 4px;
        }
        label {
          font-size: 12px;
        }
        input[type='radio'] {
          height: 10px;
        }
        .pattern-lines {
          position: absolute;
          pointer-events: none;
          opacity: 0;
        }
      `}</style> */}
    </>
  );
}
