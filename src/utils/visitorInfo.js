import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../services/firebase";

const VISITOR_ID_KEY = "devrymel_visitor_id";
const VISITOR_TRACKED_KEY = "devrymel_visitor_tracked";
const VISITOR_TRACKED_AT_KEY = "devrymel_visitor_tracked_at";

function createVisitorId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

export function getOrCreateVisitorId() {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);

  if (!visitorId) {
    visitorId = createVisitorId();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }

  return visitorId;
}

export function hasTrackedVisitor() {
  return localStorage.getItem(VISITOR_TRACKED_KEY) === "true";
}

export function markVisitorTracked() {
  localStorage.setItem(VISITOR_TRACKED_KEY, "true");
  localStorage.setItem(VISITOR_TRACKED_AT_KEY, new Date().toISOString());
}

function getDeviceType() {
  const width = window.innerWidth;

  if (width <= 640) return "Mobile";
  if (width <= 1024) return "Tablet";

  return "Desktop";
}

function getBrowserName() {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Edg")) return "Microsoft Edge";
  if (userAgent.includes("OPR") || userAgent.includes("Opera")) return "Opera";
  if (userAgent.includes("Chrome")) return "Google Chrome";
  if (userAgent.includes("Firefox")) return "Mozilla Firefox";
  if (userAgent.includes("Safari")) return "Safari";

  return "Unknown Browser";
}

function getOperatingSystem() {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac")) return "macOS";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
  if (userAgent.includes("Linux")) return "Linux";

  return "Unknown OS";
}

function getConnectionInfo() {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;

  if (!connection) {
    return {
      effectiveType: "Unavailable",
      downlink: "Unavailable",
      rtt: "Unavailable",
      saveData: false
    };
  }

  return {
    effectiveType: connection.effectiveType || "Unavailable",
    downlink: connection.downlink || "Unavailable",
    rtt: connection.rtt || "Unavailable",
    saveData: Boolean(connection.saveData)
  };
}

function getMemoryInfo() {
  return {
    deviceMemory: navigator.deviceMemory || "Unavailable",
    hardwareConcurrency: navigator.hardwareConcurrency || "Unavailable"
  };
}

function getTouchInfo() {
  return {
    maxTouchPoints: navigator.maxTouchPoints || 0,
    touchSupported: "ontouchstart" in window || navigator.maxTouchPoints > 0
  };
}

function getPageInfo() {
  return {
    title: document.title || "Untitled page",
    page: window.location.href,
    origin: window.location.origin,
    path: window.location.pathname,
    query: window.location.search || "",
    hash: window.location.hash || "",
    referrer: document.referrer || "Direct / No referrer"
  };
}

function getScreenInfo() {
  return {
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth
    },

    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    },

    devicePixelRatio: window.devicePixelRatio || 1
  };
}

export function detectAdBlocker() {
  return new Promise((resolve) => {
    try {
      const bait = document.createElement("div");

      bait.className = "adsbygoogle";
      bait.setAttribute("aria-hidden", "true");

      bait.style.cssText = `
        position: fixed;
        left: -10000px;
        top: -10000px;
        width: 300px;
        height: 250px;
        pointer-events: none;
        opacity: 1;
        visibility: visible;
        display: block;
      `;

      document.body.appendChild(bait);

      setTimeout(() => {
        const style = window.getComputedStyle(bait);

        const isBlocked =
          bait.offsetHeight === 0 ||
          bait.offsetWidth === 0 ||
          style.display === "none" ||
          style.visibility === "hidden";

        bait.remove();

        resolve(isBlocked ? "Detected" : "Not detected");
      }, 500);
    } catch (error) {
      console.warn("Ad blocker detection unavailable:", error);
      resolve("Unavailable");
    }
  });
}

async function getNetworkIdentity() {
  try {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 3500);

    const response = await fetch("https://ipapi.co/json/", {
      method: "GET",
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`IP lookup failed: ${response.status}`);
    }

    const data = await response.json();

    return {
      ipAddress: data.ip || "Unavailable",
      networkVersion: data.version || "Unavailable",

      isp: data.org || "Unavailable",
      asn: data.asn || "Unavailable",

      country: data.country_name || "Unavailable",
      countryCode: data.country_code || "Unavailable",
      region: data.region || "Unavailable",
      city: data.city || "Unavailable",
      postal: data.postal || "Unavailable",

      latitude: data.latitude || null,
      longitude: data.longitude || null,

      networkTimezone: data.timezone || "Unavailable",
      currency: data.currency || "Unavailable",
      callingCode: data.country_calling_code || "Unavailable",

      ipLookupProvider: "ipapi.co"
    };
  } catch (error) {
    console.warn("Network identity lookup unavailable:", error);

    return {
      ipAddress: "Unavailable",
      networkVersion: "Unavailable",

      isp: "Unavailable",
      asn: "Unavailable",

      country: "Unavailable",
      countryCode: "Unavailable",
      region: "Unavailable",
      city: "Unavailable",
      postal: "Unavailable",

      latitude: null,
      longitude: null,

      networkTimezone: "Unavailable",
      currency: "Unavailable",
      callingCode: "Unavailable",

      ipLookupProvider: "Unavailable"
    };
  }
}

const BOT_UA_KEYWORDS = [
  "headlesschrome", "headless", "bot", "crawler", "spider",
  "puppeteer", "playwright", "selenium", "phantomjs", "wget", "curl"
];

const CLOUD_ASNS = new Set([
  "AS16509", // Amazon AWS
  "AS15169", // Google Cloud
  "AS8075",  // Microsoft Azure
  "AS14061", // DigitalOcean
  "AS63949", // Linode/Akamai
  "AS20473", // Vultr
  "AS13335"  // Cloudflare
]);

const CLOUD_ISP_KEYWORDS = [
  "amazon", "google cloud", "microsoft azure", "digitalocean",
  "linode", "vultr", "cloudflare", "ovh", "hetzner", "contabo"
];

function detectTrafficType(userAgent, network) {
  const ua = (userAgent || "").toLowerCase();
  const isp = (network?.isp || "").toLowerCase();
  const asn = network?.asn || "";

  const isBotUA = BOT_UA_KEYWORDS.some((kw) => ua.includes(kw));
  const isCloudASN = CLOUD_ASNS.has(asn);
  const isCloudISP = CLOUD_ISP_KEYWORDS.some((kw) => isp.includes(kw));

  return isBotUA || isCloudASN || isCloudISP ? "bot" : "human";
}

export async function getVisitorInfo() {
  const visitorId = getOrCreateVisitorId();

  const [networkIdentity, adBlocker] = await Promise.all([
    getNetworkIdentity(),
    detectAdBlocker()
  ]);

  const userAgent = navigator.userAgent;
  const trafficType = detectTrafficType(userAgent, networkIdentity);

  return {
    visitorId,

    ...getPageInfo(),

    browserName: getBrowserName(),
    operatingSystem: getOperatingSystem(),
    deviceType: getDeviceType(),
    adBlocker,
    trafficType,

    userAgent,
    platform: navigator.platform || "Unknown",
    vendor: navigator.vendor || "Unknown",

    language: navigator.language || "Unknown",
    languages: navigator.languages || [],

    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
    localTime: new Date().toLocaleString(),
    visitedAtClient: new Date().toISOString(),

    online: navigator.onLine,
    cookiesEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack || "Unavailable",

    ...getScreenInfo(),

    connection: getConnectionInfo(),
    memory: getMemoryInfo(),
    touch: getTouchInfo(),

    network: networkIdentity
  };
}

export async function saveVisitorInfo(info) {
  const visitorId = info.visitorId || getOrCreateVisitorId();

  try {
    const visitorData = {
      ...info,
      visitorId,
      createdAt: serverTimestamp()
    };

    await setDoc(doc(db, "visitor_logs", visitorId), visitorData, {
      merge: true
    });

    markVisitorTracked();

    saveVisitorInfoLocal({
      ...info,
      visitorId,
      saveStatus: "Saved to Firestore"
    });

    return {
      success: true,
      visitorId
    };
  } catch (error) {
    console.error("Firestore visitor save error:", error);

    saveVisitorInfoLocal({
      ...info,
      visitorId,
      saveStatus: "Firestore failed - saved locally only",
      saveError: error.message || "Unknown error"
    });

    return {
      success: false,
      visitorId,
      error
    };
  }
}

function saveVisitorInfoLocal(info) {
  const visits = JSON.parse(localStorage.getItem("visitor_logs") || "[]");

  visits.unshift({
    ...info,
    localSavedAt: new Date().toISOString()
  });

  const limitedVisits = visits.slice(0, 30);

  localStorage.setItem("visitor_logs", JSON.stringify(limitedVisits));
}