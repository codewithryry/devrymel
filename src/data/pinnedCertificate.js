/*
 * Pinned certificates — always shown first (newest first), regardless of what
 * admin panel entries get added in Firestore or the JSON fallback.
 */
export const PINNED_CERTIFICATES = [
  {
    id: "pinned-codealpha-ml",
    title: "CodeAlpha Machine Learning Internship",
    file: "CodeAlpha_ML_Certificate.pdf",
    description: "Completed the CodeAlpha Virtual Internship Program in Machine Learning from September 10, 2026 to October 10, 2026.",
    category: "Internship"
  },
  {
    id: "pinned-codealpha-lor",
    title: "CodeAlpha Letter of Recommendation",
    file: "CodeAlpha_LOR.pdf",
    description: "Letter of Recommendation from CodeAlpha for the Machine Learning virtual internship.",
    category: "Recommendation"
  },
  {
    id: "pinned-dole-gip",
    title: "DOLE Government Internship Program",
    file: "DOLE.jpg",
    description: "Rendered two (2) months of service from August 3, 2026 to September 28, 2026 as an intern at the Municipality of Naujan - Public Employment Service Office (PESO) under the DOLE Government Internship Program (GIP).",
    category: "Internship"
  }
];
