"use client";

import { motion, AnimatePresence } from "motion/react";
import { FormErrorMessageProps } from "@/types/propTypes";

const FormErrorMessage = ({ text }: FormErrorMessageProps) => {
  return (
    <AnimatePresence>
      {text && (
        <motion.p
          key="error"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mx-5 mt-2 overflow-hidden text-red-400 text-sm origin-top"
        >
          {text}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default FormErrorMessage;
