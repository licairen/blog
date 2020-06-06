### 简介
###### HTML5中和Web Speech相关的API实际上有两类，一类是“语音识别(Speech Recognition)”，另外一个就是“语音合成(Speech Synthesis)”， 这两个名词实际上指的分别是“语音转文字”，和“文字变语音”。

* SpeechSynthesisUtterance主要用来构建语音合成实例，
* speechSynthesis大概用来触发浏览器语音模块，让浏览器把内容读出来。
想要浏览器开口说话，只需要：

``` javascript
let speechInstance = new SpeechSynthesisUtterance('大家好，我是渣渣辉。');
speechSynthesis.speak(speechInstance);`

就是这么简单，不妨copy进浏览器试一下？
// 更换语言
var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices(); // 获取语言包
msg.voice = voices[18]; // 18：普通话
msg.text = "Hello World";
speechSynthesis.speak(msg); // 
```


###  `SpeechSynthesisUtterance实例有以下属性，可以通过设置一下属性调整发音。`

text – 要合成的文字内容，字符串。

lang – 使用的语言，字符串， 例如："zh-cn"

voiceURI – 指定希望使用的声音和服务，字符串。

volume – 声音的音量，区间范围是0到1，默认是1。

rate – 语速，数值，默认值是1，范围是0.1到10，表示语速的倍数，例如2表示正常语速的两倍。

pitch – 表示说话的音高，数值，范围从0（最小）到2（最大）。默认值为1。

还有一下方法：

* onstart – 语音合成开始时候的回调。
* onpause – 语音合成暂停时候的回调。
* onresume – 语音合成重新开始时候的回调。
* onend – 语音合成结束时候的回调。
* speechSynthesis对象有以下方法：

speak() – 只能接收SpeechSynthesisUtterance作为唯一的参数，作用是读合成的话语。
stop() – 立即终止合成过程。
pause() – 暂停合成过程。
resume() – 重新开始合成过程。
getVoices() – 此方法不接受任何参数，用来返回浏览器支持的语音包列表，是个数组。
speechSynthesis.getVoices()返回因每个浏览器不同及版本的不同返回不太一样，大致是这样：


#### `注意：语言包获取不稳定，有时候返回为空，可以用定时器多试几次。`


``` javascript
vue代码
methods: {
    onChange (e) {
        let chosenItem = this.voiceData.filter(item => {
            return e == item.lang;
        });
        this.queryParams.voiceURI = chosenItem[0].voiceURI;
    },

    onSpeak () {
        this.speechInstance = new SpeechSynthesisUtterance();
        Object.keys(this.queryParams).forEach(key => {
            this.speechInstance[key] = this.queryParams[key];
        })
        console.log(this.speechInstance);

        speechSynthesis.speak(this.speechInstance);
    }
},
mounted () {
    let timer = setInterval(() => {
        if(!this.voiceData.length) {
            //获取语言包
            this.voiceData = speechSynthesis.getVoices();
        } else {
            clearInterval(timer);
        }
    }, 500);
}
```

# 试一下吧


手机端试了IOS下的Chrome、UC和Safari，安卓的Chrome，竟然都完美支持😄 ！

但是可能因为Google被墙的缘故，Chrome的语音功能很不稳定，Firefox和Safari反而比较稳定。

多试几种其他语言，如日语(ja-JP)、粤语(zh-HK)、台湾话(zh-TW)等还是很有意思的😂 。前提是你的浏览器有这种语言包。

奇怪的是汉语选择用英语(en-US)朗读的时候，返回的是一串听不太懂的男声，希望英语能力强的大神多多指教🙏 。