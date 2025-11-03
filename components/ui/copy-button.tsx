"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import * as styles from "./copy-button.css";

interface CopyButtonProps {
  code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      className={styles.copyButton}
      onClick={copy}
      aria-label="Copy code"
    >
      {isCopied ? (
        <Check className={styles.checkIcon} />
      ) : (
        <Copy className={styles.copyIcon} />
      )}
    </button>
  );
}
