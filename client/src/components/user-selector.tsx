import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, User as UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, type InsertUser, type User } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface UserSelectorProps {
  selectedUserId?: string;
  onUserSelect: (userId: string) => void;
}

export default function UserSelector({ selectedUserId, onUserSelect }: UserSelectorProps) {
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      studentId: "",
      hostelRoom: "",
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async (data: InsertUser) => {
      const response = await apiRequest("POST", "/api/users", data);
      return response.json();
    },
    onSuccess: (newUser: User) => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "Success",
        description: "User account created successfully!",
      });
      onUserSelect(newUser.id);
      setIsNewUserModalOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create user account. Please try again.",
        variant: "destructive",
      });
      console.error("Error creating user:", error);
    },
  });

  const handleSubmit = (data: InsertUser) => {
    createUserMutation.mutate(data);
  };

  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <UserIcon className="h-4 w-4 text-gray-600" />
        <span className="text-sm text-gray-700">
          {selectedUser ? `${selectedUser.name} (${selectedUser.email})` : "No user selected"}
        </span>
      </div>
      
      <div className="flex space-x-2">
        {users.map((user) => (
          <Button
            key={user.id}
            variant={selectedUserId === user.id ? "default" : "outline"}
            size="sm"
            onClick={() => onUserSelect(user.id)}
            data-testid={`button-select-user-${user.id}`}
          >
            {user.name}
          </Button>
        ))}
        
        <Dialog open={isNewUserModalOpen} onOpenChange={setIsNewUserModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" data-testid="button-add-user">
              <Plus className="h-4 w-4 mr-1" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New User Account</DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., John Smith" 
                          {...field}
                          data-testid="input-user-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="john@student.edu" 
                          {...field}
                          data-testid="input-user-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+1234567890" 
                          {...field}
                          data-testid="input-user-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student ID</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="ST001" 
                            {...field}
                            data-testid="input-user-student-id"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hostelRoom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hostel Room</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="H1-201" 
                            {...field}
                            data-testid="input-user-hostel-room"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsNewUserModalOpen(false)}
                    className="flex-1"
                    data-testid="button-cancel-user"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createUserMutation.isPending}
                    className="flex-1 bg-primary hover:bg-blue-700"
                    data-testid="button-create-user"
                  >
                    {createUserMutation.isPending ? "Creating..." : "Create Account"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}