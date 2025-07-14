import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading = ({ loading, color }) => {
  return (
    <div className="loading">
      <ClipLoader color={color} loading={loading} size={50} />
    </div>
  );
};

export default Loading;