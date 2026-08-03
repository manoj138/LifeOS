import React from 'react';
import { EmptyStateSVG } from '../illustrations/EmptyStateSVG';
import { Button } from '../ui/Button';

export const EmptyState = ({
  title = "No Data Found",
  description = "Get started by adding your first item or asking LifeOS AI for assistance.",
  actionText,
  onAction,
  icon
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl my-6">
      <div className="mb-4">
        {icon ? icon : <EmptyStateSVG className="w-36 h-36" />}
      </div>
      <h3 className="text-xl font-bold text-white tracking-tight mb-1">{title}</h3>
      <p className="text-sm text-gray-400 max-w-md mb-6">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
