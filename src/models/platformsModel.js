export const platformsIntro = {
  heading: 'Choose your platform',
};

export const platforms = [
  {
    id: 'windows',
    label: 'Windows',
    downloadHref:
      (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_WINDOWS_DOWNLOAD_URL || import.meta.env?.VITE_DOWNLOAD_URL_WINDOWS)) ||
      '#download-windows',
    installHref:
      (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_WINDOWS_INSTALL_GUIDE_URL || import.meta.env?.VITE_INSTALL_GUIDE_WINDOWS)) ||
      '#install-windows',
  },
  {
    id: 'mac',
    label: 'Mac',
    downloadHref:
      (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_MAC_DOWNLOAD_URL || import.meta.env?.VITE_DOWNLOAD_URL_MAC)) ||
      '#download-mac',
    installHref:
      (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_MAC_INSTALL_GUIDE_URL || import.meta.env?.VITE_INSTALL_GUIDE_MAC)) ||
      '#install-mac',
  },
];
