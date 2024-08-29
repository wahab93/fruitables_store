import React from 'react';

export const StatisticsCard = ({ title, value, percentage, iconClass, isIncrease }) => {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col mt-0">
              <h5 className="card-title">{title}</h5>
            </div>
            <div className="col-auto">
              <div className={`stat text-primary`}>
                <i className={`fa ${iconClass}`}></i>
              </div>
            </div>
          </div>
          <h1 className="mt-1 mb-3">{value}</h1>
          <div className="mb-0">
            <span className={isIncrease ? 'text-success' : 'text-danger'}>
              <i className={isIncrease ? 'mdi mdi-arrow-top-right' : 'mdi mdi-arrow-bottom-right'}></i> {percentage}% 
            </span>
            <span className="text-muted">Since last week</span>
          </div>
        </div>
      </div>
    </div>
  );
};