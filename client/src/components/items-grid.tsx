import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Search } from "lucide-react";
import { type Item } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ItemsGridProps {
  searchQuery: string;
  typeFilter: string;
  categoryFilter: string;
  onItemClick: (item: Item) => void;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

function ItemCard({ item, onClick }: { item: Item; onClick: (item: Item) => void }) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(item)}
      data-testid={`card-item-${item.id}`}
    >
      <div className="relative">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge 
            className={item.type === 'lost' ? 'bg-lost text-white' : 'bg-found text-white'}
            data-testid={`badge-${item.type}`}
          >
            {item.type.toUpperCase()}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2" data-testid={`text-title-${item.id}`}>
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2" data-testid={`text-description-${item.id}`}>
          {item.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            <span data-testid={`text-date-${item.id}`}>{formatDate(item.createdAt)}</span>
          </div>
          <div className="text-xs text-gray-500 flex items-center">
            <MapPin className="mr-1 h-3 w-3" />
            <span data-testid={`text-location-${item.id}`}>{item.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ItemsGrid({ searchQuery, typeFilter, categoryFilter, onItemClick }: ItemsGridProps) {
  // Construct query params
  const params = new URLSearchParams();
  if (searchQuery) params.append("search", searchQuery);
  if (typeFilter && typeFilter !== "all") params.append("type", typeFilter);
  if (categoryFilter && categoryFilter !== "all") params.append("category", categoryFilter);
  
  const queryString = params.toString();
  const url = `/api/items${queryString ? `?${queryString}` : ""}`;
  
  const { data: items, isLoading, error } = useQuery<Item[]>({
    queryKey: [url],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <Skeleton className="w-full h-48 rounded-t-lg" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-full mb-1" />
              <Skeleton className="h-3 w-2/3 mb-3" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Search className="text-gray-300 text-6xl mb-4 mx-auto" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading items</h3>
        <p className="text-gray-500">Please try again later</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12" data-testid="text-no-items">
        <Search className="text-gray-300 text-6xl mb-4 mx-auto" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onClick={onItemClick} />
      ))}
    </div>
  );
}
