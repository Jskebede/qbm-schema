import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export const HowToUseDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <HelpCircle className="w-4 h-4" />
          How to Use
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How to Use Bar Schedule Manager</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-pink-700 mb-2">Step 1: Create Stations</h3>
            <p className="text-sm text-muted-foreground">
              Always start by creating your stations. Use the "Add Station" button to add each work station
              and specify how many staff members are required for each.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-pink-700 mb-2">Step 2: Add Staff Members</h3>
            <p className="text-sm text-muted-foreground">
              Add staff members according to your total station requirements. For example:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>If you have 3 bar spots, 2 entrance spots, and 1 plock spot</li>
              <li>You need to add 6 staff members in total (3 + 2 + 1)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-pink-700 mb-2">Step 3: Generate Schedule</h3>
            <p className="text-sm text-muted-foreground">
              Once you have added all stations and staff members, click the "Generate Schedule" button
              to create your schedule. The system will automatically assign staff to stations based on
              their capabilities.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};