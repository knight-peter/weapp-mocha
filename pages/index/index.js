/*
 * @Description: 
 * @Author: xuqi
 * @Github: https://github.com/knight-peter
 * @LastEditors: xuqi
 */
//index.js
import {
  $wuxToast,
  $wuxDialog
} from 'wux-weapp'
//获取应用实例
const app = getApp()

Page({
  data: {
    step: 0,
    question_value: '',
    question_arr: [{
        question: '1、kris pan 你好呀？',
        options: ['OK', 'cancel'],
        answer: 'OK',
        toast_arr: ['你傻的吧']
      },
      {
        question: '2、太好了我就是来找你的，请问你此刻正在干嘛呢？',
        options: ['SkrSkr', '翻抹茶照片', '思考这个小程序'],
        answer: '思考这个小程序',
        toast_arr: ['你傻的吧']
      },
      {
        question: '3、还记得你第一次单独请抹茶吃了什么吗？',
        options: ['海底捞', '肯德基', '光头烧烤', '鱼日'],
        answer: '鱼日',
        toast_arr: ['你傻的吧']
      },
      {
        question: '4、很好，接下来你可以筹划过年的时候请抹茶吃什么呢？',
        options: ['江浙沪包邮地区随意', '不知道'],
        answer: '江浙沪包邮地区随意',
        toast_arr: ['如果点这个手动微笑退出程序']
      },
      {
        question: '5、作为狼人杀高端局玩家，以下哪个铁逻辑最不为正确？',
        options: ['有查杀，要先走查杀，再走悍跳的人', '预言家别玩花板子，一定要竞选警长', '只要不浪，金水反水立警 永远最大 没有之一'],
        answer: '只要不浪，金水反水立警 永远最大 没有之一',
        toast_arr: ['你傻的吧']
      },
      {
        question: '6、果然不水。你知道抹茶最喜欢吃的菜是什么？',
        options: ['葱烧鱼', '西芹腰果炒虾仁', '油爆虾', '手撕鸡'],
        answer: '葱烧鱼',
        toast_arr: ['你傻的吧']
      },
      {
        question: '7、请强化记忆手动输入抹茶最喜欢吃的是什么？',
        options: [],
        answer: '葱烧鱼',
        toast_arr: ['你傻的吧']
      },
      {
        question: '8、哈哈哈哈。被这两个问题傻到了吧，就算你此刻问我你那里最帅，我都不会理你的！因为我在写程序啊，我厉不厉害！',
        options: ['厉害死了抹茶最厉害', '不厉害'],
        answer: '厉害死了抹茶最厉害',
        toast_arr: ['扔炸弹']
      },
      {
        question: '9、知道我为什么要写这个吗，（尽管我不拿手）',
        options: ['我知道的', '我不知道'],
        answer: '我知道的',
        toast_arr: ['懒死你算了']
      },
      {
        question: '10、最后要送上一份厚礼，请选择吧：',
        options: ['看抹茶裸照', '看抹茶素颜照', '看抹茶证件照'],
        answer: '看抹茶裸照',
        toast_arr: ['祝Kris pan 生日快乐，祝愿你每一天都平安喜乐', '素颜你想看就能看？', '还在海马体躺着']
      },
    ]
  },
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage(res) {
    return {
      imageUrl: '/assets/image/gift.jpg'
    }
  },
  changeRadio(e) {
    const value = e.detail.value
    const index = e.detail.index
    const name = e.detail.name
    this.setData({
      question_value: value
    })
  },
  changeInput(e) {
    const value = e.detail.value
    this.setData({
      question_value: value
    })
  },
  /* 下一项 */
  next(e) {
    const that = this
    const question_arr = that.data.question_arr
    const index = parseInt(e.currentTarget.dataset.index)
    const question_value = this.data.question_value
    const answer = question_arr[index].answer
    const toast_arr = question_arr[index].toast_arr
    const toast_index = question_arr[index].options.indexOf(question_value)
    let toast_text = toast_arr[0]
    if (this.data.step===9){
      toast_text = toast_arr[toast_index]
    }
    if (answer === question_value) {
      this.setData({
        step: index + 1,
        question_value: ''
      })
      if (this.data.step === 10) {
        $wuxDialog().alert({
          resetOnClose: true,
          title: '生日快乐',
          content: toast_text,
          onConfirm(e) {
            that.setData({
              step: 0,
              question_value: ''
            })
          },
        })
      } else {
        this.showToast({
          icon: 'ios-heart',
          text: '爱你哟 ~ '
        })
      }

    } else {
      this.showToast({
        text: toast_text
      })
    }

  },
  /* 错误提示 */
  showToast({
    type = 'default',
    text,
    icon = 'ios-sad',
    // mask = false
  }) {
    $wuxToast().show({
      type,
      duration: 1500,
      color: '#fff',
      icon,
      text,
      mask: false
    })
  },
})