import { CircularProgress } from '@rmwc/circular-progress';
import React from 'react';
import { style } from 'typestyle';
import './Loading.css';

const LoaderStyle = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
});

export const LoadingProgress = () => (
  <div className={LoaderStyle}>
    <CircularProgress size={72} />
  </div>
);
