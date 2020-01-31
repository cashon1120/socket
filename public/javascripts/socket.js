//定义全局的
let ws = null;
let nickName = '';
let oldContent = document.getElementById('content');
let container = document.getElementById('container');
let preMsgTime = '';

//封装创建Div并且发送消息的函数
const createChatDiv = (data) => {
  let div = document.createElement('div');
  let chartDiv = document.createElement('div');
  let p_time = document.createElement('p');
  let p_user = document.createElement('p');
  let p_content = document.createElement('p');
  const time = new Date();
  const formatTime = time.Format("yyyy-MM-dd hh:mm:ss");
  const currentTime = new Date().getTime()
  switch (data.type) {
    case 'serverInformation':
      p_time.innerHTML = formatTime;
      p_user.innerHTML = '系统提示';
      p_content.innerHTML = data.message;
      break;
    case 'chat':
      p_time.innerHTML = formatTime;
      p_user.innerHTML = data.name;
      p_content.innerHTML = data.message;
      break;
    default:
      break;
  }
  let className = 'chat-wrapper'
  if(data.name === nickName){
    className = 'chat-wrapper chat-wrapper-my'
  }
  div.setAttribute('class', className)
  chartDiv.setAttribute('class', 'content-wrapper')
  p_time.setAttribute('class', 'time');
  p_user.setAttribute('class', 'user');
  p_content.setAttribute('class', 'content');

  chartDiv.appendChild(p_user)
  chartDiv.appendChild(p_content);
  if(currentTime - preMsgTime > 10000){
    preMsgTime = currentTime;
    div.appendChild(p_time);
  }
  div.appendChild(chartDiv)
  return div;
};

//发送消息的时候
document.getElementById('sendMessage').addEventListener('click', () => {
  send();
})

//封装发送消息的函数
const send = () => {
  let message = document.getElementById('message');

  //设置不能够发送空消息
  if (!message.value) {
    return
  }
  let data = {
    type: 'chat',
    message: message.value
  };
  ws.send(JSON.stringify(data));
  message.value = ""
};

let setName = document.getElementById('setName');
const setNameWrapper = document.getElementById('setNameWrapper')
setName.onclick = () => {
  let userName = document.getElementById('userName');
  if (userName.value) {
    nickName = userName.value;
    localStorage.setItem('nickName', nickName)
    setNameWrapper.style.display = 'none'
  }
  createWebSocket(nickName)
}

function getLocalNick(){
  const localNickName = localStorage.getItem('nickName')
  if(localNickName){
    nickName = localNickName
    createWebSocket(localNickName)
    setNameWrapper.style.display = 'none'
  }else{
    setNameWrapper.style.display = 'block'
  }
}
getLocalNick()

function createWebSocket(nickName){
  //建立连接,并发送连接进入房间(并且连接会一直保存,进行服务端的轮询)
  ws = new WebSocket('ws://192.168.0.106:3001');
  //连接上来的时候
  ws.onopen = () => {
    let data = {
      type: 'setName',
      nickname: nickName
    };
    ws.send(JSON.stringify(data))
  };

  //当接受服务端的请求的时候
  ws.onmessage = (e) => {
    let data = JSON.parse(e.data);
    //接受的消息为连接的人的个数的时候
    if (data.type === 'chatterList') {
      let list = data.list;
      let length = list.length;
      let userList = document.getElementById('userList');
      document.getElementById('onLine').innerText = `在线人数${length}人`;

      for (let i = 0; i < list.length; i++) {
        let p_user = document.createElement('p');
        p_user.setAttribute('class', 'userList-item');
        p_user.innerText = list[i].name;
        userList.appendChild(p_user)
      }
    }

    //当为接受消息的或者用户进入新房间的时候
    else {
      oldContent.appendChild(createChatDiv(data))
      container.scrollTop = container.scrollHeight
    }
  };
}