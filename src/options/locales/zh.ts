export default {
  title: '网词快查 - 设置',
  options: [
    {
      desc: '开启网词快查自动弹泡查词',
      opts: [
        {
          name: 'on',
          title: '开启',
        },
      ],
    },
    {
      head: '可查语言',
      desc: '选择哪些语言可以触发查词',
      opts: [
        {
          name: 'en',
          title: '英语',
        },
        {
          name: 'zh',
          title: '汉语',
        },
        {
          name: 'jp',
          title: '粤语',
        },
      ],
    },
  ],
};
