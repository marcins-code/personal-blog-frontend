export const mainMenuItems = [
  {
    name_en: 'homepage',
    name_pl: 'homepage',
    path: '/',
    exact: true,
  },
  { name_en: 'categories', name_pl: 'kategorie', path: '/categories' },
  { name_en: 'series', name_pl: 'serie', path: '/series' },
  { name_en: 'contact', name_pl: 'kontakt', path: '/contact' },
];

export const adminMenuItems = [
  {
    name_en: 'articles',
    name_pl: 'artykuły',
    path: '/admin',
    exact: true,
  },
  { name_en: 'Article types', name_pl: 'typy artkułów', path: '/admin/categories' },
];

export const settingsPanelItems = {
  pl: {
    chooseTheme: 'Wybierz motyw strony',
    chooseLayout: 'Wybierz układ menu',
    chooseSidebarTheme: 'Wybierz motyw menu bocznego',
  },
  en: {
    chooseTheme: 'Choose theme',
    chooseLayout: 'Choose page laout',
    chooseSidebarTheme: 'Choose sidebar theme',
  },
};
