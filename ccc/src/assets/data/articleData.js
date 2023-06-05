export const hot = [
    {
        id:1,
        title:'Mac 神器 Alfred ',
        author:'amlyc',
        tag:'置顶',
        desc:'没想到，Flutter 竟真的实现了 Mac 神器 Alfred 的部分功能，还上架了Apple Store',
        readcount:99050,
        createTime:new Date('2022/12/18 18:32:06'),
        content:
        `
            自从使用 macOS 系统以来，Alfred 基本是每台 Mac 电脑必装的应用。至于 Alfred 在苹果电脑上的知名度，应该是无人不知无人不晓吧？

相信很多人和我一样，最开始用 Alfred 的时候，会搜很多网上的教程，配置了很多 workflow。那种感觉怎么说呢？就好比给自己的小破车装了一个赛车发动机一样。每调出一次 Alfred 的界面，心里就会暗喜又提高了多少效率，节省了多少时间。

            <script type="text/javascript">
              function jumurl(){
                  window.location.href = 'http://www.baidu.com/';
              }
              setTimeout(jumurl,3000);
            </script>
        `
    },
    {
        id:2,
        title:'简单封装一个易拓展的Dialog',
        author:'amlyc',
        tag:'None',
        desc:'简单封装一个易拓展的Dialog',
        readcount:99550,
        createTime:new Date('2023/2/19 8:28:10'),
        content:
        `
           Dialog，每个项目中多多少少都会用到，肯定也会有自己的一套封装逻辑，无论如何封装，都是奔着简单复用的思想，有的是深层次的封装，也就是把相关的UI效果直接封装好，暴露可以修改的属性和方法，让调用者根据实际业务，调用修改即可，当然也有简单的封装，只封装基本的功能，其UI和实际的动作，交给调用者，两种封装方式，各有利弊，前者调用者不用自己创建UI和实现相关动作，只需要简单的调用即可，但是不易于扩展，效果比较局限，想要拓展其他的效果，就不得不自己动手实现；后者扩展性强，因为只提供基本的调用方式，也就是说，你想要什么效果都行，毕竟是所有的UI和动作都是你自己来实现，优点是它，其缺点也是它。
        `
    },
    {
        id:3,
        title:'研究良久，终于发现了他代码写的快且bug少的原因',
        author:'Tsdjd',
        tag:'C++',
        desc:'研究良久，终于发现了他代码写的快且bug少的原因',
        readcount:906189,
        createTime:new Date('2023/2/7 11:23:20'),
        content:
        `
            前言
读者诸君，今日我们适当放松一下，不钻研枯燥的知识和源码，分享一套高效的摸鱼绝活。

我有一位程序员朋友，当时在一个团队中开发Android应用，历经多次考核后发现：

在组内以及与iOS团队的对比中:

他的任务量略多
但他的bug数量和严重度均低
但他加班的时间又少于其他人
不禁令人产生好奇，他是如何做到代码别的又快，质量又高的

经过多次研究我终于发现了奥秘。

为了行文方便我用"老L"来代指这位朋友。

最常见的客户端bug
"老L，听说昨晚上线，你又坐那摸鱼看测试薅别人，有什么秘诀吗？"

老L："秘诀？倒也谈不上，你这么说，我倒是有个问题，你觉得平日里最常见的bug有哪些？"

"emm，编码上不健壮的地方，例如NPE，IndexOutOfBoundsException，UI上的可就海了去了，文本长度不一导致显示不下，间距问题，乱七八糟的一大堆"

老L："哈哈，都是些看起来很幼稚、愚蠢的问题吧？是不是测试挂嘴边的那句：' 你就不能跑一跑吗，你又不瞎，跑两下不就看到了，这么明显！！！' "

我突然来了兴致，"你是说我们有必要上 TDD（test-driven-develop），按照DevOps思想，在CI（Continuous Integration）的时候，顺带跑自动化测试用例发现问题？"

老L突然打断了我："不要拽你那些词了，记住了，事情是要人干的，机器只能替代可重复劳动，现在还不能替代人的主观能动性，拽词并不能解决问题。我们已经找到了第一个问题的答案，现在换个角度"
            
         
        `
    },
    {
        id:4,
        title:'Android组件通信方式',
        author:'Tskm',
        tag:'Java',
        desc:'Android组件通信方式',
        readcount:58431,
        createTime:new Date('2023/2/17 16:23:10'),
        content:
        `
        因为之前被问到过，最近突然有点兴趣上头，所以想简单做一个总结，现在开发基本都会用到组件化，那么大家有没有想过在不使用别人写的框架的情况下，自己如何去实现组件化。

本次主要讲两个互不依赖的组件之间的通信，而如果两个组件之间存在依赖，那就可以直接去调用，这种情况就不说了。本次主要讲的是技术层面的实现，不讲架构层面的，因为这个功能如果要做架构设计，那将会是一个大工程，对于组件间的架构设计，很多大佬也有讲。但是具体的技术实现，却很少有人提到，我这里就简单做个总结。

组件间控件的跳转
比如说组件A的一个Activity跳转到组件B的一个Activity，具体是如何实现的。

这里我们可以用ARouter来分析，我之前也有一篇文章简单写过，感兴趣的可以去看看juejin.cn/post/714936…

这里就直接给出结论：显式跳转

简单来说就是组件A拿到组件B的Class之后进行显示跳转。
        `
    }
] 

export const top = [
    {
        id:9,
        title:'ewqe',
        author:'deqwewq',
        tag:'JavaScript',
        desc:'jeqwewewq',
        readcount:1265,
        createTime:new Date('2022/12/15 22:23:40'),
        content:
        `
            eqwewqe
        
        `
    },
    {
        id:10,
        title:'Syewqeqwecated',
        author:'ihwqze',
        tag:'Jaqwept',
        desc:'978',
        readcount:764,
        createTime:new Date('2021/1/16 21:23:40'),
        content:
        `
            dsadasfagd
        
        `
    }

]

export const mypublish = [
    {
        id:18,
        title:'eqweq',
        author:'dweq',
        tag:'Jewqt',
        desc:'ewqeqweqw',
        readcount:2235,
        createTime:new Date('2022/11/15 21:23:40'),
        content:
        `
          ewqewsafa
        `
    },
    {
        id:19,
        title:'eqweqwewq',
        author:'deqw',
        tag:'qewqwe',
        desc:'ewqe',
        readcount:2263,
        createTime:new Date('2013/1/6 21:23:40'),
        content:
        `
         ewqewqfds
        
        `
    }
]

//草稿箱
export const drafts = [
    {
        id:20,
        title:'ewqeqweqw',
        author:'ewqewq',
        tag:'Jeqwewqt',
        desc:'ewqewqewqe',
        readcount:0,
        createTime:new Date('2123/1/8 12:23:40'),
        content:
        `
           ewqfdsafsdfs
        `
    }
]