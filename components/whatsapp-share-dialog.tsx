"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText } from "lucide-react"

interface WhatsAppShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  whatsappNumber: string
  setWhatsappNumber: React.Dispatch<React.SetStateAction<string>>
  selectedDocuments: Array<{
    id: number
    name: string
    serialNo: string
    documentType: string
    category: string
    imageUrl: string
    sourceSheet: string
    mobile: string
  }>
  onShare: (number: string) => Promise<void>   // <- yahan boolean ki jagah void
}

export function WhatsAppShareDialog({
  open,
  onOpenChange,
  whatsappNumber,
  setWhatsappNumber,
  selectedDocuments,
  onShare,
}: WhatsAppShareDialogProps) {
  const [isSharing, setIsSharing] = React.useState(false)

  const handleShare = async () => {
    if (!whatsappNumber) return

    setIsSharing(true)
    try {
      await onShare(whatsappNumber)   // <- return value ignore karo
      onOpenChange(false)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#7569F6]">
            Share Documents via WhatsApp
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
            <Input
              id="whatsappNumber"
              placeholder="Enter recipient's phone number with country code (e.g., 911234567890)"
              type="tel"
              value={whatsappNumber}
              onChange={(e) => {
                const num = e.target.value.replace(/\D/g, "")
                setWhatsappNumber(num)
              }}
              className="border-gray-300 focus:border-[#7569F6] focus:ring-[#7569F6]"
            />
            <p className="text-xs text-gray-500">
              Enter the number with country code but without '+' or spaces
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[#7569F6]">
              Selected Documents:
            </p>
            <div className="mt-2 max-h-32 overflow-y-auto border rounded-md p-2">
              <ul className="space-y-1">
                {selectedDocuments.map((doc) => (
                  <li key={doc.id} className="text-sm flex items-center">
                    <FileText className="h-3 w-3 mr-2 text-gray-500 flex-shrink-0" />
                    <span className="truncate">{doc.name}</span>
                    {doc.mobile && (
                      <span className="ml-2 text-xs text-gray-500">
                        (Original: {doc.mobile})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 w-full sm:w-auto"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleShare}
            disabled={!whatsappNumber || isSharing}
            className="bg-gradient-to-r from-[#407FF6] via-[#5477F6] to-[#7569F6] hover:from-[#5477F6] hover:via-[#7569F6] hover:to-[#935DF6] text-white w-full sm:w-auto"
          >
            {isSharing ? "Sharing..." : "Share via WhatsApp"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
