import React from 'react';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const PomodoroBar = ({ props }) => {
  const { minutes, seconds, isBreakTime, timer } = props;
  return (
    <CircularProgressbarWithChildren
      strokeWidth={4}
      value={minutes * 60 + seconds}
      maxValue={isBreakTime ? timer[1] * 60 : timer[0] * 60}
      minValue={0}
      background={true}
      styles={buildStyles({
        pathColor: isBreakTime ? 'rgb(0,255,0,0.8)' : 'rgba(255,0,0,0.8)',
        trailColor: 'rgba(0,0,0,0.6)',
        backgroundColor: 'rgba(0,0,0,0.3)',
      })}
    >
      <div className="font-extrabold text-4xl text-warmGray-300">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </CircularProgressbarWithChildren>
  );
};
