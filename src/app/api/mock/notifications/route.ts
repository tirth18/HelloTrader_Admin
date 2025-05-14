import { NextResponse } from 'next/server';

export async function GET() {
  // Get current time
  const now = new Date();
  
  // Mock notifications data
  const notifications = [
    { 
      id: 1, 
      type: "warning", 
      title: "Margin Call Alert", 
      message: "User ID 123 approaching margin call threshold", 
      is_read: false, 
      timestamp: new Date(now.getTime() - 10 * 60000).toISOString() 
    },
    { 
      id: 2, 
      type: "info", 
      title: "System Update", 
      message: "System maintenance scheduled for tonight at 2AM UTC", 
      is_read: true, 
      timestamp: new Date(now.getTime() - 3 * 3600000).toISOString() 
    },
    { 
      id: 3, 
      type: "error", 
      title: "API Connection Error", 
      message: "External price feed connection interrupted", 
      is_read: false, 
      timestamp: new Date(now.getTime() - 25 * 60000).toISOString() 
    },
    { 
      id: 4, 
      type: "success", 
      title: "Batch Process Complete", 
      message: "Daily settlement process completed successfully", 
      is_read: false, 
      timestamp: new Date(now.getTime() - 1 * 3600000).toISOString() 
    },
  ];

  return NextResponse.json(notifications);
} 