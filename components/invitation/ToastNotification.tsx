'use client';

import React from 'react';

interface ToastNotificationProps {
  message: string | null;
}

export function ToastNotification({ message }: ToastNotificationProps) {
  if (!message) return null;

  return (
    <div className="toast-notification show">
      <i className="fa-solid fa-circle-check" style={{ color: '#455645' }} />
      <span>{message}</span>
    </div>
  );
}
