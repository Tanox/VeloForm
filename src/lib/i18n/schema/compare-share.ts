export interface CompareShareTranslations {
  compare: {
    title: string;
    configs: string;
    component: string;
    load: string;
    close: string;
    selectToCompare: string;
    maxThree: string;
  };
  share: {
    title: string;
    link: string;
    copyLink: string;
    exportJSON: string;
    copied: string;
    copyFailed: string;
    exported: string;
    hint: string;
  };
  error: {
    title: string;
    unexpectedError: string;
    stackTrace: string;
    homePageTitle: string;
    homePageMessage: string;
    libraryTitle: string;
    libraryMessage: string;
    backToConfigurator: string;
    contactSupport: string;
  };
  notFound: {
    title: string;
    description: string;
    backToHome: string;
    library: string;
  };
}
