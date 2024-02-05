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
interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  body?: ReactElement;
  footer?: ReactElement;
  isStep?: boolean;
  step?: number;
  totalStep?: number;
}
const Modal = ({
  isOpen,
  onClose,
  body,
  footer,
  isStep,
  step,
  totalStep,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-1">
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
