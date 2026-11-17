import React from 'react';
import { X, Smartphone, Share, PlusSquare, Download } from 'lucide-react';

export function InstallAppModal({ isOpen, onClose, deferredPrompt, onPromptHandled }) {
  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    try {
      await deferredPrompt.userChoice;
    } finally {
      onPromptHandled();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#0C2618]/70 backdrop-blur-xs sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Install PIYO Grill Web App"
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-[#FAF6EC] p-6 text-[#1D231E] shadow-2xl sm:rounded-3xl pb-safe"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="PIYO Logo"
              className="h-12 w-12 rounded-full ring-2 ring-[#143D28]"
            />
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#143D28]">
                PIYO Mobile Web App
              </h3>
              <p className="text-xs text-[#4B5E50]">
                Fast access to menu, hours &amp; Tagaytay directions
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-[#5A6C5E] hover:bg-[#143D28]/10"
            aria-label="Close install guide"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-3 text-sm text-[#344037]">
          {deferredPrompt ? (
            <button
              type="button"
              onClick={handleNativeInstall}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#143D28] px-5 py-3 text-sm font-bold text-[#FAF6EC] shadow-md transition hover:bg-[#1B4E33]"
            >
              <Download className="h-4 w-4 text-[#D8B36A]" />
              <span>Add PIYO Grill to Home Screen</span>
            </button>
          ) : (
            <div className="space-y-2.5 rounded-2xl border border-[#143D28]/15 bg-white p-4 text-xs leading-relaxed">
              <p className="flex items-center gap-2 font-bold text-[#143D28]">
                <Smartphone className="h-4 w-4 text-[#C29645]" />
                Install on iPhone / Android:
              </p>
              <p className="flex items-start gap-2">
                <Share className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#255E40]" />
                <span>
                  <strong>iPhone (Safari):</strong> Tap the <strong>Share</strong> icon in the bottom toolbar, then select{' '}
                  <strong>Add to Home Screen</strong>.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <PlusSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#255E40]" />
                <span>
                  <strong>Android (Chrome):</strong> Open the browser menu (⋮) and tap{' '}
                  <strong>Install app</strong> or <strong>Add to Home screen</strong>.
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
