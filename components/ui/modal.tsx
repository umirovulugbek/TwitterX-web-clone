import React, { ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { X } from "lucide-react";
import useRegisterModal from "@/hook/useRegisterModal";
import { cn } from "@/lib/utils";
interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  body?: ReactElement;
  footer?: ReactElement;
  isStep?: boolean;
  step?: number;
  totalStep?: number;
  isEditing?: boolean;
}
const Modal = ({
  isOpen,
  onClose,
  body,
  footer,
  isStep,
  step,
  totalStep,
  isEditing,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "bg-black p-1",
          isEditing && "h-[80vh] overflow-x-hidden overflow-y-auto"
        )}
      >
        <div className="flex items-center gap-6">
          <button className="p-1 border-0 text-white hover:opacity-70 transition w-fit">
            <X size={28} onClick={onClose} />
          </button>
          {step && totalStep && (
            <div className="text-xl font-bold">
              Step {step} of {totalStep}
            </div>
          )}
        </div>
        <div>{body}</div>
        {footer && <div>{footer}</div>}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
