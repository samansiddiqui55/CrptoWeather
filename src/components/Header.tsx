
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useDashboard();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-dashboard-dark-blue"> CryptoWeather Nexus</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu 
          open={isNotificationsOpen} 
          onOpenChange={setIsNotificationsOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-dashboard-red text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
            <div className="px-4 py-3 font-medium">Notifications</div>
            <DropdownMenuSeparator />
            
            {notifications.length === 0 ? (
              <div className="px-4 py-6 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              <>
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      "flex flex-col items-start p-4 cursor-default",
                      !notification.read && "bg-blue-50"
                    )}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex items-start w-full">
                      <div 
                        className={cn(
                          "w-2 h-2 mt-1.5 mr-2 rounded-full",
                          notification.type === 'price_alert' 
                            ? "bg-dashboard-purple" 
                            : "bg-dashboard-orange"
                        )}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-gray-500 mt-1">{notification.message}</div>
                        <div className="text-xs text-gray-400 mt-2">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="justify-center text-sm text-gray-500 hover:text-gray-900"
                  onClick={clearAllNotifications}
                >
                  Clear all
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-dashboard-blue text-white">
            DP
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
