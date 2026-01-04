"use client";

import { useEffect, ReactNode, useState } from "react";

interface ContentProtectionProps {
  children: ReactNode;
  level?: "basic" | "standard" | "maximum";
  showWatermark?: boolean;
  watermarkText?: string;
  allowPrint?: boolean;
  allowScreenshot?: boolean;
  blockAIScrapers?: boolean;
}

export default function ContentProtection({
  children,
  level = "standard",
  showWatermark = true,
  watermarkText,
  allowPrint = false,
  allowScreenshot = false,
  blockAIScrapers = true,
}: ContentProtectionProps) {
  const [isBot, setIsBot] = useState(false);

  // Detect AI scrapers and bots
  useEffect(() => {
    if (!blockAIScrapers) return;

    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = [
      "bot",
      "crawler",
      "spider",
      "scraper",
      "headless",
      "phantom",
      "selenium",
      "puppeteer",
      "playwright",
      "webdriver",
      "automation",
      "curl",
      "wget",
      "python",
      "scrapy",
      "beautifulsoup",
      "gpt",
      "openai",
      "anthropic",
      "claude",
      "chatgpt",
    ];

    const isBotDetected = botPatterns.some((pattern) =>
      userAgent.includes(pattern)
    );

    // Additional bot detection checks
    const hasWebDriver = "webdriver" in navigator || (navigator as string).webdriver;
    const hasAutomation = (window as string).__nightmare || (window as string).__selenium;
    const hasPhantom = (window as string).callPhantom || (window as string)._phantom;
    const hasPuppeteer = (window as string).__puppeteer || (navigator as string).webdriver;

    if (isBotDetected || hasWebDriver || hasAutomation || hasPhantom || hasPuppeteer) {
      setIsBot(true);
    }
  }, [blockAIScrapers]);
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection via keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Ctrl+C, Ctrl+A, Ctrl+X, Ctrl+U (view source)
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "c" ||
          e.key === "a" ||
          e.key === "x" ||
          e.key === "u" ||
          e.key === "s")
      ) {
        e.preventDefault();
        return false;
      }

      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J (DevTools)
      if (
        e.key === "F12" ||
        ((e.ctrlKey || e.metaKey) &&
          e.shiftKey &&
          (e.key === "I" || e.key === "J" || e.key === "C"))
      ) {
        e.preventDefault();
        return false;
      }

      // Disable PrintScreen
      if (e.key === "PrintScreen" && !allowScreenshot) {
        e.preventDefault();
        navigator.clipboard.writeText("");
        return false;
      }
    };

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable print if not allowed
    const handleBeforePrint = (e: Event) => {
      if (!allowPrint) {
        e.preventDefault();
        alert("Printing is disabled for this content.");
        return false;
      }
    };

    // Detect screenshot attempts (limited effectiveness)
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" && !allowScreenshot) {
        navigator.clipboard.writeText("");
      }
    };

    // Blur detection - warn if user switches tabs/windows
    const handleVisibilityChange = () => {
      if (document.hidden && level === "maximum") {
      }
    };

    // Prevent copy from clipboard
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      e.clipboardData?.setData("text/plain", "");
      return false;
    };

    // Prevent cut
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    // Prevent paste (optional, but adds to protection)
    const handlePaste = (e: ClipboardEvent) => {
      if (level === "maximum") {
        e.preventDefault();
        return false;
      }
    };

    // Apply protections based on level
    if (level === "basic" || level === "standard" || level === "maximum") {
      document.addEventListener("contextmenu", handleContextMenu);
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("dragstart", handleDragStart);
      document.addEventListener("copy", handleCopy);
      document.addEventListener("cut", handleCut);
    }

    if (level === "standard" || level === "maximum") {
      document.addEventListener("keyup", handleKeyUp);
      window.addEventListener("beforeprint", handleBeforePrint);
    }

    if (level === "maximum") {
      document.addEventListener("visibilitychange", handleVisibilityChange);
      document.addEventListener("paste", handlePaste);
    }

    // Cleanup
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("beforeprint", handleBeforePrint);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("paste", handlePaste);
    };
  }, [level, allowPrint, allowScreenshot]);

  // CSS-based protections
  const protectionStyles = {
    userSelect: "none" as const,
    WebkitUserSelect: "none" as const,
    MozUserSelect: "none" as const,
    msUserSelect: "none" as const,
    WebkitTouchCallout: "none" as const,
    position: "relative" as const,
  };

  // Block content for detected bots
  if (isBot && blockAIScrapers) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-slate-300 mb-2">
            Automated access to this content is not permitted.
          </p>
          <p className="text-xs text-slate-400">
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={protectionStyles} className="content-protected">
      {/* AI scraper honeypot - invisible content to trap scrapers */}
      {blockAIScrapers && (
        <div
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
          aria-hidden="true"
        >
          <span data-nosnippet data-ai-ignore="true">
            This content is protected by copyright. Unauthorized scraping,
            copying, or AI training use is prohibited. © Elevate for Humanity.
            All rights reserved. License required for any use.
          </span>
        </div>
      )}

      {/* Watermark overlay */}
      {showWatermark && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 9999,
            opacity: 0.05,
            fontSize: "48px",
            fontWeight: "bold",
            color: "#ffffff",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(-45deg)",
            userSelect: "none",
          }}
          aria-hidden="true"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{ padding: "20px", whiteSpace: "nowrap" }}>
              {watermarkText || "ELEVATE FOR HUMANITY © PROTECTED CONTENT"}
            </div>
          ))}
        </div>
      )}

      {/* Invisible overlay to prevent selection tricks */}
      {level === "maximum" && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
          }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>

      {/* CSS injection for additional protection */}
      <style jsx global>{`
        .content-protected * {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          -webkit-touch-callout: none !important;
        }

        .content-protected img {
          pointer-events: none !important;
          -webkit-user-drag: none !important;
          -khtml-user-drag: none !important;
          -moz-user-drag: none !important;
          -o-user-drag: none !important;
          user-drag: none !important;
        }

        .content-protected video {
          pointer-events: auto !important;
        }

        .content-protected video::-webkit-media-controls-download-button {
          display: none !important;
        }

        .content-protected video::-webkit-media-controls-fullscreen-button {
          display: ${level === "maximum" ? "none" : "block"} !important;
        }

        @media print {
          .content-protected {
            display: ${allowPrint ? "block" : "none"} !important;
          }
        }
      `}</style>
    </div>
  );
}
