export const SITE = {
  website: "https://aljazfarkas.github.io", // replace this with your deployed domain
  author: "Aljaž Farkaš",
  profile: "https://aljazfarkas.com/",
  desc: "Curiosity kills cats.",
  title: "Aljaž Farkaš",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/aljazfarkas/aljazfarkas.github.io/edit/master/",
  },
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Europe/Ljubljana", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  umami: {
    enabled: true,
    scriptUrl: "https://cloud.umami.is/script.js", // Replace with your Umami instance URL
    websiteId: "94c9cad1-799b-4e75-bbc0-d0f2da971683", // Replace with your website ID from Umami
  },
} as const;
