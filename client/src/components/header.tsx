import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onPostItem: () => void;
}

export default function Header({ onPostItem }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Search className="text-primary text-2xl" />
            <h1 className="text-xl font-semibold text-gray-900">Lost & Found Portal</h1>
          </div>
          <Button 
            onClick={onPostItem}
            className="bg-primary text-white hover:bg-blue-700"
            data-testid="button-post-item"
          >
            <Plus className="mr-2 h-4 w-4" />
            Post Item
          </Button>
        </div>
      </div>
    </header>
  );
}
