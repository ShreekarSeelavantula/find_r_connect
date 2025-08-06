import { useState } from "react";
import Header from "@/components/header";
import SearchFilters from "@/components/search-filters";
import ItemsGrid from "@/components/items-grid";
import NewItemModal from "@/components/new-item-modal";
import ItemDetailModal from "@/components/item-detail-modal";
import { type Item } from "@shared/schema";

export default function Home() {
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onPostItem={() => setIsNewItemModalOpen(true)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
        />
        
        <ItemsGrid
          searchQuery={searchQuery}
          typeFilter={typeFilter}
          categoryFilter={categoryFilter}
          onItemClick={setSelectedItem}
        />
      </div>

      <NewItemModal
        isOpen={isNewItemModalOpen}
        onClose={() => setIsNewItemModalOpen(false)}
      />

      <ItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
