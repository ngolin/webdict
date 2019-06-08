export default {
  title: 'webdict - options',
  options: [
    {
      desc: 'Enable webdict to popup to look up selected words',
      opts: [
        {
          name: 'on',
          title: 'Enable webdict',
        },
      ],
    },
    {
      head: 'Select languages',
      desc: 'Select which languages to look up selected words',
      opts: [
        {
          name: 'en',
          title: 'English',
        },
        {
          name: 'zh',
          title: 'Chinese',
        },
        {
          name: 'jp',
          title: 'Cantonese',
        },
      ],
    },
  ],
};
