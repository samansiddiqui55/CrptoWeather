
import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const NewsSection: React.FC = () => {
  const { newsArticles, isLoading, error } = useDashboard();

  if (isLoading.news) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Latest News</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="w-full">
              <CardContent className="p-4">
                <div className="flex">
                  <Skeleton className="h-20 w-20 rounded" />
                  <div className="ml-4 flex-1">
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error.news) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Latest News</h2>
        <Alert variant="destructive">
          <AlertDescription>{error.news}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Latest News</h2>
      <div className="space-y-4">
        {newsArticles.map((article) => (
          <a 
            key={article.id} 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="w-full hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex">
                  {article.imageUrl && (
                    <div className="h-20 w-20 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold text-dashboard-dark-blue line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-1">{article.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{article.source}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
