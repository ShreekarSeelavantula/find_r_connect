import { Calendar, MapPin, Mail, X, Search } from "lucide-react";
import { type Item } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ItemDetailModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
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

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ItemDetailModal({ item, isOpen, onClose }: ItemDetailModalProps) {
  if (!item) return null;

  const handleContact = () => {
    if (item.contact.includes('@')) {
      window.location.href = `mailto:${item.contact}`;
    } else {
      window.location.href = `tel:${item.contact}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge 
                className={item.type === 'lost' ? 'bg-lost text-white' : 'bg-found text-white'}
                data-testid={`badge-detail-${item.type}`}
              >
                {item.type.toUpperCase()}
              </Badge>
              <h2 className="text-xl font-semibold text-gray-900" data-testid="text-detail-title">
                {item.title}
              </h2>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {item.imageUrl ? (
            <div className="mb-4">
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-64 object-cover rounded-lg"
                data-testid="img-detail"
              />
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <Search className="h-16 w-16 text-gray-400" />
            </div>
          )}

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600" data-testid="text-detail-description">
              {item.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Category</h3>
              <p className="text-gray-600" data-testid="text-detail-category">
                {capitalizeFirst(item.category)}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Location</h3>
              <p className="text-gray-600" data-testid="text-detail-location">
                {item.location}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-1">Posted</h3>
            <p className="text-gray-600 flex items-center" data-testid="text-detail-date">
              <Calendar className="mr-1 h-4 w-4" />
              {formatDate(item.createdAt)}
            </p>
          </div>

          {item.user && (
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Posted By</h3>
              <p className="text-gray-700 font-medium" data-testid="text-detail-user-name">
                {item.user.name}
              </p>
              <p className="text-sm text-gray-600" data-testid="text-detail-user-email">
                {item.user.email}
              </p>
              {item.user.hostelRoom && (
                <p className="text-sm text-gray-600" data-testid="text-detail-user-room">
                  Room: {item.user.hostelRoom}
                </p>
              )}
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
            <p className="text-gray-600 mb-2" data-testid="text-detail-contact">
              {item.contact}
            </p>
            <Button 
              onClick={handleContact}
              className="text-primary hover:text-blue-700 text-sm"
              variant="link"
              data-testid="button-contact"
            >
              <Mail className="mr-1 h-4 w-4" />
              Contact Owner
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
